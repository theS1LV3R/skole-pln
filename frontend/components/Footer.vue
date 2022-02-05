<template>
  <div>
    <footer class="text-center bg-nord-nord6 dark:bg-dark-container p-4 pb-3">
      <p>
        Made with ❤ using
        <a target="_blank" rel="noopener noreferrer" href="https://nuxtjs.org/">
          <NuxtLogo class="inline-logo" />Nuxt.js</a
        >
        and
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://tailwindcss.com/"
        >
          <TailwindLogo class="inline-logo" />Tailwind</a
        >.
      </p>
      <ThemeSelect />
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import NuxtLogo from '@/components/logos/Nuxt.vue'
import TailwindLogo from '@/components/logos/Tailwind.vue'
import ThemeSelect from '@/components/ThemeSelect.vue'

export default Vue.extend({
  components: {
    NuxtLogo,
    TailwindLogo,
    ThemeSelect,
  },
})
</script>

<style lang="scss" scoped>
.inline-logo {
  display: inline;
  max-height: 1rem;
  max-width: 1rem;
  vertical-align: baseline;
}

a {
  @apply underline;
}
</style>
