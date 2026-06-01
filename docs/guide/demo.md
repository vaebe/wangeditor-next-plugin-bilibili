# 在线演示

下面是一个**真实可交互**的编辑器，已接入本插件。你可以：

- 点工具栏最右侧的「插入 B站视频」按钮，在弹出的下拉面板里粘贴视频链接并确认；
- 或直接把 B 站视频直链**粘贴**进编辑器，自动解析并插入；
- 展开下方面板，实时观察 `editor.getHtml()` 的序列化输出。

<BilibiliDemo />

::: tip 说明
本演示直接引用仓库源码（`src/`），因此始终反映最新实现。真实项目中请从包名导入：

```ts
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'
```

完整接入步骤见 [快速上手](/guide/getting-started) 与 [框架集成](/guide/frameworks)。
:::
