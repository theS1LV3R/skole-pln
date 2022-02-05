<template>
  <!-- post with image, title, date and excerpt -->
  <div
    class="post bg-nord-nord6 dark:bg-dark-container rounded p-4 flex flex-row"
  >
    <NuxtLink :to="`${post.dir}/${post.slug}`">
      <img
        v-if="post.image"
        class="post-image max-h-40 mr-4 rounded-sm max-w-2xl inline-block"
        :src="post.image"
        :alt="post.title"
      />
    </NuxtLink>
    <div class="post-content">
      <h2 class="post-title text-3xl">
        <NuxtLink class="hover:underline" :to="`${post.dir}/${post.slug}`">{{
          post.title
        }}</NuxtLink>
      </h2>
      <div class="post-meta dark:text-dark-subtext my-2 font-light text-sm">
        <span class="date">{{ formatDate() }}</span>
        <span v-if="post.tags" class="tags"
          >|
          <span v-for="tag in post.tags" :key="tag">
            <NuxtLink class="hover:underline" :to="'/tags/' + tag">{{
              tag
            }}</NuxtLink
            >{{
              post.tags && tag === post.tags[post.tags.length - 1] ? '' : ', '
            }}
          </span>
        </span>
      </div>
      <div class="post-excerpt">
        <p>
          {{ post.description || post.excerpt }}
          <NuxtLink class="underline" :to="`${post.dir}/${post.slug}`"
            >Read more...</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Post as PostType } from '@/types/post'

export default Vue.extend({
  props: {
    post: {
      type: Object as () => PostType,
      required: true,
    },
  },

  methods: {
    formatDate(): string {
      return new Date(this.post.date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      })
    },
  },
})
</script>
