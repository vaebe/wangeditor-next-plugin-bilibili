import DefaultTheme from 'vitepress/theme'
import { defineClientComponent } from 'vitepress'
import type { Theme } from 'vitepress'

// 编辑器依赖 DOM，必须仅在客户端加载，避免 VitePress SSR 构建报错。
const BilibiliDemo = defineClientComponent(() => import('../components/BilibiliDemo.vue'))

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BilibiliDemo', BilibiliDemo)
  },
} satisfies Theme
