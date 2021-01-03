import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

import { Post } from '../types'
import useSWR from 'swr'

export default function Home() {
   const { data: posts } = useSWR('/posts')

   // const [posts, setPosts] = useState<Post[]>([])
   // useEffect(() => {
   //    axios
   //       .get('/posts')
   //       .then(res => setPosts(res.data))
   //       .catch(error => console.log(error))
   // }, [])

   return (
      <div>
         <div className='container flex pt-6 '>
            {/* Post Feed */}
            <div className='w-160'>
               {posts?.map((post: Post) => (
                  <PostCard post={post} key={post.identifier} />
               ))}
            </div>
            {/* sidebar */}
         </div>
      </div>
   )
}
