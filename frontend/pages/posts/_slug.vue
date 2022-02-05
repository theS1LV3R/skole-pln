<template>
  <div>
    <div class="lg:max-w-screen-lg m-auto mb-4">
      <div
        class="transform hover:-translate-y-0.5 transition max-w-min duration-300"
      >
        <NuxtLink
          to="/posts"
          class="p-2 bg-nord-nord6 dark:bg-dark-container shadow rounded hover:underline whitespace-nowrap"
          ><Octicon icon="arrow-left" /> Back</NuxtLink
        >
      </div>
    </div>
    <article
      class="bg-nord-nord6 dark:bg-dark-container p-4 lg:max-w-screen-lg m-auto shadow-md"
    >
      <img v-if="post.image" class="max-w-screen-sm m-auto" :src="post.image" />
      <h1 class="text-3xl">{{ post.title }}</h1>
      <div class="meta dark:text-dark-subtext my-2 font-light text-sm">
        <p>Published: {{ formatDate(post.createdAt.toString()) }}</p>
        <p v-if="post.updated && post.updated !== post.createdAt">
          Last updated: {{ formatDate(post.updated) }}
        </p>
        <p v-if="post.tags">
          Tags:
          <span v-for="tag in post.tags" :key="tag">
            <NuxtLink class="hover:underline" :to="'/tags/' + tag">{{
              tag
            }}</NuxtLink
            >{{
              post.tags && tag === post.tags[post.tags.length - 1] ? '' : ', '
            }}
          </span>
        </p>
      </div>

      <hr class="my-2" />
      <nuxt-content :document="post" />
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Prism from 'prismjs'

// #region PrismJS plugins
import 'prismjs/components/prism-sql.min.js'

import 'prismjs/plugins/toolbar/prism-toolbar.min.js'

import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import 'prismjs/plugins/line-highlight/prism-line-highlight.min.js'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
// #endregion

import Octicon from '@/components/octicon.vue'
import { Post } from '@/types/post'

export default Vue.extend({
  components: { Octicon },

  // async asyncData({ $content, params, error }) {
  //   const post = await $content('posts', params.slug)
  //     .fetch()
  //     .catch(() => {
  //       error({ statusCode: 404, message: 'Post not found' })
  //     })

  //   return { post }
  // },

  data() {
    return {
      post: {
        title: '',
        createdAt: '',
        updated: '',
        tags: [],
        image: '',
        content: '',
      },
    }
  },

  head() {
    // @ts-ignore shush
    return { title: (this.post as unknown as Post).title }
  },

  mounted() {
    // eslint-disable-next-line import/no-named-as-default-member
    Prism.highlightAll()
  },

  methods: {
    formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString('en-US', {
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

<style lang="scss">
.nuxt-content {
  code {
    @apply dark:bg-nord-nord3 px-1 rounded-md font-mono;
  }

  pre * {
    @apply bg-transparent dark:bg-transparent p-0 rounded-none;
  }

  pre {
    @apply mt-0;
  }

  h2 {
    @apply text-2xl;
  }

  h3 {
    @apply text-xl;
  }

  h4 {
    @apply text-lg;
  }

  h5 {
    @apply text-base;
  }

  a {
    @apply hover:underline text-nord-nord10;
  }

  h2,
  h3,
  h4,
  h5 {
    @apply font-bold ml-0 mt-4;

    & > a::before {
      display: inline;
      content: '# ';
    }
  }

  .filename {
    @apply text-sm dark:text-dark-subtext;
  }

  .nuxt-content-highlight {
    @apply mt-2;

    pre {
      @apply pt-2;
    }

    * {
      @apply m-0;

      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        'Liberation Mono', 'Courier New', monospace;
      overflow: auto;
      word-wrap: normal;
      white-space: pre;
      // line-height: 1.65rem;
      // font-size: 1rem;
    }

    .line-highlight {
      @apply mt-2;
    }
  }

  ul {
    @apply list-disc ml-4;
  }

  p {
    @apply my-4;
  }
}
</style>
