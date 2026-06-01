# SSR 注意事项

`renderElem` 与菜单面板会访问 `document` / DOM API，因此**插件注册与编辑器创建都应仅在客户端进行**。

## 通用守卫

在 Nuxt / Next.js 等 SSR 框架中，用 `typeof window` 守卫，或将编辑器组件标记为 client-only：

```ts
if (typeof window !== 'undefined') {
  registerBilibiliPlugin()
}
```

## Nuxt 3

将编辑器组件包在 `<ClientOnly>` 中，并把 `registerBilibiliPlugin()` 放在客户端执行的位置（如 `onMounted` 或 `.client.ts` 插件）：

```vue
<template>
  <ClientOnly>
    <MyEditor />
  </ClientOnly>
</template>
```

```ts
// plugins/bilibili.client.ts
import { registerBilibiliPlugin } from '@vaebe/wangeditor-next-plugin-bilibili'

export default defineNuxtPlugin(() => {
  registerBilibiliPlugin()
})
```

## Next.js

用 `next/dynamic` 关闭该组件的 SSR：

```tsx
import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import('../components/MyEditor'), { ssr: false })
```

`registerBilibiliPlugin()` 放在该组件模块内（仅客户端加载时执行）即可。

::: tip
`registerBilibiliPlugin()` 是幂等的，多次调用安全，所以放在组件模块顶层或 effect 中都可以——只要保证它在**客户端**、在创建编辑器**之前**运行。
:::
