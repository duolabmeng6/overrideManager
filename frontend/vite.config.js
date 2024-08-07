import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        }
    },
    publicDir: "public",
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
                TDesignResolver({
                    library: 'vue-next'
                })
            ],
        }),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
                TDesignResolver({
                    library: 'vue-next'
                })
            ],
        }),

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        // jsxInject: `import React from 'react'`,
    },
    optimizeDeps: {
        include: [
            './src/win/design.json',
            './src/win/__load_data.js',
            './src/win/__aux_code.js',
            './src/win/event.js',
        ]
    }
})
