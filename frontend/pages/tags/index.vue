<template>
  <div id="taglist" class="max-w-screen-md mx-auto">
    <!-- list of tags and count of how many posts have that tag -->
    <h2
      class="text-2xl bg-nord-nord6 dark:bg-dark-container shadow-md p-4 rounded-md"
    >
      Tags
    </h2>
    <div v-if="Object.keys(tags).length > 0" class="taglist flex flex-wrap m-2">
      <Tag
        v-for="(num, tag) in tags"
        :key="tag"
        class="m-1"
        :tag="tag"
        :num="num"
      />
    </div>
    <div v-else>
      <h2
        class="bg-nord-nord6 dark:bg-dark-container shadow-md mt-4 p-4 text-2xl font-medium rounded"
      >
        No Tags
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { Context } from '@nuxt/types'

import Tag from '@/components/Tag.vue'

// const fetchTags = async ($content: Context['$content']) => {
//   const tags: Record<string, number> = (
//     (await $content('posts', { deep: true })
//       .only(['tags'])
//       .fetch()) as unknown as [{ tags: string[] }]
//   ).reduce((acc: Record<string, number>, cur) => {
//     ;(cur.tags || []).forEach((tag: string) => {
//       acc[tag] = (acc[tag] || 0) + 1
//     })
//     return acc
//   }, {})

//   return tags
// }

export default Vue.extend({
  components: {
    Tag,
  },

  // async asyncData({ $content }) {
  //   return { tags: await fetchTags($content) }
  // },

  data() {
    const tags: Record<string, number> = {}

    return {
      tags,
      loading: false,
    }
  },

  head() {
    return {
      title: 'All Tags',
    }
  },

  methods: {
    //   async fetchTags() {
    //     await fetchTags(this.$content).then((tags) => {
    //       this.tags = tags
    //     })
    //   },
  },
})
</script>
