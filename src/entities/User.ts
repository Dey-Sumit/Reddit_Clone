import { IsEmail, Length } from 'class-validator'
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   Index,
   CreateDateColumn,
   UpdateDateColumn,
   BeforeInsert,
} from 'typeorm'
import bcrypt from 'bcrypt'
import { classToPlain, Exclude } from 'class-transformer'

@Entity('users')
export class User extends BaseEntity {
   constructor(user: Partial<User>) {
      console.log(user)

      super()
      Object.assign(this, user)
   }

   @Exclude()
   @PrimaryGeneratedColumn()
   id: number

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

   @CreateDateColumn()
   createAt: Date

   @UpdateDateColumn()
   updateAt: Date

   @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(this.password, 6)
   }

   toJSON() {
      return classToPlain(this)
   }
}
