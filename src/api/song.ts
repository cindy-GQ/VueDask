import { get } from './request'

import type { SearchResult } from '@/types/music'

export interface LyricResponse {
  lyric: string
}

export function fetchSongLyric(id: number | string): Promise<LyricResponse> {
  return get<LyricResponse>('/song/lyric', { id })
}

export function searchSongs(keywords: string): Promise<SearchResult> {
  return get<SearchResult>('/search', { keywords })
}
