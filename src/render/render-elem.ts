import { h } from 'snabbdom'
import type { VNode } from 'snabbdom'
import type { IDomEditor, SlateElement } from '@wangeditor-next/editor'
import { isBilibiliVideoElement } from '../types/element'

/**
 * 渲染 `bilibili-video` 元素为编辑器视图节点（snabbdom VNode）。
 *
 * 渲染结构：外层 `div` 使用 padding-bottom 56.25% 实现 **响应式 16:9** 容器，
 * 内层 `iframe` 绝对定位铺满，并带 `allowfullscreen` 与 `loading="lazy"`。
 *
 * @param elem 当前 Slate 元素。
 * @param _children void 元素无子节点，忽略。
 * @param _editor 编辑器实例，此处未使用。
 */
export function renderBilibiliVideo(
  elem: SlateElement,
  _children: VNode[] | null,
  _editor: IDomEditor,
): VNode {
  const src = isBilibiliVideoElement(elem) ? elem.src : ''

  const iframe = h('iframe', {
    attrs: {
      src,
      frameborder: '0',
      scrolling: 'no',
      allowfullscreen: true,
      loading: 'lazy',
    },
    style: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    },
  })

  return h(
    'div',
    {
      attrs: { 'data-w-e-type': 'bilibili-video' },
      // void 元素容器不可编辑。
      props: { contentEditable: false },
      style: {
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        height: '0',
        overflow: 'hidden',
      },
    },
    [iframe],
  )
}
