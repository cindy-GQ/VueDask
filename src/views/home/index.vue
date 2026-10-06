<script setup lang="ts">
import { onMounted } from 'vue'
import { Play } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import { usePlayerStore } from '@/stores/player'
import { useSongStore } from '@/stores/song'
import { formatPlayCount } from '@/utils/formatTime'

const songStore = useSongStore()
const playerStore = usePlayerStore()

onMounted(() => {
  songStore.loadRecommended()
})

function handlePlayAll(playlistId: string) {
  const playlist = songStore.recommendedPlaylists.find((p) => p.id === playlistId)
  if (playlist?.tracks?.length) {
    playerStore.setQueue(playlist.tracks)
    playerStore.play()
  }
}
</script>

<template>
  <div>
    <h2 class="mb-4 text-lg font-semibold">推荐歌单</h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <RouterLink
        v-for="playlist in songStore.recommendedPlaylists"
        :key="playlist.id"
        :to="{ name: 'playlist-detail', params: { id: playlist.id } }"
        class="group rounded-lg bg-slate-900 p-3 transition-colors hover:bg-slate-800"
      >
        <div class="relative mb-2 aspect-square overflow-hidden rounded-md">
          <img :src="playlist.coverImgUrl" :alt="playlist.name" class="h-full w-full object-cover" />
          <button
            class="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-slate-950 opacity-0 transition-opacity group-hover:opacity-100"
            :title="`播放 ${playlist.name}`"
            @click.prevent="handlePlayAll(playlist.id)"
          >
            <Play class="h-5 w-5" />
          </button>
        </div>
        <p class="truncate text-sm font-medium">{{ playlist.name }}</p>
        <p class="text-xs text-slate-400">播放量 {{ formatPlayCount(playlist.playCount) }}</p>
      </RouterLink>
    </div>
  </div>
</template>
