import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useRouter } from 'next/router'

const register = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [errors, setErrors] = useState<any>({})

   const router = useRouter()

   const handleRegister = async (e: FormEvent) => {
      e.preventDefault()

      try {
         const res = await axios.post('/auth/login', {
            password,
            username,
         })
         router.push('/')
      } catch (error) {
         setErrors(error.response.data)
      }
   }

   return (
      <div className='flex'>
         <Head>
            <title>Register</title>
         </Head>

         <div
            className='h-screen bg-center bg-cover w-36'
            style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
         <div className='flex flex-col justify-center pl-6'>
            <div className='w-70'>
               <h1 className='mb-3 text-lg font-medium'>Log In</h1>

               <form onSubmit={handleRegister}>
                  <InputGroup
                     className='mb-2'
                     value={username}
                     error={errors.username}
                     placeholder='username'
                     setValue={setUsername}
                     type='username'
                  />

                  <InputGroup
                     className='mb-4'
                     value={password}
                     error={errors.password}
                     placeholder='password'
                     setValue={setPassword}
                     type='password'
                  />

                  <button
                     type='submit'
                     className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded'>
                     Log In
                  </button>
               </form>
               <small>
                  Don't have account?
                  <Link href='/register'>
                     <a className='ml-1 text-blue-500 uppercase outline-none'>
                        Register
                     </a>
                  </Link>
               </small>
            </div>
         </div>
      </div>
   )
}

export default register
