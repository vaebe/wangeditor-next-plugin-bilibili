/**
 * 插件用到的全局常量。
 *
 * 单独成文件，作为「自定义元素类型字符串」「菜单 key」「解析 selector」的唯一来源，
 * 避免在多处出现魔法字符串。
 */

/** 自定义元素类型。对应数据结构中的 `type` 字段。 */
export const BILIBILI_VIDEO_TYPE = 'bilibili-video'

/** 工具栏 / 菜单注册时使用的唯一 key。 */
export const INSERT_BILIBILI_MENU_KEY = 'insertBilibiliVideo'

/** `parseElemHtml` 用到的 CSS selector，匹配导出的 HTML 容器。 */
export const PARSE_SELECTOR = `div[data-w-e-type="${BILIBILI_VIDEO_TYPE}"]`
