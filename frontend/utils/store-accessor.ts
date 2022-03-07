import type { Store } from 'vuex/types/index'
import PostModule from '@/store/posts'

// eslint-disable-next-line import/no-mutable-exports
let postModule: PostModule

function initializeStores(store: Store<any>) {
  postModule = new PostModule(store)
}

export { initializeStores, postModule }
