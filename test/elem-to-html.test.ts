import { describe, expect, it } from 'vitest'
import { bilibiliVideoToHtml } from '../src/render/elem-to-html'
import { BILIBILI_VIDEO_TYPE } from '../src/constants'
import type { BilibiliVideoElement } from '../src/types/element'

const elem: BilibiliVideoElement = {
  type: BILIBILI_VIDEO_TYPE,
  bvid: 'BV1xx411c7mD',
  src: 'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD',
  children: [{ text: '' }],
}

describe('bilibiliVideoToHtml', () => {
  it('导出含 data-w-e-type 与 data-bvid 的 div', () => {
    const html = bilibiliVideoToHtml(elem as never, '')
    expect(html).toContain('data-w-e-type="bilibili-video"')
    expect(html).toContain('data-bvid="BV1xx411c7mD"')
    expect(html).toContain('data-w-e-is-void')
  })

  it('未知元素回退为空 bvid', () => {
    const html = bilibiliVideoToHtml({ type: 'paragraph' } as never, '')
    expect(html).toContain('data-bvid=""')
  })
})
