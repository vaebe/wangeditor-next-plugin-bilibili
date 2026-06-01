<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import '@wangeditor-next/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
// 文档示例直接从源码导入，始终反映最新实现。
// 真实项目中请从包名导入：
//   import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'
import { registerBilibiliPlugin } from '../../../src/index'

// 创建编辑器前注册插件（幂等，重复调用安全）。
registerBilibiliPlugin()

const sampleUrl = 'https://www.bilibili.com/video/BV1GJ411x7h7'

const editorRef = shallowRef<IDomEditor>()
const valueHtml = ref(
  '<p>① 点上方「插入 B站视频」按钮，或 ② 直接把 B 站视频链接粘贴进编辑器 👇</p>',
)
const html = ref('')
const copied = ref(false)

const toolbarConfig: Partial<IToolbarConfig> = {
  // 演示用精简工具栏，最后一项即本插件的菜单。
  toolbarKeys: ['headerSelect', 'bold', 'italic', 'through', '|', 'insertBilibiliVideo'],
}
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' }

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
  html.value = editor.getHtml()
}

function handleChange(editor: IDomEditor) {
  html.value = editor.getHtml()
}

async function copySample() {
  try {
    await navigator.clipboard.writeText(sampleUrl)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // 剪贴板不可用时静默失败，用户可手动复制下方链接。
  }
}

onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div class="bili-demo">
    <div class="bili-demo__tip">
      <span>试试这条示例链接：</span>
      <code>{{ sampleUrl }}</code>
      <button class="bili-demo__btn" type="button" @click="copySample">
        {{ copied ? '已复制 ✓' : '复制' }}
      </button>
    </div>

    <div class="bili-demo__editor">
      <Toolbar
        :editor="editorRef"
        :default-config="toolbarConfig"
        class="bili-demo__toolbar"
      />
      <Editor
        v-model="valueHtml"
        :default-config="editorConfig"
        class="bili-demo__content"
        @on-created="handleCreated"
        @on-change="handleChange"
      />
    </div>

    <details class="bili-demo__html">
      <summary>实时查看 <code>editor.getHtml()</code> 输出</summary>
      <pre><code>{{ html }}</code></pre>
    </details>
  </div>
</template>

<style scoped>
.bili-demo {
  margin: 16px 0;
}

.bili-demo__tip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.bili-demo__tip code {
  font-size: 13px;
}

.bili-demo__btn {
  padding: 2px 12px;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.bili-demo__btn:hover {
  color: var(--vp-c-bg);
  background: var(--vp-c-brand-1);
}

.bili-demo__editor {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.bili-demo__toolbar {
  border-bottom: 1px solid var(--vp-c-divider);
}

.bili-demo__content {
  height: 360px;
  overflow-y: hidden;
}

.bili-demo__html {
  margin-top: 12px;
}

.bili-demo__html summary {
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.bili-demo__html pre {
  margin-top: 8px;
  max-height: 220px;
  overflow: auto;
  padding: 12px;
  font-size: 12px;
  line-height: 1.6;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 确保 wangEditor 下拉面板浮层不被裁切 */
.bili-demo :deep(.w-e-bar) {
  z-index: 2;
}
</style>
