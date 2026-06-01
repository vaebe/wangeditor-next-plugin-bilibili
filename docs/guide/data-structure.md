# 数据结构与 HTML

## 元素类型

自定义元素类型为 `bilibili-video`，`inline = false`、`void = true`：

```ts
interface BilibiliVideoElement {
  type: 'bilibili-video'
  bvid: string // 视频 BV 号
  src: string // 播放器 iframe src（由 bvid 生成）
  children: [{ text: '' }]
}
```

插件通过 `declare module` 扩展了 wangEditor 的 `CustomTypes`，因此 `elem.bvid` / `elem.src` 在 TypeScript 下有完整类型，无需 `any`。该声明随类型导出自动进入 `.d.ts`，使用方**无需额外导入**即可获得类型提示。

## 导出 HTML

`editor.getHtml()` 会把视频节点序列化为一个带 `data-*` 标记的 `div`：

```html
<div data-w-e-type="bilibili-video" data-w-e-is-void data-bvid="BVxxxx"></div>
```

::: tip 为什么只存 `bvid` 而不存完整 `src`？
`src` 完全由 `bvid` 推导（`buildPlayerSrc`）。只持久化 `bvid` 可以让序列化结果更精简、更稳定，避免播放器 URL 参数变化导致历史数据不一致——还原时按当前规则重建 `src` 即可。
:::

## 还原 HTML

`editor.setHtml(html)` 可从上述 HTML 还原出 `bilibili-video` 节点。解析器读取 `data-bvid`，再用 `buildPlayerSrc` 重建 `src`，得到完整元素。

```ts
// 导出
const html = editor.getHtml()
// => '...<div data-w-e-type="bilibili-video" data-w-e-is-void data-bvid="BV1GJ411x7h7"></div>...'

// 还原（src 会按 bvid 重建，iframe 重新渲染）
editor.setHtml(html)
```

## 渲染产物

编辑器内渲染为响应式 16:9 容器 + 铺满的 `iframe`：

```html
<div style="position: relative; width: 100%; margin: 8px 0; padding-bottom: 56.25%; height: 0; overflow: hidden">
  <iframe
    src="https://player.bilibili.com/player.html?bvid=BV...&page=1&high_quality=1&danmaku=0"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
    allowfullscreen
    loading="lazy"
    frameborder="0"
    scrolling="no"
  ></iframe>
</div>
```

- `padding-bottom: 56.25%` 实现 16:9 自适应高度；
- `loading="lazy"` 延迟加载，减少首屏开销；
- `allowfullscreen` 支持全屏播放。
