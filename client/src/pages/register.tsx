import Head from 'next/head'
import Link from 'next/link'

const register = () => {
   return (
      <div className='flex'>
         <Head>
            <title>Register</title>
         </Head>

         <div
            className='w-40 h-screen bg-center bg-cover'
            style={{ backgroundImage: "url('/images/bg.jpg')" }}></div>
         <div className='flex flex-col justify-center pl-6'>
            <div className='w-70'>
               <h1 className='mb-2 text-lg font-medium'>Sign up</h1>
               <p>By Continuing you accept ...</p>
               <form>
                  <div className='flex mt-3 mb-6 align-middle'>
                     <input
                        type='checkbox'
                        className='cursor-pointer'
                        id='agreement'
                     />
                     <label
                        htmlFor='agreement'
                        className='ml-2 text-xs cursor-pointer'>
                        I agree to get Emails
                     </label>
                  </div>

                  <div className='mb-2'>
                     <input
                        type='email'
                        className='w-full p-2 bg-gray-100 border border-gray-100 rounded'
                        placeholder='Email'
                     />
                  </div>

                  <div className='mb-2'>
                     <input
                        type='text'
                        className='w-full p-2 bg-gray-100 border border-gray-100 rounded'
                        placeholder='Username'
                     />
                  </div>

                  <div className='mb-2'>
                     <input
                        type='password'
                        className='w-full p-2 bg-gray-100 border border-gray-100 rounded'
                        placeholder='Password'
                     />
                  </div>
                  <button className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded'>
                     Sign Up
                  </button>
               </form>
               <small>
                  Already a readiter?
                  <Link href='/login'>
                     <a className='ml-1 text-blue-500 uppercase'>Log In</a>
                  </Link>
               </small>
            </div>
         </div>
      </div>
   )
}

export default register
