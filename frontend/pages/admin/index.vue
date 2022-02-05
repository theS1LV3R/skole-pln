<template>
  <h1>Admin</h1>
</template>

<script lang="ts">
import { Middleware } from '@nuxt/types'
import Vue from 'vue'

const checkPerms: Middleware = ({ $auth, redirect }) => {
  if (!$auth.loggedIn) return redirect('/login')

  if (!$auth.user?.roles) return redirect('/')

  const user = $auth.user.roles as string | string[]

  if (!user.includes('admin') || user !== 'admin') {
    redirect('/')
  }
}

export default Vue.extend({
  middleware: [checkPerms],
})
</script>
