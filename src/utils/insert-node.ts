import { SlateTransforms } from '@wangeditor-next/editor'
import type { IDomEditor } from '@wangeditor-next/editor'
import { BILIBILI_VIDEO_TYPE } from '../constants'
import type { BilibiliVideoElement } from '../types/element'
import { buildPlayerSrc } from './player'

/**
 * 根据 BV 号构造 {@link BilibiliVideoElement} 并插入到编辑器当前选区。
 *
 * 作为「粘贴解析」与「菜单插入」两条路径的公共出口，保证插入逻辑唯一。
 *
 * @param editor 目标编辑器实例。
 * @param bvid 视频 BV 号。
 */
export function insertBilibiliVideoNode(editor: IDomEditor, bvid: string): void {
  const node: BilibiliVideoElement = {
    type: BILIBILI_VIDEO_TYPE,
    bvid,
    src: buildPlayerSrc(bvid),
    children: [{ text: '' }],
  }

  // void 元素需作为独立块插入。
  SlateTransforms.insertNodes(editor, node)
}
