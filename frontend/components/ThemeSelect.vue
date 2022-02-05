<template>
  <div class="flex flex-row justify-center">
    <div
      v-for="color in colors"
      :key="color"
      class="group border-2 rounded-md p-1 m-0.5 mt-3 cursor-pointer transform hover:-translate-y-1 transition"
      :class="{
        preferred: color === $colorMode.preference,
        selected: color === $colorMode.value,
        '-translate-y-1': color === $colorMode.preference,
      }"
      @click="$colorMode.preference = color"
    >
      <component :is="`icon-${color}-theme`" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IconDarkTheme from '@/components/icons/DarkTheme.vue'
import IconLightTheme from '@/components/icons/LightTheme.vue'
import IconSystemTheme from '@/components/icons/SystemTheme.vue'

export default Vue.extend({
  components: {
    IconDarkTheme,
    IconLightTheme,
    IconSystemTheme,
  },

  data() {
    return {
      colors: ['system', 'dark', 'light'],
    }
  },
})
</script>

<style lang="scss" scoped>
.preferred {
  @apply border-nord-nord14;
}

.selected {
  @apply text-nord-nord14;
}
</style>
