import {
   Entity as TOEntity,
   Column,
   Index,
   ManyToOne,
   JoinColumn,
   OneToMany,
} from 'typeorm'

import Entity from './Entity'
import User from './User'
import Post from './Post'
import { Expose } from 'class-transformer'

@TOEntity('subs')
export default class Sub extends Entity {
   constructor(sub: Partial<Sub>) {
      super()
      Object.assign(this, sub)
   }

   @Index()
   @Column({ unique: true })
   name: string // 7 characters ID

   @Column()
   username: string

   @Column()
   title: string

   @Column({ nullable: true, type: 'text' })
   description: string

   @Column({ nullable: true })
   imageUrn: string

   @Column({ nullable: true })
   bannerUrn: string

   @ManyToOne(() => User)
   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
   user: User

   @OneToMany(() => Post, post => post.subName)
   posts: Post[]

   @Expose()
   get imageUrl(): string {
      const urn = this.imageUrn
      if (urn) return `${process.env.APP_URL}/images/${urn}`
      else {
         //place holder
         return 'https://www.hostpapa.in/knowledgebase/wp-content/uploads/2018/04/1-13.png'
      }
   }
   @Expose()
   get bannerUrl(): string | undefined {
      const urn = this.bannerUrn
      if (urn) return `${process.env.APP_URL}/images/${urn}`
      else {
         //place holder
         return undefined
      }
   }
}
