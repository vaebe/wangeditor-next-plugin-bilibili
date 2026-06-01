/**
 * wangeditor-next-plugin-bilibili
 *
 * 适用于 wangEditor-next 的 Bilibili 视频插件：支持插入、粘贴自动解析、
 * 渲染（响应式 16:9 iframe）、HTML 导出与还原。
 *
 * 说明：`CustomTypes` 类型增强声明在 `./types/element`，随类型导出进入 `.d.ts`，
 * 使用方无需额外导入即可获得类型提示。
 */

// 主 API
export { registerBilibiliPlugin, bilibiliModule } from './module'
export { withBilibili } from './plugin/with-bilibili'

// 常量
export { BILIBILI_VIDEO_TYPE, INSERT_BILIBILI_MENU_KEY } from './constants'

// 工具函数（可 tree-shaking）
export { extractBvid } from './utils/bvid'
export { parseBilibiliUrl } from './utils/url'
export { buildPlayerSrc } from './utils/player'

// 类型
export type { ParsedBilibiliUrl } from './utils/url'
export type { BilibiliVideoElement } from './types/element'
