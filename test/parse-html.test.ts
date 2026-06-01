import { describe, expect, it } from 'vitest'
import { parseBilibiliVideoHtml } from '../src/parse/parse-elem-html'
import { bilibiliVideoToHtml } from '../src/render/elem-to-html'
import { BILIBILI_VIDEO_TYPE } from '../src/constants'
import type { BilibiliVideoElement } from '../src/types/element'

/** 根据 HTML 字符串构造首个元素节点（依赖 jsdom 环境）。 */
function htmlToElement(html: string): Element {
  const container = document.createElement('div')
  container.innerHTML = html
  const elem = container.firstElementChild
  if (!elem) {
    throw new Error('no element parsed')
  }
  return elem
}

describe('parseBilibiliVideoHtml', () => {
  it('从 data-bvid 还原元素并重建 src', () => {
    const domElem = htmlToElement(
      '<div data-w-e-type="bilibili-video" data-w-e-is-void data-bvid="BV1xx411c7mD"></div>',
    )
    const node = parseBilibiliVideoHtml(domElem, [], {} as never) as unknown as BilibiliVideoElement

    expect(node.type).toBe(BILIBILI_VIDEO_TYPE)
    expect(node.bvid).toBe('BV1xx411c7mD')
    expect(node.src).toContain('bvid=BV1xx411c7mD')
    expect(node.children).toEqual([{ text: '' }])
  })

  it('与 elemToHtml 往返一致', () => {
    const original: BilibiliVideoElement = {
      type: BILIBILI_VIDEO_TYPE,
      bvid: 'BV1GJ411x7h7',
      src: 'https://player.bilibili.com/player.html?bvid=BV1GJ411x7h7',
      children: [{ text: '' }],
    }

    const html = bilibiliVideoToHtml(original as never, '')
    const node = parseBilibiliVideoHtml(
      htmlToElement(html),
      [],
      {} as never,
    ) as unknown as BilibiliVideoElement

    expect(node.bvid).toBe(original.bvid)
    expect(node.type).toBe(original.type)
  })
})
