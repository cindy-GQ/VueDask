import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Playlist } from '@/types/music'
import { fetchPersonalizedPlaylists, fetchPlaylistDetail } from '@/api/playlist'
import { MOCK_PLAYLISTS } from '@/mock/musicData'

export const useSongStore = defineStore('song', () => {
  const recommendedPlaylists = ref<Playlist[]>([])
  const currentPlaylist = ref<Playlist | null>(null)
  const loading = ref(false)

  async function loadRecommended() {
    loading.value = true
    try {
      recommendedPlaylists.value = await fetchPersonalizedPlaylists()
    } catch {
      recommendedPlaylists.value = MOCK_PLAYLISTS
    } finally {
      loading.value = false
    }
  }

  async function loadPlaylistDetail(id: string) {
    loading.value = true
    try {
      currentPlaylist.value = await fetchPlaylistDetail(id)
    } catch {
      currentPlaylist.value = MOCK_PLAYLISTS.find((p) => p.id === id) ?? MOCK_PLAYLISTS[0] ?? null
    } finally {
      loading.value = false
    }
  }

  return { recommendedPlaylists, currentPlaylist, loading, loadRecommended, loadPlaylistDetail }
})
