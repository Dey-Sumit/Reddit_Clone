import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import InputGroup from '../components/InputGroup'
import { useRouter } from 'next/router'

const register = () => {
   const [email, setEmail] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [agreement, setAgreement] = useState(false)
   const [errors, setErrors] = useState<any>({})

   const router = useRouter()

   const handleRegister = async (e: FormEvent) => {
      e.preventDefault()
      if (!agreement) {
         setErrors({
            ...errors,
            agreement: 'You must agree to the terms and conditions',
         })
         return
      }
      try {
         const res = await axios.post('/auth/register', {
            email,
            password,
            username,
         })
         router.push('/')
      } catch (error) {
         console.log(error.response.data)
         setErrors(error.response.data)
      }
   }

   return (
      <div className='flex bg-white'>
         <Head>
            <title>Register</title>
         </Head>

         <div
            className='h-screen bg-center bg-cover w-36'
            style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
         <div className='flex flex-col justify-center pl-6'>
            <div className='w-70'>
               <h1 className='mb-2 text-lg font-medium'>Sign up</h1>
               <p>By Continuing you accept ...</p>
               <form onSubmit={handleRegister}>
                  <div className='mt-3 mb-6 align-middle'>
                     <input
                        type='checkbox'
                        className='cursor-pointer'
                        id='agreement'
                        checked={agreement}
                        onChange={e => setAgreement(e.target.checked)}
                     />
                     <label
                        htmlFor='agreement'
                        className='ml-2 text-xs cursor-pointer'>
                        I agree to get Emails
                     </label>
                     <small className='block font-medium text-red-600'>
                        {errors.agreement}{' '}
                     </small>
                  </div>

                  <InputGroup
                     className='mb-2'
                     value={email}
                     error={errors.email}
                     placeholder='Email'
                     setValue={setEmail}
                     type='email'
                  />

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
                     Sign Up
                  </button>
               </form>
               <small>
                  Already a readiter?
                  <Link href='/login'>
                     <a className='ml-1 text-blue-500 uppercase outline-none'>
                        Log In
                     </a>
                  </Link>
               </small>
            </div>
         </div>
      </div>
   )
}

export default register
