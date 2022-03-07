<template>
  <div class="m-auto lg:w-1/2">
    <ul class="flex flex-row justify-evenly flex-wrap">
      <li
        v-for="tab in tabs"
        :key="tab.title"
        class="cursor-pointer p-2 rounded-t-lg flex-grow text-center"
        :class="{
          'dark:bg-dark-container': selectedIndex === getTabNumber(tab),
          'mr-2': getTabNumber(tab) !== tabs.length - 1,
          'ml-2': getTabNumber(tab) !== 0,
        }"
        @click="setTab(getTabNumber(tab))"
      >
        <Octicon v-if="tab.icon" :icon="tab.icon" /> {{ tab.title }}
      </li>
    </ul>
    <div
      class="m-auto dark:bg-dark-container shadow-md rounded-b-lg cursor-default flex flex-col"
      :class="{
        'rounded-tr-lg': selectedIndex !== tabs.length - 1,
        'rounded-tl-lg': selectedIndex !== 0,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Octicon from './Octicon.vue'
import { TabType } from '@/components/Tab.vue'

export default Vue.extend({
  components: { Octicon },

  props: {
    activeTab: {
      type: String,
      required: false,
      default: '',
    },
  },

  data() {
    return {
      selectedIndex: 0,
      tabs: [] as TabType[],
    }
  },

  mounted() {
    this.tabs = this.$children.filter(
      (child) => child.$options.name === 'Tab'
    ) as unknown as TabType[]

    if (this.activeTab) {
      const index = this.tabs.findIndex(
        (tab) => tab.name === this.activeTab.slice(1)
      )

      if (index === -1) {
        this.setTab(0)
      } else {
        this.setTab(index)
      }
    } else {
      this.setTab(0)
    }
  },

  methods: {
    setTab(index: number) {
      this.selectedIndex = index

      this.tabs.forEach((tab, i) => {
        tab.active = i === index
      })

      this.$router.push({ hash: this.tabs[index].name })
    },

    getTabNumber(searchTab: TabType) {
      return this.tabs.findIndex((tab) => tab.name === searchTab.name)
    },
  },
})
</script>
