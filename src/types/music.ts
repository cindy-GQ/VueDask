export interface Artist {
  id: number | string
  name: string
}

export interface Album {
  id: number | string
  name: string
  picUrl: string
}

export interface Song {
  id: number | string
  name: string
  ar: Artist[]
  al: Album
  dt: number
  url: string
}

export interface LyricLine {
  time: number
  text: string
}

export enum PlayMode {
  SEQUENCE = 'sequence',
  LOOP = 'loop',
  RANDOM = 'random',
}

export interface Playlist {
  id: string
  name: string
  coverImgUrl: string
  playCount: number
  description?: string
  tracks?: Song[]
}

export interface SearchResult {
  songs: Song[]
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
