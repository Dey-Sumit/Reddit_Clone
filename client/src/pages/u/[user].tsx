import { useRouter } from 'next/router'

export default function Sub() {
   const router = useRouter()
   console.log(router.query)
   return <h1 className='mt-160'>User</h1>
}
