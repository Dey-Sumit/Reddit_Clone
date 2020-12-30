import { Request, Response, Router } from 'express'
import Comment from '../entities/Comment'
import Post from '../entities/Post'
import User from '../entities/User'
import auth from '../middlewares/auth'

const createPost = async (req: Request, res: Response) => {
   const { title, body, sub } = req.body
   const user: User = res.locals.user

   if (title.trim() === '')
      return res.status(400).json({ title: 'Title must not be empty' })

   try {
      //TODO find subs
      const post = new Post({ title, body, user, subName: sub })
      await post.save()

      return res.status(200).json(post)
   } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' })
   }
}

const getPosts = async (req: Request, res: Response) => {
   try {
      const posts = await Post.find({
         order: { createdAt: 'DESC' },
      })
      return res.json(posts)
   } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Something went wrong' })
   }
}
const getPost = async (req: Request, res: Response) => {
   const { identifier, slug } = req.params

   try {
      const post = await Post.findOneOrFail(
         { identifier, slug },
         {
            relations: ['sub'],
         }
      )
      return res.json(post)
   } catch (error) {
      console.log(error)
      return res.status(404).json({ error: 'Post Not Found' })
   }
}

const commentOnPost = async (req: Request, res: Response) => {
   const { identifier, slug } = req.params
   const body = req.body

   try {
      const post = await Post.findOneOrFail({ identifier, slug })
      console.log(post)
      console.log(body)

      const comment = new Comment({
         body,
         user: res.locals.user,
         post,
      })
      await comment.save()
      return res.json({ comment })
   } catch (error) {
      console.log(error.message)
      return res.status(404).json({ error: 'Post Not Found' })
   }
}

const router = Router()

router.post('/', auth, createPost)
router.get('/', getPosts)
router.get('/:identifier/:slug', getPost)
router.post('/:identifier/:slug/comments', auth, commentOnPost)
export default router
