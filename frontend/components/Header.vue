<template>
  <header class="bg-nord-nord6 dark:bg-dark-container w-full">
    <div
      class="max-w-screen-lg py-4 px-12 m-auto flex justify-between items-center"
    >
      <NuxtLink to="/"
        ><h1 class="text-3xl -pr-4">{{ pageTitle }}</h1></NuxtLink
      >
      <div class="nav transition">
        <NuxtLink v-if="!$auth.loggedIn" to="/login">Login</NuxtLink>
        <span v-else>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/posts">Posts</NuxtLink>
          <NuxtLink v-if="$auth.user" to="/admin">Admin</NuxtLink>
          <div class="inline cursor-pointer">
            <NuxtLink to="/users/me">
              <img
                class="rounded-full inline max-h-10"
                src="https://via.placeholder.com/100"
              />
            </NuxtLink>
          </div>
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',

  data() {
    return {
      pageTitle: 'PLN - Nikolai',
    }
  },

  head() {
    return {
      changed: (info) => {
        if (info.title) {
          this.pageTitle = info.title
        }
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.nav a {
  @apply mx-2;

  &.nuxt-link-exact-active {
    @apply font-bold;
  }
}
</style>
