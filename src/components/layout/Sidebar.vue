<script setup lang="ts">
import { Home, Music, Search } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const navItems = [
  { name: '首页', path: '/', icon: Home },
  { name: '搜索', path: '/search', icon: Search },
]
</script>

<template>
  <aside class="flex w-56 flex-col border-r border-slate-800 bg-slate-900/60 p-4">
    <div class="mb-8 flex items-center gap-2 px-2">
      <Music class="h-6 w-6 text-green-400" />
      <span class="text-lg font-bold">VueDask</span>
    </div>
    <nav class="flex flex-col gap-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        active-class="bg-slate-800 text-white"
      >
        <component :is="item.icon" class="h-5 w-5" />
        {{ item.name }}
      </RouterLink>
    </nav>
  </aside>
</template>
