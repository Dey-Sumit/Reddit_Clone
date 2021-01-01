import { Request, Response, Router } from 'express'
import Comment from '../entities/Comment'
import Post from '../entities/Post'
import User from '../entities/User'
import Vote from '../entities/Vote'

import auth from '../middlewares/auth'
import user from '../middlewares/user'

const vote = async (req: Request, res: Response) => {
   const { identifier, slug, commentIdentifier, value } = req.body

   //validate vote ; it can be 1, -1 and 0(remove vote)
   if (![-1, 0, 1].includes(value)) {
      return res.status(400).json({ value: 'not valid value' })
   }

   if (!identifier) {
      return res.status(400).json({ value: 'post not found' })
   }

   try {
      // grab the user
      const user: User = res.locals.user

      // find the post
      let post = await Post.findOneOrFail({ identifier, slug })

      let vote: Vote | undefined
      let comment: Comment | undefined

      // if there is a comment identifier find vote by comment
      if (commentIdentifier) {
         comment = await Comment.findOneOrFail({
            identifier: commentIdentifier,
         })

         // get the vote by that user on that comment(if exist)
         // coz one user can vote only once
         vote = await Vote.findOne({ user, comment })
      } else {
         // Find Vote By Post
         // get the vote by that user on that post(if exist)
         // coz one user can vote only once

         vote = await Vote.findOne({ user, post })
      }

      if (!vote && value === 0) {
         // if no vote and value = 0 return error(no point of remove a vote if it does not exist)
         return res.status(404).json({ error: 'Vote not found' })
      } else if (!vote) {
         // check if a vote exists by that user on that comment/post
         // if not ,then create it
         vote = new Vote({ user, value })

         // check if it is on comment or post
         if (comment) vote.comment = comment
         else vote.post = post
         // DONE! save it
         await vote.save()
      } else if (value === 0) {
         // reset vote; remove vote from db
         await vote.remove()
      } else if (vote.value !== value) {
         // if the vote exist, but user wants to update(change) the vote
         vote.value = value
         await vote.save()
      }

      // return the updated post
      post = await Post.findOneOrFail(
         { identifier, slug },
         { relations: ['comments', 'comments.votes', 'votes', 'sub'] }
      )

      post.setUserVote(user)
      post.comments.forEach(c => c.setUserVote(user))

      return res.status(200).json(post)
   } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Something went wrong' })
   }
}

const router = Router()
router.post('/vote', user, auth, vote)
export default router
