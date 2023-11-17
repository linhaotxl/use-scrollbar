import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { transformLazyShow } from 'v-lazy-show'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteMockServe } from 'vite-plugin-mock'
import Pages from 'vite-plugin-pages'
import svgLoader from 'vite-svg-loader'

// import { ProComponentsResolver } from './lib/resolveComponents'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
      template: {
        compilerOptions: {
          nodeTransforms: [transformLazyShow],
        },
      },
    }),

    vueJsx(),

    svgLoader({ defaultImport: 'component' }),

    Pages({
      dirs: 'src/pages',
    }),

    dts({
      // compilerOptions: {
      //   preserveSymlinks: true,
      // },
      tsconfigPath: './tsconfig.build.json',
    }),

    viteMockServe({
      mockPath: './src/mock',
    }),

    Components({
      dts: false,
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          prefix: 'i',
          enabledCollections: ['crud'],
        }),

        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),

    AutoImport({
      include: [/\.vue$/, /\.[tj]sx?$/],

      presetOverriding: true,

      resolvers: [AntDesignVueResolver({ importStyle: false })],

      imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],

      dirs: [
        './src/components/**',
        './src/directives/**',
        './src/layouts/**',
        './src/pages/**',
        './core/**',
      ],

      dts: './src/typings/auto-imports.d.ts',

      vueTemplate: true,

      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
      },
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true,
      webComponents: {
        iconPrefix: 'i',
      },
      // 自定义 icon 集合
      customCollections: {
        crud: FileSystemIconLoader('core/assets/icons', svg =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
  ],

  resolve: {
    alias: {
      '~/': `${resolve('./core')}/`,
    },
    extensions: ['.ts', '.tsx', '.vue', '.js', '.jsx', '.json'],
  },

  server: {
    port: 5172,
  },

  build: {
    lib: {
      entry: resolve('core/index.ts'),
      name: 'UseScrollbar',
      formats: ['es'],
      fileName: format => `use-scrollbar.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
    },
  },
})
