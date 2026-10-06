import { describe, expect, it } from 'vitest'

import { parseLRC } from './lrcParser'

describe('LRC 歌词解析器测试', () => {
  it('应该正确解析标准 LRC 格式字符串', () => {
    const lrc = '[00:12.50] 故事的小黄花'
    const result = parseLRC(lrc)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      time: 12.5,
      text: '故事的小黄花',
    })
  })

  it('空文本或非法格式应返回空数组', () => {
    expect(parseLRC('')).toEqual([])
    expect(parseLRC('[ar:周杰伦]')).toEqual([])
  })

  it('应该解析多行并按时间排序', () => {
    const lrc = '[00:10.00] 第二句\n[00:05.00] 第一句'
    const result = parseLRC(lrc)

    expect(result.map((line) => line.text)).toEqual(['第一句', '第二句'])
  })

  it('应该处理同一行多个时间戳', () => {
    const lrc = '[00:01.00][00:02.00] 重复句'
    const result = parseLRC(lrc)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ time: 1, text: '重复句' })
    expect(result[1]).toEqual({ time: 2, text: '重复句' })
  })

  it('应该处理无小数部分的整数时间戳', () => {
    const lrc = '[00:30] 没有毫秒'
    const result = parseLRC(lrc)

    expect(result[0]).toEqual({ time: 30, text: '没有毫秒' })
  })
})
