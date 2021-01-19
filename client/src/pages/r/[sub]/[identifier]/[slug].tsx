import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import useSWR from 'swr'
import Sidebar from '../../../../components/sidebar'
import { Post } from '../../../../types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useAuthState } from '../../../../context/auth.context'
import ActionButton from '../../../../components/ActionButton'
dayjs.extend(relativeTime)

export default function PostPage() {
   const router = useRouter()

   // global state
   const { authenticated } = useAuthState()

   const { identifier, slug, sub } = router.query

   const { data: post, error } = useSWR<Post>(
      identifier && slug ? `/posts/${identifier}/${slug}` : null
   )
   if (error) router.push('/')
   const vote = async (value: number) => {
      //check auth
      if (!authenticated) router.push('/login')

      // if vote is he same , reset vote
      if (value === post.userVote) value = 0

      try {
         const res = await axios.post('/misc/vote', {
            identifier,
            slug,
            value,
         })
         console.log(res.data)
      } catch (error) {}
   }
   console.log(post)
   //    const {
   //       body,
   //       createdAt,
   //       subName,
   //       title,
   //       updatedAt,
   //       url,
   //       username,
   //       commentCount,
   //       userVote,
   //       voteScore,
   //    } = post
   return (
      <>
         <Head>
            <title>{post?.title}</title>
         </Head>
         <Link href={`/r/${sub}`}>
            <a>
               <div className='flex items-center w-full h-20 p-8 bg-blue-500'>
                  <div className='container flex'>
                     {post && (
                        <div className='mr-2'>
                           <Image
                              className='rounded-full '
                              src={post.sub.imageUrl}
                              height={(8 * 16) / 4}
                              width={(8 * 16) / 4}
                           />
                        </div>
                     )}
                     <p className='text-xl font-semibold text-white '>
                        /r/{sub}
                     </p>
                  </div>
               </div>
            </a>
         </Link>

         <div className='container flex mt-5'>
            {/* Post */}
            <div className='w-160'>
               <div className='bg-white rounded'>
                  {post && (
                     <div className='flex'>
                        {/* votes section */}
                        <div className='w-10 py-3 text-center rounded-l'>
                           <div
                              className='w-6 mx-auto text-gray-500 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-300'
                              onClick={() => vote(1)}>
                              <BiUpvote
                                 size={24}
                                 className={classNames({
                                    'text-blue-500': post.userVote === 1,
                                 })}
                              />
                           </div>
                           <p className='text-sm font-bold'>{post.voteScore}</p>

                           <div
                              className='w-6 mx-auto text-gray-500 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-300'
                              onClick={() => vote(-1)}>
                              <BiDownvote
                                 size={24}
                                 className={classNames({
                                    'text-red-500': post.userVote === -1,
                                 })}
                              />
                           </div>
                        </div>
                        <div className='p-2'>
                           <div className='flex items-center'>
                              <Link href={`r/${post.subName}`}>
                                 <img
                                    src='https://i2.wp.com/cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-01.png?ssl=1'
                                    className='w-6 h-6 mr-3 rounded-full cursor-pointer '
                                    alt=''
                                 />
                              </Link>
                              <Link href={`r/${post.subName}`}>
                                 <a className='text-sm font-bold cursor-pointer hover:underline'>
                                    /r/{post.subName}
                                 </a>
                              </Link>

                              <p className='text-sm text-gray-600'>
                                 <span className='mx-1'>•</span> by
                                 {/* //TODO fix the user */}
                                 <Link href={`/u/${post.username}`}>
                                    <a className='mx-1 hover:underline'>
                                       /u/{post.username}
                                    </a>
                                 </Link>
                                 <Link href={post.url}>
                                    <a className='mx-1 hover:underline'>
                                       {dayjs(post.createdAt).fromNow()}
                                    </a>
                                 </Link>
                              </p>
                           </div>

                           {/* //post title and body */}
                           <h1 className='my-1 text-lg font-medium'>
                              {post.title}
                           </h1>
                           <p className='my-2 text-sm'>{post.body}</p>

                           <div className='flex'>
                              <Link href={post.url}>
                                 <a>
                                    <ActionButton>
                                       <i className='mr-1 fa-xs fas fa-comment-alt'></i>
                                       <span className='font-bold'>
                                          {post.commentCount} Comments
                                       </span>
                                    </ActionButton>
                                 </a>
                              </Link>
                              <ActionButton>
                                 <i className='mr-1 fa-xs fas fa-bookmark'></i>
                                 <span className='font-bold'>Save</span>
                              </ActionButton>

                              <ActionButton>
                                 <i className='mr-1 fa-xs fas fa-share'></i>
                                 <span className='font-bold'>Share</span>
                              </ActionButton>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            {/* Sidebar */}
            {post && <Sidebar sub={post.sub} />}
         </div>
      </>
   )
}
