<template>
  <PostList v-if="!fetching" :posts="posts" />
  <div v-else>
    <h1
      class="bg-nord-nord6 dark:bg-dark-container shadow-md mb-4 p-4 text-3xl font-medium"
    >
      Loading...
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import PostList from '../PostList.vue'
import { postModule } from '@/store'
import type { Post } from '@/types'

const fetchData = async () => await postModule.fetchAll()

export default Vue.extend({
  components: { PostList },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      fetching: true,
      posts: [] as Post[],
    }
  },

  async fetch() {
    await fetchData()
  },

  created() {
    this.fetching = true
    fetchData()
      .then(() => {
        this.posts = postModule.allByUserId(this.user.id)
        this.fetching = false
      })
      .catch(() => {
        this.fetching = false
      })
  },
})
</script>
