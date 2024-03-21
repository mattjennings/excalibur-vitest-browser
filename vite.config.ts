import { defineConfig } from 'vite'
import { default as AutoImport } from 'unplugin-auto-import/vite'
import resources from 'vite-plugin-excalibur-resources'
import type { RemoteOptions } from 'webdriverio'
import type { Browser, LaunchOptions } from 'playwright'

interface BrowserProviderOptions {
  launch?: LaunchOptions
  page?: Parameters<Browser['newPage']>[0]
}

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    // automatically expose global 'ex' variable that will compile into
    // import { XYZ } from 'excalibur' for tree shaking
    AutoImport({
      imports: [
        {
          excalibur: [['*', 'ex']],
        },
      ],
      dts: './src/ex.d.ts',
    }),
    resources(),
  ],
  test: {
    globals: true,
    reporters: process.env.GITHUB_ACTIONS
      ? ['dot', 'github-actions']
      : ['default'],
    browser: {
      enabled: true,
      isolate: false,
      fileParallelism: false,
      headless: true,
      name: 'chromium',
      provider: 'playwright',
      providerOptions: {
        launch: {
          // enables webgl?
          args: ['--use-gl=egl', '--ignore-gpu-blocklist', '--use-gl=angle'],
          channel: 'chrome',
        },
      } as BrowserProviderOptions,

      // uncomment to use webdriver
      // name: 'chrome',
      // provider: 'webdriverio',
      // providerOptions: {
      // } as RemoteOptions,
    },
  },
})
