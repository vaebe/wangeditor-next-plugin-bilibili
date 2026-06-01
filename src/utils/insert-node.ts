import { SlateEditor, SlateTransforms } from '@wangeditor-next/editor'
import type { IDomEditor } from '@wangeditor-next/editor'
import { BILIBILI_VIDEO_TYPE } from '../constants'
import type { BilibiliVideoElement } from '../types/element'
import { buildPlayerSrc } from './player'

/**
 * 根据 BV 号构造 {@link BilibiliVideoElement} 并插入到编辑器。
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

  // 选区为空时（如未聚焦编辑器、直接通过下拉面板菜单插入）兜底到文档末尾，
  // 避免 insertNodes 因无 selection 而静默失败（无任何提示地“点确定没反应”）。
  const at = editor.selection ?? SlateEditor.end(editor, [])
  SlateTransforms.insertNodes(editor, node, { at })
}
