import { IsEmail, Length } from 'class-validator'
import {
   Entity as TOEntity,
   Column,
   Index,
   BeforeInsert,
   OneToMany,
} from 'typeorm'

import bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import Entity from './Entity'
import Post from './Post'

@TOEntity('users')
export default class User extends Entity {
   constructor(user: Partial<User>) {
      super()
      Object.assign(this, user)
   }

   @Index()
   @IsEmail()
   @Column({ unique: true })
   email: string

   @Index()
   @Length(3, 15)
   @Column({ unique: true })
   username: string

   @Column()
   @Length(6)
   @Exclude()
   password: string

   @OneToMany(() => Post, post => post.user)
   posts: Post[]

   @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, 6)
   }
}
