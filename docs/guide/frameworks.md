# 框架集成

下列示例展示如何在 Vue3、React、原生 JS 三种环境中接入本插件。核心步骤一致：

1. 引入 wangEditor 样式；
2. **创建编辑器前**调用 `registerBilibiliPlugin()`；
3. 在 `toolbarConfig.insertKeys` 中加入菜单 key `insertBilibiliVideo`。

## Vue3

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import '@wangeditor-next/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'

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

## React

```tsx
import '@wangeditor-next/editor/dist/css/style.css'
import { useEffect, useState } from 'react'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'

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

## 原生 JS

```ts
import '@wangeditor-next/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor-next/editor'
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'

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

::: tip 提示
若你不想用工具栏菜单，只想要「粘贴自动解析」能力，可在创建编辑器时通过 `withBilibili` 手动组合插件。详见 [API 参考](/api/#withbilibili)。
:::
