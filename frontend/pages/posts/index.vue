<template>
  <div class="postlist mx-auto lg:mt-0 mt-0 w-full lg:max-w-screen-lg">
    <div
      class="bg-nord-nord6 dark:bg-dark-container shadow-md mb-4 p-4 w-full flex justify-between rounded"
    >
      <h1 class="text-3xl font-medium">All Posts</h1>
    </div>
    <PostList :posts="posts" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// import { Post as PostType } from '@/types/post'
import PostList from '@/components/PostList.vue'

// async function fetchPosts($content: (a: string, b: object) => any) {
//   const posts = (await $content('posts', { deep: true })
//     .sortBy('date', 'desc')
//     .fetch()) as unknown as PostType[]

//   return posts
// }

export default Vue.extend({
  components: { PostList },

  // async asyncData({ $content }) {
  //   const posts = await fetchPosts($content)

  //   return {
  //     posts,
  //   }
  // },

  data() {
    return {
      loading: false,
      posts: [],
    }
  },

  head() {
    return {
      title: 'All Posts',
    }
  },
})
</script>
