/**
 * 扩展 wangEditor-next 的 `CustomTypes`，使编辑器在处理 `bilibili-video`
 * 元素时拥有完整的类型信息（`elem.bvid` / `elem.src`）。
 *
 * 该文件仅包含类型声明，运行时为空模块。`src/index.ts` 通过副作用导入它，
 * 使用本插件的工程即可自动获得类型增强。
 *
 * 注意：wangEditor-next 的 `CustomTypes.Element` 是一个可被合并的联合类型，
 * 这里通过声明合并把 {@link BilibiliVideoElement} 并入其中。
 */
import type { BilibiliVideoElement } from './element'

declare module '@wangeditor-next/editor' {
  interface CustomTypes {
    Element: BilibiliVideoElement
  }
}

export {}
