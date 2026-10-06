import type { Playlist, Song } from '@/types/music'

export const MOCK_SONGS: Song[] = [
  {
    id: 'song_demo_1',
    name: '晴天',
    ar: [{ id: 101, name: '周杰伦' }],
    al: { id: 201, name: '叶惠美', picUrl: 'https://picsum.photos/seed/qingtian/300' },
    dt: 269000,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'song_demo_2',
    name: '七里香',
    ar: [{ id: 101, name: '周杰伦' }],
    al: { id: 202, name: '七里香', picUrl: 'https://picsum.photos/seed/qilixiang/300' },
    dt: 299000,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'song_demo_3',
    name: '稻香',
    ar: [{ id: 101, name: '周杰伦' }],
    al: { id: 203, name: '魔杰座', picUrl: 'https://picsum.photos/seed/daoxiang/300' },
    dt: 223000,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'song_demo_4',
    name: '告白气球',
    ar: [{ id: 101, name: '周杰伦' }],
    al: { id: 204, name: '周杰伦的床边故事', picUrl: 'https://picsum.photos/seed/gaobai/300' },
    dt: 215000,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'song_demo_5',
    name: '青花瓷',
    ar: [{ id: 101, name: '周杰伦' }],
    al: { id: 205, name: '我很忙', picUrl: 'https://picsum.photos/seed/qinghuaci/300' },
    dt: 237000,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
]

export const MOCK_LYRIC = `[00:00.00] 晴天 - 周杰伦
[00:12.50] 故事的小黄花
[00:16.00] 从出生那年就飘着
[00:19.50] 童年的荡秋千
[00:23.00] 随记忆一直晃到现在
[00:29.00] 吹着前奏望着天空
[00:35.00] 我想起花瓣试着掉落
[00:41.00] 为你翘课的那一天
[00:45.00] 花落的那一天
[00:48.00] 教室的那一间
[00:51.00] 我怎么看不见
[00:54.00] 消失的下雨天
[00:57.00] 我好想再淋一遍
`

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'pl_101',
    name: '流行趋势热歌榜',
    coverImgUrl: 'https://picsum.photos/seed/playlist101/300',
    playCount: 1250000,
    description: '每周精选流行爆款歌曲',
    tracks: MOCK_SONGS,
  },
  {
    id: 'pl_102',
    name: '华语经典回忆',
    coverImgUrl: 'https://picsum.photos/seed/playlist102/300',
    playCount: 860000,
    description: '那些年我们循环过的华语金曲',
    tracks: [MOCK_SONGS[0], MOCK_SONGS[1], MOCK_SONGS[4]],
  },
  {
    id: 'pl_103',
    name: '午后轻音乐',
    coverImgUrl: 'https://picsum.photos/seed/playlist103/300',
    playCount: 430000,
    description: '适合午后小憩的舒缓旋律',
    tracks: [MOCK_SONGS[2], MOCK_SONGS[3]],
  },
]
