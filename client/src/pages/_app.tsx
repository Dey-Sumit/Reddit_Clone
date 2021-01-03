import type { AppProps /*, AppContext */ } from 'next/app'
import Axios from 'axios'
import { SWRConfig } from 'swr'

import React from 'react'

import '../styles/talwind.css'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'
import { AuthProvider } from '../context/auth.context'

Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true

const fetcher = async (url: string) => {
   try {
      const res = await Axios.get(url)
      return res.data
   } catch (error) {
      throw error.response.data
   }
}

function MyApp({ Component, pageProps }: AppProps) {
   const authRoutes = ['/login', '/register']

   const { pathname } = useRouter()
   const authRoute = authRoutes.includes(pathname)

   return (
      <SWRConfig
         value={{
            fetcher,
            dedupingInterval: 10000,
         }}>
         <AuthProvider>
            {!authRoute && <Navbar />}
            <div className='pt-12'>
               <Component {...pageProps} />
            </div>
         </AuthProvider>
      </SWRConfig>
   )
}

export default MyApp
