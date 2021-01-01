import User from './../entities/User'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

// check if the user is authenticated
const user = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // get the token set by cookieParser() middleware
      const token = req.cookies.token
      if (!token) {
         return next()
      }

      //verify the token
      const { username }: any = jwt.verify(token, process.env.JWT_SECRET!)

      // get the user from DB and return
      const user = await User.findOne({ username })
      res.locals.user = user
      return next()
   } catch (error) {
      res.status(401).json({ error: error.message })
   }
}
export default user
