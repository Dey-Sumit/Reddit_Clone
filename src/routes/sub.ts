import { isEmpty } from 'class-validator'
import { NextFunction, Request, Response, Router } from 'express'
import { getRepository, SelectQueryBuilder } from 'typeorm'
import Sub from '../entities/Sub'
import User from '../entities/User'
import auth from '../middlewares/auth'
import user from '../middlewares/user'
import Post from '../entities/Post'
import upload from '../middlewares/multer_upload'
import fs from 'fs'

const createSub = async (req: Request, res: Response) => {
   const { name, title, description } = req.body

   const user = res.locals.user
   try {
      let errors: any = {}
      if (isEmpty(name)) errors.name = 'Name must not be empty'
      if (isEmpty(title)) errors.title = 'Title must not be empty'

      const sub = await getRepository(Sub)
         .createQueryBuilder('sub')
         .where('lower(sub.name) = :name', { name: name.toLowerCase() })
         .getOne()
      if (sub) errors.name = 'Sub already exists'
      if (Object.keys(errors).length > 0) throw errors
   } catch (error) {
      console.log(error.message)

      res.status(400).json({ error })
   }

   try {
      const sub = new Sub({ name, description, title, user })
      await sub.save()

      return res.status(200).json(sub)
   } catch (error) {
      res.status(500).json({ error: 'Server went wrong' })
   }
}

const getSub = async (req: Request, res: Response) => {
   // get the name from URL params

   const name = req.params.name

   try {
      // find the sub -> get all the posts under the sub(order by last created)
      const sub = await Sub.findOne({ name })
      if (!sub) {
         return res.status(404).json({ error: 'Sub Not Found' })
      }

      const posts = await Post.find({
         where: { sub },
         relations: ['comments', 'votes'],
         order: { createdAt: 'DESC' },
      })
      sub.posts = posts

      // attach the user's vote status , if the user is logged in
      const user = res.locals.user

      if (user) {
         sub.posts.forEach(post => post.setUserVote(user))
      }

      return res.status(200).json(sub)
   } catch (error) {
      console.log(error)

      return res.status(500).json({ error: 'Something went wrong' })
   }
}

const uploadSubImage = async (req: Request, res: Response) => {
   const sub: Sub = res.locals.sub

   // put the file either in banner or image

   try {
      const type = req.body.type

      if (type !== 'image' && type !== 'banner') {
         // delete the uploaded file , if it is invalid type

         fs.unlinkSync(`public\\images\\${req.file.filename}`)

         return res.status(400).json({ error: 'Invalid Type' })
      }

      const urn = req.file.filename

      let oldImageUrn = ''

      if (type === 'image') {
         oldImageUrn = sub.imageUrn || ''
         sub.imageUrn = urn
      } else {
         oldImageUrn = sub.bannerUrn || ''
         sub.bannerUrn = urn
      }
      await sub.save()

      // delete the old image
      if (oldImageUrn) {
         fs.unlinkSync(`public\\images\\${oldImageUrn}`)
      }

      return res.json(sub)
   } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong' })
   }

   res.json({ success: true })
}

// check if the uploader is the owner of the sub
const owner = async (req: Request, res: Response, next: NextFunction) => {
   const user: User = res.locals.user

   try {
      const sub = await Sub.findOneOrFail({ where: { name: req.params.name } })

      if (sub.username !== user.username) {
         return res.status(403).json({ error: "You don't own this sub" })
      }

      res.locals.sub = sub
      return next()
   } catch (error) {
      console.error(error.message)

      res.status(500).json({ error: 'Something went wrong' })
   }
}

const router = Router()

router.post('/', user, auth, createSub)
router.get('/:name', user, getSub)
router.post(
   '/:name/upload',
   user,
   auth,
   owner,
   upload.single('file'),
   uploadSubImage
)

export default router
