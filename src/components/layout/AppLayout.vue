<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import PlayerBar from '@/components/player/PlayerBar.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
    <Sidebar />
    <div class="flex min-w-0 flex-1 flex-col">
      <Header />
      <main class="flex-1 overflow-y-auto p-6 pb-28">
        <slot />
      </main>
    </div>
    <PlayerBar />
  </div>
</template>
