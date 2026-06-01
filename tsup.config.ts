import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'node18',
  // 由宿主提供，不打进产物。
  external: ['@wangeditor-next/editor'],
})
