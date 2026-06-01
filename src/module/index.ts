import { Boot } from '@wangeditor-next/editor'
import type { IModuleConf } from '@wangeditor-next/editor'
import { BILIBILI_VIDEO_TYPE, INSERT_BILIBILI_MENU_KEY, PARSE_SELECTOR } from '../constants'
import { withBilibili } from '../plugin/with-bilibili'
import { renderBilibiliVideo } from '../render/render-elem'
import { bilibiliVideoToHtml } from '../render/elem-to-html'
import { parseBilibiliVideoHtml } from '../parse/parse-elem-html'
import { InsertBilibiliMenu } from '../menu/insert-bilibili-menu'

/**
 * Bilibili 模块定义，聚合了渲染、序列化、解析、编辑器插件与菜单。
 *
 * 可直接传给 `Boot.registerModule(bilibiliModule)`，或交由
 * {@link registerBilibiliPlugin} 处理（推荐，带幂等保护）。
 */
export const bilibiliModule: Partial<IModuleConf> = {
  editorPlugin: withBilibili,
  renderElems: [
    {
      type: BILIBILI_VIDEO_TYPE,
      renderElem: renderBilibiliVideo,
    },
  ],
  elemsToHtml: [
    {
      type: BILIBILI_VIDEO_TYPE,
      elemToHtml: bilibiliVideoToHtml,
    },
  ],
  parseElemsHtml: [
    {
      selector: PARSE_SELECTOR,
      parseElemHtml: parseBilibiliVideoHtml,
    },
  ],
  menus: [
    {
      key: INSERT_BILIBILI_MENU_KEY,
      factory: () => new InsertBilibiliMenu(),
    },
  ],
}

/** 防止重复注册（`Boot.registerModule` 全局只能注册一次）。 */
let registered = false

/**
 * 注册 Bilibili 插件。**必须在创建编辑器实例之前调用**，且全局只需调用一次。
 *
 * 内部带幂等保护，多次调用安全。
 */
export function registerBilibiliPlugin(): void {
  if (registered) {
    return
  }
  Boot.registerModule(bilibiliModule)
  registered = true
}
