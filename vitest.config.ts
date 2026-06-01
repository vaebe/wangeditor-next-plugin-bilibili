import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // parse-html 测试依赖 DOM API（document / Element）。
    environment: 'jsdom',
    include: ['test/**/*.test.ts'],
  },
})
