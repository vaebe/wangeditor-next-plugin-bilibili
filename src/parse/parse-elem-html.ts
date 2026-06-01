import type { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor-next/editor'
import { BILIBILI_VIDEO_TYPE } from '../constants'
import type { BilibiliVideoElement } from '../types/element'
import { buildPlayerSrc } from '../utils/player'

/**
 * 将导出的 HTML 容器还原为 `bilibili-video` 元素（用于 `editor.setHtml()`）。
 *
 * 读取 `data-bvid`，并据此重建 `src`，保证与渲染逻辑一致。
 *
 * @param domElem 匹配 selector 的 DOM 元素。
 * @param _children 解析得到的子节点（void 元素忽略）。
 * @param _editor 编辑器实例，此处未使用。
 */
export function parseBilibiliVideoHtml(
  domElem: Element,
  _children: SlateDescendant[],
  _editor: IDomEditor,
): SlateElement {
  const bvid = domElem.getAttribute('data-bvid') ?? ''

  const node: BilibiliVideoElement = {
    type: BILIBILI_VIDEO_TYPE,
    bvid,
    src: buildPlayerSrc(bvid),
    children: [{ text: '' }],
  }

  return node as unknown as SlateElement
}
