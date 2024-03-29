import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'src/index.js'),
//       name: 'commonsTable',
//       fileName: (format) => `commons-table.${format}.js`,
//     },
//     rollupOptions: {
//       // 确保外部化处理那些你不想打包进库的依赖
//       external: ['vue'],
//       output: {
//         // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
//         globals: {
//           vue: 'Vue',
//         },
//       },
//     },
//   },
// })
export default (mode, command) => {
  console.log('🚀 ~ command:', command)
  console.log('🚀 ~ mode:', mode)
  return defineConfig({
    plugins: [
      vue(),
      dts(),
      viteCompression({
        verbose: true,
        disable: false, // 不禁用压缩
        deleteOriginFile: false, // 压缩后是否删除原文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 文件类型
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: 'esbuild',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'l-vue3-audio',
        fileName: (format) => `l-vue3-audio.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
}
