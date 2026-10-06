<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => {
  switch (route.name) {
    case 'home':
      return '首页推荐'
    case 'search':
      return '搜索'
    case 'playlist-detail':
      return '歌单详情'
    default:
      return 'VueDask'
  }
})
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/40 px-6">
    <h1 class="text-xl font-semibold">{{ title }}</h1>
  </header>
</template>
