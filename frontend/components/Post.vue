<template>
  <!-- post with image, title, date and excerpt -->
  <div
    class="post bg-nord-nord6 dark:bg-dark-container rounded p-4 flex flex-row"
  >
    <div class="post-content">
      <h2 class="post-title text-3xl">
        <NuxtLink class="hover:underline" :to="`/posts/${post.id}`">{{
          post.title
        }}</NuxtLink>
      </h2>
      <div class="post-meta dark:text-dark-subtext my-2 font-light text-sm">
        <span class="date">{{ formatDate() }}</span>
      </div>
      <div class="post-excerpt">
        <p>
          {{ trunctuate(post.content) }}
          <NuxtLink class="underline" :to="`/posts/${post.id}`"
            >Read more...</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Post as PostType } from '@/types/index.d'

export default Vue.extend({
  props: {
    post: {
      type: Object as () => PostType,
      required: true,
    },
  },

  methods: {
    formatDate(): string {
      return new Date(this.post.createdAt).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      })
    },

    trunctuate(text: string, length: number = 25): string {
      return text.length > length ? `${text.substr(0, length)}...` : text
    },
  },
})
</script>
