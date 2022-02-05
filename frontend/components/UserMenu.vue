<template>
  <div
    class="h-96 w-96 dark:bg-dark-container shadow-md rounded-lg cursor-default p-4 flex flex-col"
  >
    <button
      class="mt-auto self-end p-1 py-0.5 dark:border-nord-nord2 cursor-pointer shadow-md appearance-none border rounded w-full px-3 text-gray-500 dark:bg-dark-background bg-nord-nord4"
      @click.prevent="logout()"
    >
      Logout
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    hide() {
      this.$emit('hide')
    },

    async logout() {
      await this.$auth.logout().then(async () => {
        await this.$axios
          .$post(
            '/auth/logout',
            {},
            {
              withCredentials: true,
            }
          )
          .then(() => {
            this.$toast.success('Successfully logged out')
          })
          .catch(() => {
            this.$store.$auth.reset()
          })
      })
    },
  },
})
</script>
