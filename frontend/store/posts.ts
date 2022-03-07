import {
  Action,
  MutationAction,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'
import type { Post } from '@/types'
import { $axios } from '@/utils/api'

@Module({
  name: 'posts',
  namespaced: true,
  stateFactory: true,
})
export default class PostModule extends VuexModule {
  posts: Post[] = []

  @Mutation
  set(posts: Post[]) {
    this.posts = posts
  }

  @Mutation
  add(post: Post) {
    this.posts.push(post)
  }

  @Mutation
  remove(post: Post) {
    const index = this.posts.findIndex((p) => p.id === post.id)

    if (index !== -1) {
      this.posts.splice(index, 1)
    }
  }

  @Mutation
  update(post: Post) {
    const index = this.posts.findIndex((p) => p.id === post.id)
    this.posts.splice(index, 1, post)
  }

  @MutationAction
  async fetchAll() {
    const posts = await $axios.$get<Post[]>('/posts')

    return { posts }
  }

  @Action
  async fetchOne(id: number): Promise<Post> {
    const post = await $axios.$get<Post>(`/posts/${id}`)
    this.update(post)
    return post
  }

  get allByUserId() {
    return (userId: number) => this.posts.filter((p) => p.user.id === userId)
  }

  get post() {
    return (id: number) => this.posts.find((p) => p.id === id)
  }
}
