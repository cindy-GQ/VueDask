import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { MOCK_SONGS } from '@/mock/musicData'
import { PlayMode } from '@/types/music'
import { usePlayerStore } from './player'

describe('playerStore 播放队列与模式测试', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('应该设置播放队列并定位当前歌曲', () => {
    const store = usePlayerStore()
    store.setQueue(MOCK_SONGS, 1)

    expect(store.queue).toHaveLength(MOCK_SONGS.length)
    expect(store.currentIndex).toBe(1)
    expect(store.currentSong?.id).toBe(MOCK_SONGS[1].id)
  })

  it('顺序模式 next 到末尾后应回到开头', () => {
    const store = usePlayerStore()
    store.setQueue(MOCK_SONGS, MOCK_SONGS.length - 1)
    store.next()

    expect(store.currentIndex).toBe(0)
  })

  it('顺序模式 prev 到开头后应回到末尾', () => {
    const store = usePlayerStore()
    store.setQueue(MOCK_SONGS, 0)
    store.prev()

    expect(store.currentIndex).toBe(MOCK_SONGS.length - 1)
  })

  it('播放模式应按 顺序→循环→随机 循环切换', () => {
    const store = usePlayerStore()

    expect(store.playMode).toBe(PlayMode.SEQUENCE)
    store.cyclePlayMode()
    expect(store.playMode).toBe(PlayMode.LOOP)
    store.cyclePlayMode()
    expect(store.playMode).toBe(PlayMode.RANDOM)
    store.cyclePlayMode()
    expect(store.playMode).toBe(PlayMode.SEQUENCE)
  })

  it('音量应被限制在 0~1 之间', () => {
    const store = usePlayerStore()
    store.setVolume(2)
    expect(store.volume).toBe(1)
    store.setVolume(-1)
    expect(store.volume).toBe(0)
  })
})
