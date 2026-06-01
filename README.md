# wangeditor-next-plugin-bilibili

适用于 [wangEditor-next](https://wangeditor-next.github.io/) 的 **Bilibili 视频插件**：支持插入、粘贴自动解析、渲染（响应式 16:9 iframe）、HTML 导出与还原。

- ✅ TypeScript，输出 `.d.ts`，无 `any`
- ✅ ESM + CJS 双格式，支持 tree-shaking
- ✅ 适配 Vue3 / React / 原生 JS
- ✅ 遵循官方 [custom extension 规范](https://wangeditor-next.github.io/docs/guide/development)
- ✅ Node >= 18

## 安装

```bash
pnpm add wangeditor-next-plugin-bilibili
# 同时确保已安装 peerDependency
pnpm add @wangeditor-next/editor
```

> `@wangeditor-next/editor` 为 `peerDependency`，由宿主项目提供。

## 如何注册

`registerBilibiliPlugin()` **必须在创建编辑器实例之前调用**，全局只需一次（内部已做幂等保护）。

```ts
import { registerBilibiliPlugin } from 'wangeditor-next-plugin-bilibili'

registerBilibiliPlugin()
```

## 如何配置 toolbar

插件注册了菜单 key：`insertBilibiliVideo`。通过 `toolbarConfig.insertKeys` 把它插入工具栏：

```ts
import type { IToolbarConfig } from '@wangeditor-next/editor'

const toolbarConfig: Partial<IToolbarConfig> = {
  insertKeys: {
    index: 20, // 插入位置（按需调整）
    keys: ['insertBilibiliVideo'],
  },
}
```

点击该菜单会弹出输入框，粘贴 Bilibili 视频链接后即可插入。

## Vue3 示例

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import '@wangeditor-next/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import { registerBilibiliPlugin } from 'wangeditor-next-plugin-bilibili'

// 仅在客户端、创建编辑器前注册
registerBilibiliPlugin()

const editorRef = shallowRef<IDomEditor>()
const valueHtml = ref('<p>试试粘贴一个 B 站视频链接～</p>')

const toolbarConfig: Partial<IToolbarConfig> = {
  insertKeys: { index: 20, keys: ['insertBilibiliVideo'] },
}
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' }

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar :editor="editorRef" :default-config="toolbarConfig" style="border-bottom: 1px solid #ccc" />
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      style="height: 400px; overflow-y: hidden"
      @on-created="handleCreated"
    />
  </div>
</template>
```

## React 示例

```tsx
import '@wangeditor-next/editor/dist/css/style.css'
import { useEffect, useState } from 'react'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import { registerBilibiliPlugin } from 'wangeditor-next-plugin-bilibili'

registerBilibiliPlugin()

export function MyEditor() {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('<p>试试粘贴一个 B 站视频链接～</p>')

  const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: { index: 20, keys: ['insertBilibiliVideo'] },
  }
  const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' }

  useEffect(() => () => {
    editor?.destroy()
    setEditor(null)
  }, [editor])

  return (
    <div style={{ border: '1px solid #ccc' }}>
      <Toolbar editor={editor} defaultConfig={toolbarConfig} style={{ borderBottom: '1px solid #ccc' }} />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(e) => setHtml(e.getHtml())}
        style={{ height: 400, overflowY: 'hidden' }}
      />
    </div>
  )
}
```

## 原生 JS 示例

```ts
import '@wangeditor-next/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor-next/editor'
import { registerBilibiliPlugin } from 'wangeditor-next-plugin-bilibili'

registerBilibiliPlugin()

const editor = createEditor({
  selector: '#editor-container',
  html: '<p>试试粘贴一个 B 站视频链接～</p>',
  config: { placeholder: '请输入内容...' },
})

createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: { index: 20, keys: ['insertBilibiliVideo'] },
  },
})
```

## 粘贴自动解析说明

插件劫持了编辑器的 `insertData`。当粘贴内容为以下**视频直链**之一时，自动解析 BV 号并插入视频节点：

- `https://www.bilibili.com/video/BVxxxx`
- `https://m.bilibili.com/video/BVxxxx`

非 Bilibili 视频链接的粘贴内容不受影响，保持默认行为。

> 注意：本插件**不解析 `b23.tv` 短码**（浏览器跨域无法可靠跟随其跳转）。如需支持短码，请在业务侧先将其还原为视频直链。

## 数据结构说明

自定义元素类型 `bilibili-video`，`inline = false`、`void = true`：

```ts
interface BilibiliVideoElement {
  type: 'bilibili-video'
  bvid: string // 视频 BV 号
  src: string // 播放器 iframe src（由 bvid 生成）
  children: [{ text: '' }]
}
```

导出 HTML（`editor.getHtml()`）：

```html
<div data-w-e-type="bilibili-video" data-w-e-is-void data-bvid="BVxxxx"></div>
```

`editor.setHtml(html)` 可从上述 HTML 还原出 `bilibili-video` 节点（`src` 会按 `bvid` 重建）。

## 对外 API

| 导出 | 说明 |
| --- | --- |
| `registerBilibiliPlugin()` | 注册插件（创建编辑器前调用，幂等） |
| `withBilibili(editor)` | 编辑器插件，供手动组合 |
| `bilibiliModule` | 原始模块定义（`Partial<IModuleConf>`） |
| `BILIBILI_VIDEO_TYPE` | 元素类型常量 `'bilibili-video'` |
| `INSERT_BILIBILI_MENU_KEY` | 菜单 key 常量 `'insertBilibiliVideo'` |
| `extractBvid(text)` | 从文本提取 BV 号 |
| `parseBilibiliUrl(input)` | 解析视频直链并取 BV 号 |
| `buildPlayerSrc(bvid)` | 由 BV 号构造播放器 src |

类型导出：`BilibiliVideoElement`、`ParsedBilibiliUrl`。

## SSR 注意事项

- `renderElem` 与菜单弹窗会访问 `document` / DOM API；**注册与创建编辑器应仅在客户端进行**。
- 在 Nuxt / Next.js 等 SSR 框架中，请用 `typeof window !== 'undefined'` 守卫，或将编辑器组件标记为 client-only（如 Nuxt 的 `<ClientOnly>`、Next.js 的 `dynamic(() => ..., { ssr: false })`）。
- `registerBilibiliPlugin()` 同样放在客户端入口执行。

## 本地调试

```bash
pnpm install
pnpm dev          # tsup --watch
pnpm test:watch   # vitest 监听
pnpm build        # 产出 dist
pnpm link --global # 在宿主项目中 pnpm link 调试
```

## 发布

```bash
pnpm build && pnpm test
pnpm changeset           # 新增变更记录
pnpm changeset version   # 更新版本号 & CHANGELOG
pnpm changeset publish   # 发布到 npm
```

## License

[MIT](./LICENSE)
