# 粘贴自动解析

插件劫持了编辑器的 `insertData`。当粘贴内容为以下**视频直链**之一时，自动解析 BV 号并插入视频节点：

- `https://www.bilibili.com/video/BVxxxx`
- `https://m.bilibili.com/video/BVxxxx`

host 部分大小写不敏感，链接后可携带任意 query/hash（如 `?p=2`），不影响识别。

非 Bilibili 视频链接的粘贴内容不受影响，保持编辑器默认粘贴行为。

## 工作原理

`withBilibili` 插件重写了 `insertData(data)`：

1. 读取 `data.getData('text/plain')`；
2. 用 [`parseBilibiliUrl`](/api/#parsebilibiliurl) 解析；
3. 命中 → 调用内部插入逻辑插入视频节点，并**消费此次粘贴**（不再走默认行为）；
4. 未命中 → 调用原始 `insertData(data)`，默认粘贴行为完全保留。

整个过程**纯同步**，无网络请求、无 CORS 问题。

## 不解析 b23.tv 短码

::: warning 注意
本插件**不解析 `b23.tv` 短码**。短码需要跟随 HTTP 跳转才能拿到真实 BV 号，浏览器端跨域无法可靠完成，强行解析会引入异步与不确定性。

如需支持短码，请在业务侧先将其还原为视频直链，再粘贴/插入。
:::

## 手动提取 BV 号

如果你在业务里需要从任意文本提取 BV 号，可直接使用导出的工具函数：

```ts
import { extractBvid, parseBilibiliUrl, buildPlayerSrc } from '@vaebe/wangeditor-next-plugin-bilibili'

extractBvid('看看这个 BV1GJ411x7h7 不错')
// => 'BV1GJ411x7h7'

parseBilibiliUrl('https://www.bilibili.com/video/BV1GJ411x7h7?p=2')
// => { matched: true, bvid: 'BV1GJ411x7h7' }

parseBilibiliUrl('https://example.com/video/123')
// => { matched: false }

buildPlayerSrc('BV1GJ411x7h7')
// => 'https://player.bilibili.com/player.html?bvid=BV1GJ411x7h7&page=1&high_quality=1&danmaku=0'
```
