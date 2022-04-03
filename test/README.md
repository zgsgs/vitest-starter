# 分享

- 使用 Vite 快速构建一个初始项目；

```bash
pnpm create vite share-vitest -- --template vue-ts

pnpm i

pnpm add @types/node -D
```

- 将 Vitest 添加到项目中

```bash
pnpm add vitest -D
```

- 配置 Vitest

1. 增加 `vitest.config.ts` 文件；
2. 新建 `test` 文件，在其中创建 `setupFiles/index.ts` 文件为后续做准备；
3. 修改 `vitest.config.ts` 文件

```ts
import { defineConfig } from "vitest/config";
import path from "path";

const resolveFile = (file: string) => path.resolve(__dirname, file);

export default defineConfig({
  test: {
    // 运行在每个测试文件前面
    setupFiles: [resolveFile("./test/setupFiles/index.ts")],
  },
});

```
