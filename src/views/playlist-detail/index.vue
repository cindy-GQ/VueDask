<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Play } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

import { usePlayerStore } from '@/stores/player'
import { useSongStore } from '@/stores/song'
import type { Song } from '@/types/music'
import { formatTime } from '@/utils/formatTime'

const route = useRoute()
const songStore = useSongStore()
const playerStore = usePlayerStore()

const playlistId = computed(() => String(route.params.id))
const tracks = computed(() => songStore.currentPlaylist?.tracks ?? [])

onMounted(() => {
  songStore.loadPlaylistDetail(playlistId.value)
})

function handlePlayAll() {
  if (tracks.value.length) {
    playerStore.setQueue(tracks.value)
    playerStore.play()
  }
}

function handlePlayAt(index: number) {
  playerStore.playAt(index)
}

function isCurrentSong(song: Song) {
  return playerStore.currentSong?.id === song.id
}
</script>

<template>
  <div v-if="songStore.currentPlaylist">
    <div class="mb-6 flex items-end gap-6">
      <img
        :src="songStore.currentPlaylist.coverImgUrl"
        :alt="songStore.currentPlaylist.name"
        class="h-40 w-40 rounded-lg object-cover"
      />
      <div>
        <h2 class="mb-2 text-2xl font-bold">{{ songStore.currentPlaylist.name }}</h2>
        <p v-if="songStore.currentPlaylist.description" class="text-sm text-slate-400">
          {{ songStore.currentPlaylist.description }}
        </p>
        <button
          class="mt-4 flex items-center gap-2 rounded-full bg-green-500 px-6 py-2 text-slate-950 transition-colors hover:bg-green-400"
          @click="handlePlayAll"
        >
          <Play class="h-5 w-5" />
          全部播放
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-lg bg-slate-900">
      <div class="grid grid-cols-[2rem_1fr_1fr_1fr_4rem] gap-4 border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
        <span>#</span>
        <span>歌曲</span>
        <span>歌手</span>
        <span>专辑</span>
        <span class="text-right">时长</span>
      </div>
      <div
        v-for="(song, index) in tracks"
        :key="song.id"
        class="grid cursor-pointer grid-cols-[2rem_1fr_1fr_1fr_4rem] items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-slate-800"
        :class="isCurrentSong(song) ? 'text-green-400' : 'text-slate-200'"
        @click="handlePlayAt(index)"
      >
        <span class="tabular-nums">{{ index + 1 }}</span>
        <span class="truncate font-medium">{{ song.name }}</span>
        <span class="truncate">{{ song.ar.map((a) => a.name).join(' / ') }}</span>
        <span class="truncate">{{ song.al.name }}</span>
        <span class="text-right tabular-nums">{{ formatTime(song.dt / 1000) }}</span>
      </div>
    </div>
  </div>
  <p v-else class="text-slate-400">加载中…</p>
</template>
