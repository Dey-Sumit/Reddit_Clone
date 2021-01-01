import { Entity as TOEntity, Column, ManyToOne, JoinColumn } from 'typeorm'

import Entity from './Entity'
import User from './User'
import Comment from './Comment'
import Post from './Post'

@TOEntity('votes')
export default class Vote extends Entity {
   constructor(vote: Partial<Vote>) {
      super()
      Object.assign(this, vote)
   }

   @Column()
   value: number

   @ManyToOne(() => User, user => user.posts)
   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
   user: User

   @Column()
   username: string

   @ManyToOne(() => Post)
   post: Post

   @ManyToOne(() => Comment)
   comment: Comment

   // protected url: string
   // @AfterLoad()
   // createFields() {
   //    this.url =
   // }
}
