import { defineConfig } from 'vitepress'

const pkgName = '@vaebe/wangeditor-next-plugin-bilibili'

export default defineConfig({
  lang: 'zh-CN',
  // GitHub Pages 项目站点部署在 https://vaebe.github.io/wangeditor-next-plugin-bilibili/
  base: '/wangeditor-next-plugin-bilibili/',
  title: 'wangEditor-next Bilibili 插件',
  description: '适用于 wangEditor-next 的 Bilibili 视频插件：插入、粘贴解析、渲染、序列化。',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      {
        text: 'v0.1.1',
        items: [
          { text: 'npm', link: `https://www.npmjs.com/package/${pkgName}` },
          { text: 'CHANGELOG', link: '/guide/changelog' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速上手', link: '/guide/getting-started' },
            { text: '框架集成', link: '/guide/frameworks' },
          ],
        },
        {
          text: '进阶',
          items: [
            { text: '粘贴自动解析', link: '/guide/paste' },
            { text: '数据结构与 HTML', link: '/guide/data-structure' },
            { text: 'SSR 注意事项', link: '/guide/ssr' },
          ],
        },
        {
          text: '其他',
          items: [
            { text: '更新日志', link: '/guide/changelog' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '总览', link: '/api/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'npm', link: `https://www.npmjs.com/package/${pkgName}` },
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 wangeditor-next-plugin-bilibili contributors',
    },

    search: {
      provider: 'local',
    },
  },
})
