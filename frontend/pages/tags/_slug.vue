<template>
  <div class="flex flex-col max-w-screen-lg m-auto postlist w-full">
    <div
      class="bg-nord-nord6 dark:bg-dark-container shadow-md mb-4 p-4 w-full flex justify-between"
    >
      <h1 class="text-3xl font-medium">
        Posts tagged "{{ $route.params.slug }}"
      </h1>
    </div>
    <PostList :posts="posts" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// import { Post as PostType } from '@/types/post'
import PostList from '@/components/PostList.vue'

// async function fetchPosts($content: any, $route: any) {
//   const posts = (
//     (await $content('posts', { deep: true })
//       .sortBy('date', 'desc')
//       .fetch()) as unknown as PostType[]
//   ).filter((post) => post?.tags?.includes($route.params.slug))

//   return posts
// }

export default Vue.extend({
  components: { PostList },

  // async asyncData({ $content, route }) {
  //   const posts = await fetchPosts($content, route)

  //   return {
  //     posts,
  //   }
  // },

  data() {
    return {
      posts: [],
    }
  },

  head() {
    return {
      title: `Posts tagged "${this.$route.params.slug}"`,
    }
  },
})
</script>
