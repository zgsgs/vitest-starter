import { defineConfig } from "vitest/config";
import path from "path";
import vue from "@vitejs/plugin-vue";

const resolveFile = (file: string) => path.resolve(__dirname, file);

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    // 运行在每个测试文件前面
    setupFiles: [resolveFile("./test/setupFiles/index.ts")],
  },
});
