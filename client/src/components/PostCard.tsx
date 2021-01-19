import Link from 'next/link'
import { Fragment } from 'react'
import { Post } from '../types'

import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import { BiUpvote, BiDownvote } from 'react-icons/bi'
import axios from 'axios'
import ActionButton from './ActionButton'

interface PostCardProps {
   post: Post
}

const PostCard: React.FC<PostCardProps> = ({
   post: {
      body,
      createdAt,
      identifier,
      slug,
      subName,
      title,
      updatedAt,
      url,
      username,
      commentCount,
      userVote,
      voteScore,
   },
}) => {
   const vote = async value => {
      console.log('Called')

      try {
         const res = await axios.post('/misc/vote', {
            identifier,
            slug,
            value,
         })
         console.log(res.data)
      } catch (error) {}
   }

   return (
      <div key={identifier} className='flex mb-4 bg-white rounded'>
         {/* Vote Section */}
         <div className='w-10 py-3 text-center bg-gray-200 rounded-l'>
            <div
               className='w-6 mx-auto text-gray-500 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-300'
               onClick={() => vote(1)}>
               <BiUpvote
                  size={24}
                  className={classNames({ 'text-blue-500': userVote === 1 })}
               />
            </div>
            <p className='text-sm font-bold'>{voteScore}</p>

            <div
               className='w-6 mx-auto text-gray-500 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-300'
               onClick={() => vote(-1)}>
               <BiDownvote
                  size={24}
                  className={classNames({ 'text-red-500': userVote === -1 })}
               />
            </div>
         </div>

         {/* data section */}
         <div className='w-full p-2'>
            <div className='flex items-center'>
               <Link href={`r/${subName}`}>
                  <img
                     src='https://i2.wp.com/cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-01.png?ssl=1'
                     className='w-6 h-6 mr-3 rounded-full cursor-pointer '
                     alt=''
                  />
               </Link>
               <Link href={`r/${subName}`}>
                  <a className='text-sm font-bold cursor-pointer hover:underline'>
                     /r/{subName}
                  </a>
               </Link>

               <p className='text-sm text-gray-600'>
                  <span className='mx-1'>•</span> by
                  {/* //TODO fix the user */}
                  <Link href={`/u/${username}`}>
                     <a className='mx-1 hover:underline'>/u/{username}</a>
                  </Link>
                  <Link href={url}>
                     <a className='mx-1 hover:underline'>
                        {dayjs(createdAt).fromNow()}
                     </a>
                  </Link>
               </p>
            </div>

            <Link href={url}>
               <a className='my-1 font-bold text-md'>{title}</a>
            </Link>
            {body && <p className='my-1 text-md'>{body}</p>}

            <div className='flex'>
               <Link href={url}>
                  <a>
                     <ActionButton>
                        <i className='mr-1 fa-xs fas fa-comment-alt'></i>
                        <span className='font-bold'>
                           {commentCount} Comments
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
   )
}

export default PostCard
