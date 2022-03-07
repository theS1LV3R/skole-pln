/* eslint-disable no-use-before-define */
export enum Roles {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

export interface User {
  id: number
  username: string
  roles: Roles[]
  createdAt: string
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  user: User
  post: Post
}

export interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  user: User
  comments: Comment[]
}
