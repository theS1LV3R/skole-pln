<template>
  <h1>Admin</h1>
</template>

<script lang="ts">
import { Middleware } from '@nuxt/types'
import Vue from 'vue'

const checkPerms: Middleware = ({ $auth, redirect }) => {
  if (!$auth.loggedIn) return redirect('/login')

  if (!$auth.user?.roles) return redirect('/')

  const roles = $auth.user.roles as string | string[]

  if (!roles.includes('admin') || roles !== 'admin') {
    redirect('/')
  }
}

export default Vue.extend({
  middleware: ['auth', checkPerms],
})
</script>
