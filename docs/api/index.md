# API 参考

所有导出均来自包入口 `@vaebe/wangeditor-next-plugin-bilibili`。

## 总览

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| [`registerBilibiliPlugin`](#registerbilibiliplugin) | 函数 | 注册插件（创建编辑器前调用，幂等） |
| [`withBilibili`](#withbilibili) | 函数 | 编辑器插件，供手动组合 |
| [`bilibiliModule`](#bilibilimodule) | 对象 | 原始模块定义（`Partial<IModuleConf>`） |
| [`BILIBILI_VIDEO_TYPE`](#常量) | 常量 | 元素类型 `'bilibili-video'` |
| [`INSERT_BILIBILI_MENU_KEY`](#常量) | 常量 | 菜单 key `'insertBilibiliVideo'` |
| [`extractBvid`](#extractbvid) | 函数 | 从文本提取 BV 号 |
| [`parseBilibiliUrl`](#parsebilibiliurl) | 函数 | 解析视频直链取 BV 号 |
| [`buildPlayerSrc`](#buildplayersrc) | 函数 | 由 BV 号构造播放器 src |
| [`BilibiliVideoElement`](#类型) | 类型 | 视频元素接口 |
| [`ParsedBilibiliUrl`](#类型) | 类型 | URL 解析结果 |

## registerBilibiliPlugin

```ts
function registerBilibiliPlugin(): void
```

注册插件到 wangEditor（内部调用一次 `Boot.registerModule`）。**必须在创建任何编辑器实例之前调用**，全局只需一次。内部有模块级标志位保证幂等，重复调用安全。

```ts
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'

registerBilibiliPlugin()
```

## withBilibili

```ts
function withBilibili<T extends IDomEditor>(editor: T): T
```

编辑器插件：重写 `isInline` / `isVoid`（对 `bilibili-video` 返回 `true`）并劫持 `insertData` 实现粘贴自动解析。

通常你不需要直接用它——`registerBilibiliPlugin()` 已把它作为模块的 `editorPlugin` 注册。仅当你要**手动组合编辑器插件**时才需要：

```ts
import { withBilibili } from '@vaebe/wangeditor-next-plugin-bilibili'

// 在自定义的 editorConfig 中组合
const customEditorPlugin = (editor) => withBilibili(otherPlugin(editor))
```

## bilibiliModule

```ts
const bilibiliModule: Partial<IModuleConf>
```

原始模块定义，包含 `editorPlugin`、`renderElems`、`elemsToHtml`、`parseElemsHtml`、`menus`。供需要**手动注册**（自行调用 `Boot.registerModule`）的高级场景使用。

```ts
import { Boot } from '@wangeditor-next/editor'
import { bilibiliModule } from '@vaebe/wangeditor-next-plugin-bilibili'

Boot.registerModule(bilibiliModule)
```

## extractBvid

```ts
function extractBvid(text: string): string | null
```

从任意文本中提取第一个 BV 号（匹配 `BV[0-9A-Za-z]{10}`），未找到返回 `null`。

```ts
extractBvid('看看 BV1GJ411x7h7') // => 'BV1GJ411x7h7'
extractBvid('没有 bv 号')        // => null
```

## parseBilibiliUrl

```ts
interface ParsedBilibiliUrl {
  matched: boolean
  bvid?: string
}

function parseBilibiliUrl(input: string): ParsedBilibiliUrl
```

解析 Bilibili 视频直链（`www` / `m` 站，host 大小写不敏感），命中返回 `{ matched: true, bvid }`，否则 `{ matched: false }`。**不处理 `b23.tv` 短码**。

```ts
parseBilibiliUrl('https://www.bilibili.com/video/BV1GJ411x7h7')
// => { matched: true, bvid: 'BV1GJ411x7h7' }

parseBilibiliUrl('https://example.com')
// => { matched: false }
```

## buildPlayerSrc

```ts
function buildPlayerSrc(bvid: string): string
```

由 BV 号构造播放器 iframe 的 `src`。

```ts
buildPlayerSrc('BV1GJ411x7h7')
// => 'https://player.bilibili.com/player.html?bvid=BV1GJ411x7h7&page=1&high_quality=1&danmaku=0'
```

## 常量

```ts
const BILIBILI_VIDEO_TYPE = 'bilibili-video'
const INSERT_BILIBILI_MENU_KEY = 'insertBilibiliVideo'
```

- `BILIBILI_VIDEO_TYPE`：自定义元素的 `type` 字段值。
- `INSERT_BILIBILI_MENU_KEY`：工具栏菜单 key，用于 `toolbarConfig.insertKeys`。

## 类型

```ts
interface BilibiliVideoElement {
  type: 'bilibili-video'
  bvid: string
  src: string
  children: [{ text: '' }]
}

interface ParsedBilibiliUrl {
  matched: boolean
  bvid?: string
}
```

`BilibiliVideoElement` 已通过 `declare module` 合并进 wangEditor 的 `CustomTypes`，详见 [数据结构](/guide/data-structure)。
