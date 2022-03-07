<template>
  <div class="postlist mx-auto lg:mt-0 mt-0 w-full lg:max-w-screen-lg">
    <div
      class="bg-nord-nord6 dark:bg-dark-container shadow-md mb-4 p-4 w-full flex justify-between rounded"
    >
      <h1 class="text-3xl font-medium">All Posts</h1>
      <p @click="fetch()">
        <Octicon icon="sync" />
      </p>
    </div>
    <PostList :posts="posts" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import PostList from '@/components/PostList.vue'
import Octicon from '@/components/Octicon.vue'
import { postModule } from '@/store'

const fetchData = async () => await postModule.fetchAll()

export default Vue.extend({
  components: { PostList, Octicon },
  middleware: ['auth'],

  async fetch() {
    await fetchData()
  },

  head() {
    return {
      title: 'All Posts',
    }
  },

  computed: {
    posts() {
      return postModule.posts
    },
  },

  methods: {
    fetch() {
      this.$fetch ? this.$fetch() : fetchData()
    },
  },
})
</script>
