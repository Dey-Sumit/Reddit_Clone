import type { AppProps /*, AppContext */ } from 'next/app'
import Axios from 'axios'

import '../styles/talwind.css'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'
import { AuthProvider } from '../context/auth.context'

Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }: AppProps) {
   const authRoutes = ['/login', '/register']

   const { pathname } = useRouter()
   const authRoute = authRoutes.includes(pathname)

   return (
      <AuthProvider>
         {!authRoute && <Navbar />}
         <Component {...pageProps} />
      </AuthProvider>
   )
}

export default MyApp
