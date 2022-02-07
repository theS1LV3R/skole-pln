<template>
  <header class="bg-nord-nord6 dark:bg-dark-container w-full">
    <div
      class="max-w-screen-lg py-4 px-12 m-auto flex justify-between items-center"
    >
      <NuxtLink to="/"
        ><h1 class="text-3xl -pr-4">{{ title }}</h1></NuxtLink
      >
      <div class="nav transition">
        <NuxtLink v-if="!$auth.loggedIn" to="/login">Login</NuxtLink>
        <span v-else>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/posts">Posts</NuxtLink>
          <div class="inline cursor-pointer" @click="showUserMenu()">
            <img
              class="rounded-full inline max-h-10"
              src="https://via.placeholder.com/100"
            /></div
        ></span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    showUserMenu() {
      this.$emit('showUserMenu')
    },
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
