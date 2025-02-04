/// <reference types="vitest" />
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { peerDependencies, dependencies } from './package.json';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [
        vue(),
    ],
    test: {
        coverage: {
            provider: 'c8'
        },
        root: resolve(__dirname, '.'),
        setupFiles: [
            'setup.ts'
        ],
        include: [
            '**/*.spec.ts'
        ]
    },
    build: {
        rollupOptions: {
            plugins: [
                typescript({
                    tsconfig: './tsconfig.lib.json'
                }),
            ],
            external: [
                ...Object.keys(peerDependencies || {}),
                ...Object.keys(dependencies || {}),
            ],
            output: {
                sourcemap: true,
            }
        },
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs']
        }
    }
})
