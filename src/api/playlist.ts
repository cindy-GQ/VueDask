import { get } from './request'

import type { Playlist } from '@/types/music'

export function fetchPersonalizedPlaylists(limit = 10): Promise<Playlist[]> {
  return get<Playlist[]>('/playlist/personalized', { limit })
}

export function fetchPlaylistDetail(id: string): Promise<Playlist> {
  return get<Playlist>('/playlist/detail', { id })
}
