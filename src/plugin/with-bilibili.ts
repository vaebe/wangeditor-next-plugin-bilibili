import { DomEditor } from '@wangeditor-next/editor'
import type { IDomEditor } from '@wangeditor-next/editor'
import { BILIBILI_VIDEO_TYPE } from '../constants'
import { parseBilibiliUrl } from '../utils/url'
import { insertBilibiliVideoNode } from '../utils/insert-node'

/**
 * Bilibili 编辑器插件。
 *
 * 职责：
 * 1. 声明 `bilibili-video` 为 **块级（inline = false）** 且 **空元素（void = true）**。
 * 2. 劫持 `insertData`（粘贴 / 拖拽），自动识别受支持的 Bilibili 视频链接并插入节点。
 *    非视频链接则交还默认行为，**不影响正常粘贴**。
 *
 * 该函数遵循 wangEditor-next 的插件组合规范：保存原始方法并在其上包装。
 */
export function withBilibili<T extends IDomEditor>(editor: T): T {
  const { isInline, isVoid, insertData } = editor
  const newEditor = editor

  newEditor.isInline = (elem) => {
    if (DomEditor.getNodeType(elem) === BILIBILI_VIDEO_TYPE) {
      return false
    }
    return isInline(elem)
  }

  newEditor.isVoid = (elem) => {
    if (DomEditor.getNodeType(elem) === BILIBILI_VIDEO_TYPE) {
      return true
    }
    return isVoid(elem)
  }

  newEditor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain')
    const { matched, bvid } = parseBilibiliUrl(text)

    if (matched && bvid) {
      // 命中 Bilibili 视频链接：消费此次粘贴，插入视频节点。
      insertBilibiliVideoNode(newEditor, bvid)
      return
    }

    // 未命中：保持默认粘贴行为。
    insertData(data)
  }

  return newEditor
}
