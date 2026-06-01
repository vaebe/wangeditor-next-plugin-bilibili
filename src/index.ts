/**
 * wangeditor-next-plugin-bilibili
 *
 * 适用于 wangEditor-next 的 Bilibili 视频插件：支持插入、粘贴自动解析、
 * 渲染（响应式 16:9 iframe）、HTML 导出与还原。
 */

// 副作用导入：为使用方注入 CustomTypes 类型增强。
import './types/custom-types'

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
