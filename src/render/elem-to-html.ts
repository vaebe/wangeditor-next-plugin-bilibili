import type { SlateElement } from '@wangeditor-next/editor'
import { isBilibiliVideoElement } from '../types/element'

/**
 * 将 `bilibili-video` 元素序列化为 HTML 字符串（用于 `editor.getHtml()`）。
 *
 * 输出形如：
 * ```html
 * <div data-w-e-type="bilibili-video" data-w-e-is-void data-bvid="BVxxxx"></div>
 * ```
 *
 * 仅持久化 `bvid`；`src` 在 {@link parseBilibiliVideoHtml} 还原时按 `bvid` 重建，
 * 从而避免把易变的播放器参数写死进 HTML。
 *
 * @param elem 当前 Slate 元素。
 * @param _childrenHtml void 元素无子内容，忽略。
 */
export function bilibiliVideoToHtml(elem: SlateElement, _childrenHtml: string): string {
  const bvid = isBilibiliVideoElement(elem) ? elem.bvid : ''
  return `<div data-w-e-type="bilibili-video" data-w-e-is-void data-bvid="${bvid}"></div>`
}
