<template><div>418</div></template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  beforeMount() {
    this.$nuxt.error({ statusCode: 418, message: "I'm a teapot" })
  },
})
</script>
