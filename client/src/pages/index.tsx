import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

import { Post } from '../types'

export default function Home() {
   const [posts, setPosts] = useState<Post[]>([])
   useEffect(() => {
      axios
         .get('/posts')
         .then(res => setPosts(res.data))
         .catch(error => console.log(error))
   }, [])

   return (
      <div className='pt-12'>
         <Head>
            <title>Create Next App</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className='container flex pt-6 '>
            {/* Post Feed */}
            <div className='w-160'>
               {posts.map(post => (
                  <PostCard post={post} key={post.identifier} />
               ))}
            </div>
            {/* sidebar */}
         </div>
      </div>
   )
}
