<template>
  <div class="w-full h-full flex flex-col justify-center">
    <Tabs class="" :active-tab="$route.hash">
      <Tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title"
        :icon="tab.icon"
        :name="tab.name"
      >
        <component :is="tab.component" :user="$auth.user" />
      </Tab>
    </Tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Octicon from '@/components/Octicon.vue'
import Tabs from '@/components/Tabs.vue'
import Tab, { TabType } from '@/components/Tab.vue'

import Settings from '@/components/user/Settings.vue'
import Posts from '@/components/user/Posts.vue'
import Comments from '@/components/user/Comments.vue'
import UserDetails from '@/components/user/UserDetails.vue'

export default Vue.extend({
  components: {
    Octicon,
    Tabs,
    Tab,
  },

  middleware: ['auth'],

  data() {
    return {
      tabs: [
        {
          title: 'Profile',
          name: 'profile',
          icon: 'person',
          component: UserDetails,
        },
        {
          title: 'Posts',
          name: 'posts',
          icon: 'rss',
          component: Posts,
        },
        {
          title: 'Comments',
          name: 'comments',
          icon: 'comment-discussion',
          component: Comments,
        },
        {
          title: 'Settings',
          name: 'settings',
          icon: 'gear',
          component: Settings,
        },
      ] as TabType[],
    }
  },
})
</script>
