import User from './../entities/User'
import { NextFunction, Request, Response } from 'express'

// check if the user is authenticated
const auth = async (_: Request, res: Response, next: NextFunction) => {
   try {
      const user: User | undefined = res.locals.user
      if (!user) throw new Error('Unauthenticated')

      return next()
   } catch (error) {
      res.status(401).json({ error: error.message })
   }
}
export default auth
