import { useRouter } from 'next/router'
import useSWR from 'swr'
import PostCard from '../../components/PostCard'
import { Post } from '../../types'

export default function Sub() {
   const router = useRouter()
   const subName = router.query.sub

   //subName might be empty at first ; so conditional fetching
   const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null)

   let postMarkup: any
   if (error) {
      router.push('/')
   }

   if (!sub) {
      postMarkup = <p className='text-lg text-center'>Loading...</p>
   } else if (sub.posts?.length === 0) {
      postMarkup = <p className='text-lg text-center'>No Post Submitted yet</p>
   } else {
      postMarkup = sub.posts?.map((post: Post) => (
         <PostCard post={post} key={post.identifier} />
      ))
   }

   return (
      <div className='container flex pt-5'>
         {sub && <div className='s-160'>{postMarkup}</div>}
      </div>
   )
}
