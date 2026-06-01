---
layout: home

hero:
  name: Bilibili 插件
  text: wangEditor-next 视频扩展
  tagline: 插入、粘贴自动解析、响应式渲染、HTML 导出与还原，一个插件全搞定。
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/getting-started
    - theme: alt
      text: API 参考
      link: /api/
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/@vaebe/wangeditor-next-plugin-bilibili

features:
  - icon: 🎬
    title: 插入 & 粘贴解析
    details: 工具栏一键插入，或直接粘贴 B 站视频直链自动识别 BV 号并插入视频节点，纯同步、无跨域请求。
  - icon: 📱
    title: 响应式渲染
    details: 16:9 自适应 iframe，allowfullscreen、懒加载，桌面与移动端皆适配。
  - icon: 🔁
    title: 导出与还原
    details: editor.getHtml() 输出可序列化的 div，editor.setHtml() 按 BV 号无损还原视频。
  - icon: 🧩
    title: 全框架适配
    details: Vue3 / React / 原生 JS 通用，遵循 wangEditor-next 官方自定义扩展规范。
  - icon: 🌳
    title: 类型完整 & Tree-shaking
    details: TypeScript 编写，输出 .d.ts，零 any；ESM + CJS 双格式，sideEffects:false。
  - icon: 🛡️
    title: 健壮稳定
    details: 选区为空时兜底插入，IME 输入法友好，复用编辑器主题变量适配暗色模式。
---
