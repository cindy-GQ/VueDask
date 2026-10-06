<script setup lang="ts">
import { ref } from 'vue'
import { Search as SearchIcon } from 'lucide-vue-next'

import { searchSongs } from '@/api/song'
import { MOCK_SONGS } from '@/mock/musicData'
import { usePlayerStore } from '@/stores/player'
import type { Song } from '@/types/music'
import { formatTime } from '@/utils/formatTime'

const keyword = ref('')
const results = ref<Song[]>([])
const searching = ref(false)

const playerStore = usePlayerStore()

async function handleSearch() {
  const kw = keyword.value.trim()
  if (!kw) return

  searching.value = true
  try {
    const data = await searchSongs(kw)
    results.value = data.songs
  } catch {
    results.value = MOCK_SONGS.filter(
      (song) =>
        song.name.toLowerCase().includes(kw.toLowerCase()) ||
        song.ar.some((artist) => artist.name.toLowerCase().includes(kw.toLowerCase())),
    )
  } finally {
    searching.value = false
  }
}

function handlePlay(song: Song) {
  playerStore.setQueue([song])
  playerStore.play()
}
</script>

<template>
  <div>
    <form class="mb-6 flex max-w-xl gap-2" @submit.prevent="handleSearch">
      <input
        v-model="keyword"
        type="text"
        placeholder="搜索歌曲 / 歌手"
        class="h-10 min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-900 px-4 text-sm outline-none focus:border-green-400"
      />
      <button
        type="submit"
        class="flex h-10 items-center gap-2 rounded-md bg-green-500 px-4 text-sm text-slate-950 transition-colors hover:bg-green-400"
      >
        <SearchIcon class="h-4 w-4" />
        搜索
      </button>
    </form>

    <p v-if="searching" class="text-slate-400">搜索中…</p>
    <div v-else-if="results.length" class="overflow-hidden rounded-lg bg-slate-900">
      <div
        v-for="song in results"
        :key="song.id"
        class="flex cursor-pointer items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-slate-800"
        @click="handlePlay(song)"
      >
        <img :src="song.al.picUrl" :alt="song.al.name" class="h-10 w-10 rounded object-cover" />
        <div class="min-w-0 flex-1">
          <p class="truncate font-medium">{{ song.name }}</p>
          <p class="truncate text-xs text-slate-400">{{ song.ar.map((a) => a.name).join(' / ') }}</p>
        </div>
        <span class="tabular-nums text-slate-400">{{ formatTime(song.dt / 1000) }}</span>
      </div>
    </div>
    <p v-else class="text-slate-400">输入关键词搜索歌曲</p>
  </div>
</template>
