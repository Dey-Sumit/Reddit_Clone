import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

import { Post, Sub } from '../types'
import useSWR from 'swr'
import Sidebar from '../components/sidebar'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
   const { data: posts } = useSWR('/posts')
   const { data: topSubs } = useSWR('/misc/top-subs')
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

            <div className='ml-6 w-80'>
               <div className='bg-white rounded'>
                  <div className='p-4 border-b-2'>
                     <p className='text-lg font-semibold text-center'>
                        Top Communities
                     </p>
                  </div>
                  <div>
                     {topSubs?.map((sub: Sub) => (
                        <div
                           key={sub.name}
                           className='flex items-center px-4 py-2 text-xs border-b'>
                           <div className='mr-2 overflow-hidden rounded-full cursor-pointer'>
                              <Link href={`/r/${sub.name}`}>
                                 <Image
                                    src={sub.imageUrl}
                                    alt='Sub'
                                    width={(6 * 16) / 4}
                                    height={(6 * 16) / 4}
                                 />
                              </Link>
                           </div>
                           <Link href={`/r/${sub.name}`}>
                              <a className='font-bold hover:cursor-pointer'>
                                 /r/{sub.name}
                              </a>
                           </Link>
                           <p className='ml-auto font-med'>{sub.postCount}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
