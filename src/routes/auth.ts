import { isEmpty, validate } from 'class-validator'
import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import User from './../entities/User'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import auth from '../middlewares/auth'
import user from '../middlewares/user'

const mappedErrors = (errors: Object[]) => {
   let mappedErrors = {}
   errors.forEach((e: any) => {
      const key = e.property
      const value = Object.entries(e.constraints)[0][1]
      mappedErrors[key] = value
   })
   return mappedErrors
}

const register = async (req: Request, res: Response) => {
   const { email, username, password } = req.body

   try {
      let errors: any = {}
      const emailUser = await User.findOne({ email })
      const usernameUser = await User.findOne({ username })

      if (emailUser) errors.email = 'Email is already taken'
      if (usernameUser) errors.username = 'Username is already taken'

      if (Object.keys(errors).length > 0) {
         return res.status(400).json(errors)
      }

      // create the user Object
      const user = new User({ email, username, password })

      // validation by the model
      errors = await validate(user)

      // if errors, then format the error to an object
      if (errors.length > 0) {
         return res.status(400).json(mappedErrors(errors))
      }

      //Everything Fine :) Save the user
      await user.save()

      // generate a token and send it through cookie
      const token = jwt.sign({ username }, process.env.JWT_SECRET!)
      res.set(
         'Set-Cookie',
         cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
         })
      )
      // return the user
      return res.status(200).json(user)
   } catch (error) {
      console.log(error)
      res.status(500).send(error)
   }
}

const login = async (req: Request, res: Response) => {
   const { username, password } = req.body

   try {
      let errors: any = {}
      if (isEmpty(username)) errors.username = 'Username must not be empty'
      if (isEmpty(password)) errors.password = 'Password must not be empty'

      if (Object.keys(errors).length > 0) return res.status(400).json(errors)

      const user = await User.findOne({ username })

      if (!user) {
         return res.status(404).json({ username: 'User not found' })
      }

      const passwordMatched = await bcrypt.compare(password, user.password)
      if (!passwordMatched)
         return res.status(401).json({ password: 'Password is incorrect' })

      const token = jwt.sign({ username }, process.env.JWT_SECRET!)
      res.set(
         'Set-Cookie',
         cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
         })
      )
      return res.json(user)
   } catch (error) {
      console.log(error)

      return res.status(404).json({ error })
   }
}

const me = (_: Request, res: Response) => {
   return res.json(res.locals.user)
}

const logout = (re: Request, res: Response) => {
   res.set(
      'Set-Cookie',
      cookie.serialize('token', '', {
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         expires: new Date(0),
         path: '/',
      })
   )

   return res.status(200).json({ success: 'true' })
}

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', user, auth, me)
router.get('/logout', user, auth, logout)

export default router
