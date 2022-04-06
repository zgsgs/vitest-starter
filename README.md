# 分享

### 使用 Vite 快速构建一个初始项目；

```bash
pnpm create vite share-vitest -- --template vue-ts

pnpm i

pnpm add @types/node -D
```

### 将 Vitest 添加到项目中

```bash
pnpm add vitest -D

pnpm add @vue/test-utils -D
```

### 配置 Vitest

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

4. 在 `package.json` 文件中增加 `test` 脚本。

### 配置 [MSW](https://mswjs.io/)

官方推荐使用 Mock Service Worker 来模拟网络请求，同时支持模拟 REST 和 GraphQL 网络请求，并且跟所使用的框架没有任何联系。

#### 安装

```bash
pnpm add msw -D
```

#### 开始

创建 `test/mocks/server` 文件夹，新建 `handlers.ts` 和 `index.ts` 两个文件，其中 `handlers.ts` 文件用于存模拟 api 请求处理集合。

在 `handlers.ts` 文件新增一个请求文章列表的接口，并对外暴露，详情见该文件 [handlers.ts](./test/mocks/server/handlers.ts)。

在 `index.ts` 文件中引入 `setupServer` ，并将 `handlers` 传入，详情见该文件 [index.ts](./test/mocks/server/index.ts)。

最后在 [setupFiles/index.ts](./test/setupFiles/index.ts) 文件中监听该服务，结束用例后关闭该服务。

至此，在 `node` 端模拟 api 请求配置大致完毕，接下来使用 `Express` 配置一个小型的接口输出。

### 配置 [Express](http://expressjs.com/)

#### 安装

```bash
pnpm add express -D
```

#### 开始

创建 [index.js](./server/index.js) 文件，并增加获取文章列表的接口，启动服务，监听端口号为 4430。

使用 `node server/index.js` 启动服务后，执行 `pnpm dev` 查看列表是否加载正常。