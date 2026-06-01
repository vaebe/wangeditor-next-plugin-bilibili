# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## 0.1.1

- **修复**：下拉面板内的视频链接输入框无法输入。wangEditor 工具栏根节点绑定了 `mousedown -> preventDefault`（点按钮时防止编辑器失焦），面板作为工具栏子节点，点输入框时 `mousedown` 冒泡到工具栏被 `preventDefault`，导致输入框拿不到焦点。现已在面板容器上阻止该事件冒泡。

## 0.1.0

- 首个发布版本。
- 自定义元素 `bilibili-video`（`inline=false`、`void=true`）。
- 工具栏「插入 B站视频」下拉面板菜单（`insertBilibiliVideo`）。
- 粘贴 `www` / `m` 站视频直链自动解析并插入。
- 响应式 16:9 iframe 渲染，`allowfullscreen`、懒加载。
- `getHtml()` 导出 / `setHtml()` 还原。
- 导出工具函数 `extractBvid`、`parseBilibiliUrl`、`buildPlayerSrc`。
- ESM + CJS 双格式，完整 `.d.ts`，零 `any`。
