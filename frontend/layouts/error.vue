<template>
  <div
    class="bg-nord-nord6 dark:bg-dark-container lg:max-w-screen-lg m-auto mt-6"
  >
    <div v-if="error.statusCode === 404">
      <h2>404</h2>
      <p>
        That page wasn't found. Click here to go to the front page:
        <nuxt-link to="/">/</nuxt-link>
      </p>
    </div>
    <div v-else>
      <p>An error occured that i havent bothered creating an error page for.</p>
    </div>
    <hr />
    <pre class="language-json">{{ error }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import * as Prism from 'prismjs'
import 'prismjs/components/prism-json'

export default Vue.extend({
  layout: 'default',
  props: {
    error: { type: Object, required: true },
  },
  head() {
    return {
      title: `${this.error.statusCode}: ${this.error.message}`,
      titleTemplate: '%s',
    }
  },

  mounted() {
    Prism.highlightAll()
  },
})
</script>
