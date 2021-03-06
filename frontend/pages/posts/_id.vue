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
      v-if="post"
      class="bg-nord-nord6 dark:bg-dark-container p-4 lg:max-w-screen-lg m-auto shadow-md"
    >
      <h1 class="text-3xl">{{ post.title }}</h1>
      <div class="meta dark:text-dark-subtext my-2 font-light text-sm">
        <p>Published: {{ formatDate(post.createdAt.toString()) }}</p>
        <p v-if="post.updatedAt && post.updatedAt !== post.createdAt">
          Last updated: {{ formatDate(post.updatedAt) }}
        </p>
      </div>

      <hr class="my-2" />
      <p>{{ post.content }}</p>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// #endregion

import { MetaInfo } from 'vue-meta'
import VueRouter, { Route } from 'vue-router'
import Octicon from '@/components/Octicon.vue'
import { postModule } from '@/store'
import type { Post } from '@/types'

const fetchData = async ($route: Route, $router: VueRouter) => {
  const { id } = $route.params

  if (!id.match(/^\d+$/)) {
    $router.push('/posts')
  }

  return await postModule.fetchOne(parseInt(id))
}

export default Vue.extend({
  components: { Octicon },

  data() {
    return {
      fetching: false,
      post: {} as Post,
    }
  },

  fetch({ route }) {
    this.fetching = true
    fetchData(route, this.$router)
      .then((post) => {
        this.post = post
        this.fetching = false
      })
      .catch(() => {
        this.fetching = false
      })
  },

  head(): MetaInfo {
    return { title: this.post.title }
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

    fetch() {
      this.$fetch ? this.$fetch() : fetchData(this.$route, this.$router)
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
