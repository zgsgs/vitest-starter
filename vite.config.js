import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getRootPath, getSrcPath, getTestPath } from './build';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  return {
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    plugins: [vue()],
    test: {
      environment: "happy-dom",
      // 运行在每个测试文件前面
      setupFiles: [getTestPath("/setupFiles/index.ts")],
    },
  }
})
