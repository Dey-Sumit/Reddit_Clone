import { Request, Response, Router } from 'express'
import Comment from '../entities/Comment'
import Post from '../entities/Post'
import User from '../entities/User'
import auth from '../middlewares/auth'
import user from '../middlewares/user'

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

const getPosts = async (_: Request, res: Response) => {
   try {
      const posts = await Post.find({
         order: { createdAt: 'DESC' },
         relations: ['comments', 'votes', 'sub'],
      })

      if (res.locals.user) {
         posts.forEach(p => p.setUserVote(res.locals.user))
      }

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
            relations: ['sub', 'votes', 'comments'],
         }
      )
      // if the user logged in, then return the user's vote status on this post
      if (res.locals.user) post.setUserVote(res.locals.user)
      return res.json(post)
   } catch (error) {
      console.log(error)
      return res.status(404).json({ error: 'Post Not Found' })
   }
}

const commentOnPost = async (req: Request, res: Response) => {
   const { identifier, slug } = req.params
   const body = req.body.body

   try {
      const post = await Post.findOneOrFail({ identifier, slug })

      const comment = new Comment({
         body,
         user: res.locals.user,
         post,
      })
      await comment.save()
      return res.json(comment)
   } catch (error) {
      console.log(error.message)
      return res.status(404).json({ error: 'Post Not Found' })
   }
}

const router = Router()

router.post('/', user, auth, createPost)
router.get('/', user, getPosts)
router.get('/:identifier/:slug', user, getPost)
router.post('/:identifier/:slug/comments', user, auth, commentOnPost)
export default router
