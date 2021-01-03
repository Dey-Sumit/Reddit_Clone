import { isEmpty } from 'class-validator'
import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import Sub from '../entities/Sub'
import User from '../entities/User'
import auth from '../middlewares/auth'
import user from '../middlewares/user'
import Post from '../entities/Post'

const createSub = async (req: Request, res: Response) => {
   const { name, title, description } = req.body

   const user: User = res.locals.user
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

const router = Router()

router.post('/', user, auth, createSub)
router.get('/:name', user, getSub)

export default router
