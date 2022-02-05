<template>
  <div>
    <span v-if="posts.length > 0">
      <Post
        v-for="post in posts"
        :key="post.url"
        class="mb-4 shadow-md"
        :post="post"
      />
    </span>
    <div v-else>
      <h1
        class="bg-nord-nord6 dark:bg-dark-container shadow-md mb-4 p-4 text-3xl font-medium"
      >
        No Posts
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Post as PostType } from '@/types/post'
import Post from '@/components/Post.vue'

export default Vue.extend({
  components: { Post },

  props: {
    posts: {
      type: Array as () => PostType[],
      required: true,
    },
  },
})
</script>
