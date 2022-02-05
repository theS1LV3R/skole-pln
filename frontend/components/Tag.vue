<template>
  <NuxtLink class="hover:underline" :to="`/tags/${tag}`"
    ><span class="bg-nord-nord9 dark:bg-nord-nord1 p-1 rounded-l">{{ tag }}</span
    ><span class="bg-nord-nord8 dark:bg-nord-nord3 p-1 rounded-r">{{ num }}</span></NuxtLink
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tag: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
      required: true,
    },
  },
})
</script>
