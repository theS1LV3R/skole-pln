<template>
  <div
    id="template-container"
    class="bg-nord-nord4 dark:bg-dark-background text-nord-nord2 dark:text-dark-text text-base"
  >
    <div
      v-if="userMenu"
      class="absolute top-0 left-0 h-screen w-screen backdrop-opacity-30 z-50 bg-dark-container bg-opacity-50 flex justify-center items-center cursor-pointer"
      @click="toggleUserMenu()"
    >
      <UserMenu @hide="toggleUserMenu()" />
    </div>
    <Header
      class="shadow-md"
      :title="pageTitle"
      @showUserMenu="toggleUserMenu()"
    />
    <main>
      <Nuxt class="p-8" />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import UserMenu from '@/components/UserMenu.vue'

const pageTitle = 'PLN - Nikolai'

export default Vue.extend({
  components: {
    Header,
    Footer,
    UserMenu,
  },

  data() {
    return {
      pageTitle,
      userMenu: false,
    }
  },

  methods: {
    toggleUserMenu() {
      this.userMenu = !this.userMenu
    },
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

/* stylelint-disable */
body,
html,
#__nuxt,
#__layout {
  height: 100%;
  padding: 0;
  margin: 0;

  @apply text-nord-nord2  dark:bg-dark-background dark:text-dark-text;
}
/* stylelint-enable */

.light {
  @apply bg-nord-nord4;
}

#template-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

main {
  flex: 1 0 auto;
}

* {
  font-family: Lato, sans-serif;
}
</style>
