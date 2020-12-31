import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Post } from '../types'

dayjs.extend(relativeTime)

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
                  <div
                     key={post.identifier}
                     className='flex mb-4 bg-white rounded'>
                     {/* Vote Section */}
                     <div className='w-10 text-center bg-gray-200 rounded-l'>
                        <p>V</p>
                     </div>

                     {/* Post data section */}
                     <div className='w-full p-2'>
                        <div className='flex items-center'>
                           <Link href={`r/${post.subName}`}>
                              <Fragment>
                                 <img
                                    src='https://i2.wp.com/cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-01.png?ssl=1'
                                    className='w-6 h-6 mr-3 rounded-full cursor-pointer '
                                    alt=''
                                 />

                                 <a className='text-sm font-bold cursor-pointer hover:underline'>
                                    /r/{post.subName}
                                 </a>
                              </Fragment>
                           </Link>

                           <p className='text-sm text-gray-600'>
                              <span className='mx-1'>•</span>
                              Posted by
                              {/* //TODO fix the user */}
                              <Link href={`/u/user`}>
                                 <a className='mx-1 hover:underline'>/u/user</a>
                              </Link>
                              <Link href={post.url}>
                                 <a className='mx-1 hover:underline'>
                                    {dayjs(post.createdAt).fromNow()}
                                 </a>
                              </Link>
                           </p>
                        </div>

                        <Link href={post.url}>
                           <a className='my-1 text-md '>{post.title}</a>
                        </Link>
                        {post.body && (
                           <p className='my-1 text-sm'>{post.body}</p>
                        )}

                        <div className='flex'>
                           <Link href={post.url}>
                              <a>
                                 <div className='p-1 mr-2 text-gray-500 rounded cursor-pointer hover:bg-gray-200'>
                                    <i className='mr-1 fa-xs fas fa-comment-alt'></i>
                                    <span className='font-bold'>
                                       20 Comments
                                    </span>
                                 </div>
                              </a>
                           </Link>
                           <div className='p-1 mr-2 text-gray-500 rounded cursor-pointer hover:bg-gray-200'>
                              <i className='mr-1 fa-xs fas fa-bookmark'></i>
                              <span className='font-bold'>Save</span>
                           </div>
                           <div className='p-1 mr-2 text-gray-500 rounded cursor-pointer hover:bg-gray-200'>
                              <i className='mr-1 fa-xs fas fa-share'></i>
                              <span className='font-bold'>Share</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            {/* sidebar */}
         </div>
      </div>
   )
}
