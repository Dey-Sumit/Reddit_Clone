import { Request } from 'express'
import {
   Entity as TOEntity,
   Column,
   Index,
   BeforeInsert,
   ManyToOne,
   JoinColumn,
   OneToMany,
   AfterLoad,
} from 'typeorm'

import bcrypt from 'bcrypt'
import Entity from './Entity'
import User from './User'
import { makeId, slugify } from '../utils/helpers'
import Sub from './Sub'
import Comment from './Comment'
import { Expose } from 'class-transformer'

@TOEntity('posts')
export default class Post extends Entity {
   constructor(post: Partial<Post>) {
      super()
      Object.assign(this, post)
   }

   @Index()
   @Column()
   identifier: string // 7 characters ID

   @Column()
   title: string

   @Index()
   @Column()
   slug: string

   @Column({ nullable: true, type: 'text' })
   body: string

   @Column()
   subName: string

   //TODO fix this
   @Column()
   username: string

   @ManyToOne(() => User, user => user.posts)
   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
   user: User

   @ManyToOne(() => Sub, sub => sub.posts)
   @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
   sub: Sub

   @OneToMany(() => Comment, comment => comment.post)
   comments: Comment[]

   @Expose()
   get url(): string {
      return `/r/${this.subName}/${this.identifier}/${this.slug}`
   }

   @BeforeInsert()
   makeIdAndSlug() {
      this.identifier = makeId(7)
      this.slug = slugify(this.title)
   }

   // protected url: string
   // @AfterLoad()
   // createFields() {
   //    this.url =
   // }
}
