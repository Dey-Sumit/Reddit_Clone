import User from './../entities/User'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

// check if the user is authenticated
const auth = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // get the token set by cookieParser() middleware
      const token = req.cookies.token
      if (!token) {
         throw new Error('Unauthenticated')
      }

      //verify the token
      const { username }: any = jwt.verify(token, process.env.JWT_SECRET!)

      // get the user from DB and return
      const user = await User.findOne({ username })
      if (!user) throw new Error('Unauthenticated')
      res.locals.user = user
      next()
   } catch (error) {
      res.status(401).json({ error: error.message })
   }
}
export default auth
