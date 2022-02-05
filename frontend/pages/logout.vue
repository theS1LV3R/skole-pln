<template>
  <h1>You've been logged out, refresh.</h1>
</template>

<script lang="ts">
import { Middleware } from '@nuxt/types'
import Vue from 'vue'

const logoutMiddleware: Middleware = async ({ $auth }) => {
  await logout($auth)
}

interface auth {
  logout(...args: unknown[]): Promise<void>
}

async function logout($auth: auth) {
  await $auth.logout()
}

export default Vue.extend({
  middleware: [logoutMiddleware],
})
</script>
