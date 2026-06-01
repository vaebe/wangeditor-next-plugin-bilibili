import type { SlateElement } from '@wangeditor-next/editor'
import { BILIBILI_VIDEO_TYPE } from '../constants'

/**
 * Bilibili 视频自定义元素的数据结构。
 *
 * - `inline = false`、`void = true`（在 {@link withBilibili} 编辑器插件中声明）。
 * - `children` 固定为一个空文本节点，这是 wangEditor-next 对 void 元素的硬性要求。
 */
export interface BilibiliVideoElement {
  type: typeof BILIBILI_VIDEO_TYPE
  /** 视频 BV 号，例如 `BV1xx411c7mD`。 */
  bvid: string
  /** 播放器 iframe 的 src。由 {@link buildPlayerSrc} 根据 `bvid` 生成。 */
  src: string
  children: [{ text: '' }]
}

/**
 * 类型守卫：判断任意 Slate 元素是否为 Bilibili 视频元素。
 *
 * 内部统一通过此守卫收窄类型，从而在不使用 `any` 的前提下安全访问
 * `bvid` / `src` 字段。
 */
export function isBilibiliVideoElement(elem: SlateElement): elem is BilibiliVideoElement {
  return (elem as { type?: string }).type === BILIBILI_VIDEO_TYPE
}
