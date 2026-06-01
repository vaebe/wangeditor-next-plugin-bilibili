import { describe, expect, it } from 'vitest'
import { extractBvid } from '../src/utils/bvid'

describe('extractBvid', () => {
  it('从纯 BV 号中提取', () => {
    expect(extractBvid('BV1xx411c7mD')).toBe('BV1xx411c7mD')
  })

  it('从 www 直链中提取', () => {
    expect(extractBvid('https://www.bilibili.com/video/BV1xx411c7mD')).toBe('BV1xx411c7mD')
  })

  it('从 m 直链中提取', () => {
    expect(extractBvid('https://m.bilibili.com/video/BV1GJ411x7h7?p=1')).toBe('BV1GJ411x7h7')
  })

  it('从夹带文字中提取首个 BV 号', () => {
    expect(extractBvid('快看这个视频 BV1GJ411x7h7 很棒')).toBe('BV1GJ411x7h7')
  })

  it('无 BV 号时返回 null', () => {
    expect(extractBvid('https://example.com/foo')).toBeNull()
  })

  it('空字符串返回 null', () => {
    expect(extractBvid('')).toBeNull()
  })
})
