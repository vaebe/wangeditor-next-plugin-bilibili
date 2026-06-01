import { describe, expect, it } from 'vitest'
import { parseBilibiliUrl } from '../src/utils/url'

describe('parseBilibiliUrl', () => {
  it('匹配 www 直链', () => {
    expect(parseBilibiliUrl('https://www.bilibili.com/video/BV1xx411c7mD')).toEqual({
      matched: true,
      bvid: 'BV1xx411c7mD',
    })
  })

  it('匹配 m 直链（含 query）', () => {
    expect(parseBilibiliUrl('https://m.bilibili.com/video/BV1GJ411x7h7?p=2')).toEqual({
      matched: true,
      bvid: 'BV1GJ411x7h7',
    })
  })

  it('匹配无 www 前缀的直链', () => {
    expect(parseBilibiliUrl('http://bilibili.com/video/BV1GJ411x7h7')).toEqual({
      matched: true,
      bvid: 'BV1GJ411x7h7',
    })
  })

  it('不匹配 b23.tv 短码', () => {
    expect(parseBilibiliUrl('https://b23.tv/abcDEF')).toEqual({ matched: false })
  })

  it('不匹配非 Bilibili 链接', () => {
    expect(parseBilibiliUrl('https://example.com/video/BV1xx411c7mD')).toEqual({ matched: false })
  })

  it('空输入返回 matched:false', () => {
    expect(parseBilibiliUrl('')).toEqual({ matched: false })
  })
})
