export interface Post {
   identifier: string
   title: string
   body: string
   slug: string
   subName: string
   createdAt: string
   updatedAt: string
   username: string
   //Virtual Fields
   url: string
   voteScore?: number
   commentCount?: number
   userVote?: number
   sub?: Sub
}

export interface User {
   username: string
   email: string
   createdAt: string
   updatedAt: string
}

export interface Sub {
   createdAt: string
   updatedAt: string
   name: string
   username: string
   title: string
   description: string
   imageUrn: string
   bannerUrn: string
   posts: Post[]
   //Virtuals
   imageUrl: string
   bannerUrl: string
   postCount: number
}
