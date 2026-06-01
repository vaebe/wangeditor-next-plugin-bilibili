# 快速上手

适用于 [wangEditor-next](https://wangeditor-next.github.io/) 的 **Bilibili 视频插件**：支持插入、粘贴自动解析、渲染（响应式 16:9 iframe）、HTML 导出与还原。

## 特性

- ✅ TypeScript 编写，输出 `.d.ts`，无 `any`
- ✅ ESM + CJS 双格式，支持 tree-shaking
- ✅ 适配 Vue3 / React / 原生 JS
- ✅ 遵循官方 [自定义扩展规范](https://wangeditor-next.github.io/docs/guide/development)
- ✅ Node >= 18

## 安装

::: code-group

```bash [pnpm]
pnpm add @vaebe/wangeditor-next-plugin-bilibili
# 确保已安装 peerDependency
pnpm add @wangeditor-next/editor
```

```bash [npm]
npm install @vaebe/wangeditor-next-plugin-bilibili
npm install @wangeditor-next/editor
```

```bash [yarn]
yarn add @vaebe/wangeditor-next-plugin-bilibili
yarn add @wangeditor-next/editor
```

:::

> `@wangeditor-next/editor`（`>=5.0.0`）为 `peerDependency`，由宿主项目提供。

## 注册插件

`registerBilibiliPlugin()` **必须在创建编辑器实例之前调用**，全局只需一次（内部已做幂等保护，重复调用安全）。

```ts
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'

registerBilibiliPlugin()
```

## 配置工具栏

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

点击工具栏上的「插入 B站视频」按钮，会在按钮正下方弹出一个**下拉面板**，粘贴 Bilibili 视频链接并确认后即可插入视频。

## 下一步

- [框架集成](/guide/frameworks) —— Vue3 / React / 原生 JS 完整示例
- [粘贴自动解析](/guide/paste) —— 支持哪些链接格式
- [数据结构与 HTML](/guide/data-structure) —— 序列化与还原
- [API 参考](/api/) —— 所有对外导出
