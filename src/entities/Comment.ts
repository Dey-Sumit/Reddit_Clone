import Entity from './Entity'
import {
   BeforeInsert,
   Column,
   Entity as TOEntity,
   Index,
   JoinColumn,
   ManyToOne,
} from 'typeorm'

import User from './User'
import Post from './Post'
import { makeId } from '../utils/helpers'

@TOEntity('comments')
export default class Comment extends Entity {
   constructor(comment: Partial<Comment>) {
      super()
      Object.assign(this, comment)
   }

   @Column()
   @Index()
   identifier: string

   @Column()
   body: string

   @Column()
   username: string

   @ManyToOne(() => User, user => user.posts)
   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
   user: User

   @ManyToOne(() => Post, post => post.comments, { nullable: false })
   post: Post

   @BeforeInsert()
   makeIdAndSlug() {
      this.identifier = makeId(8)
   }
}