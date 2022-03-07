<template>
  <div class="flex flex-col">
    <table class="m-auto border-collapse">
      <tbody>
        <tr>
          <td>Username</td>
          <td>
            <p>{{ user.username }}</p>
          </td>
        </tr>
        <tr>
          <td>Created</td>
          <td>
            <p class="cursor-pointer" @click="showRawRegistration">
              {{ formatDate(user.createdAt) }}
              <Octicon icon="info" class="inline" />
            </p>
          </td>
        </tr>
        <tr>
          <td>Roles</td>
          <td>{{ user.roles }}</td>
        </tr>
        <tr>
          <td>Scheduled for deletion</td>
          <td>
            <p>{{ user.scheduledForDeletion }}</p>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      class="m-auto self-end p-0.5 dark:border-nord-nord2 cursor-pointer shadow-md appearance-none border rounded w-full text-gray-500 dark:bg-dark-background bg-nord-nord4 max-w-lg"
      @click.prevent="logout()"
    >
      Logout
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Octicon from '@/components/Octicon.vue'

export default Vue.extend({
  components: { Octicon },
  data() {
    return {
      edit: false,
      user: {
        username: (this.$auth.user?.username ?? '') as string,
        createdAt: (this.$auth.user?.createdAt ?? '') as string,
        roles: (this.$auth.user?.roles ?? []) as string[],
        scheduledForDeletion: (this.$auth.user?.scheduledForDeletion ??
          true) as boolean,
      },
    }
  },

  methods: {
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

    formatDate(date: Date | string) {
      return new Date(date).toLocaleDateString(['en-US'], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      })
    },

    showRawRegistration() {
      this.$toast.info(this.user.createdAt)
    },
  },
})
</script>

<style lang="scss" scoped>
td,
tr {
  @apply border dark:border-nord-nord7;
}
</style>
