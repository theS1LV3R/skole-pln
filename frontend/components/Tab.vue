<template>
  <div v-show="active" class="p-3">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface TabType {
  name: string
  title: string
  icon?: string
  component?: Vue.Component
  [key: string]: any
}

export default Vue.extend({
  name: 'Tab',
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },

  data() {
    return {
      active: true,
    }
  },
})
</script>
