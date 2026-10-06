<script setup lang="ts">
import { computed, ref } from 'vue'
import { ListMusic, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-vue-next'

import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { usePlayerStore } from '@/stores/player'
import { MOCK_LYRIC } from '@/mock/musicData'
import { PlayMode } from '@/types/music'
import { formatTime } from '@/utils/formatTime'
import LyricView from '@/components/lyric/LyricView.vue'
import ProgressBar from './ProgressBar.vue'
import VolumeControl from './VolumeControl.vue'

const playerStore = usePlayerStore()
useAudioPlayer()

const showLyric = ref(false)

const cover = computed(() => playerStore.currentSong?.al.picUrl ?? '')
const songName = computed(() => playerStore.currentSong?.name ?? '未在播放')
const artistName = computed(() => playerStore.currentSong?.ar.map((artist) => artist.name).join(' / ') ?? '')

const modeLabel = computed(() => {
  switch (playerStore.playMode) {
    case PlayMode.SEQUENCE:
      return '顺序播放'
    case PlayMode.LOOP:
      return '单曲循环'
    case PlayMode.RANDOM:
      return '随机播放'
  }
})

function handleToggleLyric() {
  showLyric.value = !showLyric.value
}
</script>

<template>
  <footer class="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center gap-6 border-t border-slate-800 bg-slate-900 px-6">
    <!-- 歌曲信息 -->
    <div class="flex w-56 min-w-0 items-center gap-3">
      <img v-if="cover" :src="cover" alt="封面" class="h-12 w-12 shrink-0 rounded-md object-cover" />
      <div v-else class="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-slate-800">
        <ListMusic class="h-6 w-6 text-slate-400" />
      </div>
      <div class="min-w-0">
        <p class="truncate text-sm font-medium">{{ songName }}</p>
        <p class="truncate text-xs text-slate-400">{{ artistName }}</p>
      </div>
    </div>

    <!-- 播放控制与进度 -->
    <div class="flex min-w-0 flex-1 flex-col items-center gap-1">
      <div class="flex items-center gap-4">
        <button class="text-slate-300 transition-colors hover:text-white" title="上一首" @click="playerStore.prev()">
          <SkipBack class="h-5 w-5" />
        </button>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 transition-transform hover:scale-105"
          :title="playerStore.isPlaying ? '暂停' : '播放'"
          @click="playerStore.togglePlay()"
        >
          <Pause v-if="playerStore.isPlaying" class="h-5 w-5" />
          <Play v-else class="h-5 w-5" />
        </button>
        <button class="text-slate-300 transition-colors hover:text-white" title="下一首" @click="playerStore.next()">
          <SkipForward class="h-5 w-5" />
        </button>
        <button
          class="text-slate-300 transition-colors hover:text-white"
          :title="modeLabel"
          @click="playerStore.cyclePlayMode()"
        >
          <Repeat v-if="playerStore.playMode !== PlayMode.RANDOM" class="h-5 w-5" />
          <Shuffle v-else class="h-5 w-5" />
        </button>
      </div>
      <div class="flex w-full items-center gap-2">
        <span class="w-10 shrink-0 text-right text-xs tabular-nums text-slate-400">{{ formatTime(playerStore.currentTime) }}</span>
        <ProgressBar class="min-w-0 flex-1" />
        <span class="w-10 shrink-0 text-xs tabular-nums text-slate-400">{{ formatTime(playerStore.duration) }}</span>
      </div>
    </div>

    <!-- 音量与歌词 -->
    <div class="flex w-56 items-center justify-end gap-4">
      <VolumeControl />
      <button
        class="text-slate-300 transition-colors hover:text-white"
        :title="showLyric ? '收起歌词' : '展开歌词'"
        @click="handleToggleLyric"
      >
        <ListMusic class="h-5 w-5" />
      </button>
    </div>
  </footer>

  <Teleport to="body">
    <div
      v-if="showLyric"
      class="fixed inset-x-0 top-0 bottom-20 z-40 bg-slate-950/90 backdrop-blur-sm"
      @click.self="handleToggleLyric"
    >
      <LyricView :lrc-text="MOCK_LYRIC" :current-time="playerStore.currentTime" />
    </div>
  </Teleport>
</template>
