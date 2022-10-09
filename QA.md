# 问答

## 如何设置全局 setup？

1. 新建 `test/vitest.config.ts` 文件，在 `test` 中设置 `setupFiles` 配置；

   ```tsx
   import { defineConfig } from 'vitest/config'

   export default defineConfig({
     test: {
       // ...
       setupFiles: ['xxxx/setup.ts'],
     },
   })
   ```

2. 若在导入 `vitest/config` 时 ts 报错，可以将版本升级至 `0.5.1+` 版本，相应的官方修复记录如下：

   [https://github.com/vitest-dev/vitest/pull/830](https://github.com/vitest-dev/vitest/pull/830)

## 如何 mock 模块内的方法？

```tsx
import { vi } from 'vitest'

// x.spec.ts 文件
import Cookies from 'js-cookie'
import { get } from '@/my-module'

vi.mock('@/my-module', () => {
  return {
    get: (x: string) => x,
  }
})

// mock node_module 模块
vi.mock('js-cookie', () => {
  return {
    // 使用 default，默认导出
    default: {
      get: (x: string) => x,
    },
  }
})

Cookies.get() // 以替换为 mock 的数据
```

## 如何解决 lodash-es 报错？

相关代码：

```tsx
// ...
import merge from 'lodash-es/merge'
// ...
```

相关的报错信息：

```shell
SyntaxError: Unexpected token 'export'
Module D:\xxx\node_modules\.pnpm\lodash-es@4.17.11\node_modules\lodash-es\_freeGlobal.js:4 seems to be an ES Module but shipped in a CommonJS package. You might want to create an issue to the package "D:\xxx\node_modules\.pnpm\lodash-es@4.17.11\node_modules\lodash-es\_freeGlobal.js:4" asking them to ship the file in .mjs extension or add "type": "module" in their package.json.

As a temporary workaround you can try to inline the package by updating your config:
```

```ts
// vitest.config.js
export default {
  test: {
    deps: {
      inline: [
        'D:\**\node_modules\.pnpm\lodash-es@4.17.11\node_modules\lodash-es\_freeGlobal.js:4'
      ]
    }
  }
}
```

其实提示信息已经给了我们解决问题的思路了，就是在 `deps` 中配置好 `inline` ，具体操作如下：

```tsx
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
    setupFiles: ['xxxx/setup.ts'],
    deps: {
      inline: ['lodash-es'],
    },
  },
})
```

## 使用 `msw` mock api 请求报错或请求未被捕获问题

具体错误信息如下：

```shell
[MSW] Error: captured a request without a matching request handler:

  • GET http://localhost/api/policy

If you still wish to intercept this unhandled request, please create a request handler for it.
Read more: https://mswjs.io/docs/getting-started/mocks
```

引用官网的一句文案：

Bear in mind that without a DOM-like environment, like the jsdom from Jest, **you must use absolute request URLs in NodeJS**. This should be reflected in your request handlers:

[Node - Getting Started](https://mswjs.io/docs/getting-started/integrate/node)

需要设置具体的请求路径，如果项目中使用的是 `axios` 库，可以设置 `axios.defaults.baseURL = 'https://api.backend.dev'` 即可，但使用 `rest.get` 等方式还是需要将路径写全。如下代码：

```jsx
const server = setupServer(
  // NOT "/user", nothing to be relative to!
  rest.get("https://api.backend.dev/user", (req, res, ctx) => {
    return res(ctx.json({ firstName: "John" }));
  })
);
```

## mock document 问题

[happy-dom](https://github.com/capricorn86/happy-dom) or [jsdom](https://github.com/jsdom/jsdom) for DOM mocking. 具体的配置方式可以参考官方文档：

[Vitest](https://vitest.dev/guide/features.html#mocking)

## mock window.URL 问题

具体报错信息如下：

```bash
[error] TypeError: window.URL.createObjectURL is not a function
```

解决方案：

`window.URL.createObjectURL = vi.fn((object: any) => object);`

## mock 对象某个属性值

实际在写单测场景时，想要修改某个传入对象中的属性值，那么直接使用 `vi.mock` 去解决显然是不合理的，因为这样会导致全局 `mock` ，导致影响其他模块的单测。

可以使用 `vi.spyOn` 解决该问题，而不影响到其他模块单元测试。

```jsx
// @role
export const user = {
  isAdmin: false,
  isCustom: true,
};

// xx.spec.ts
import { user } from "@role";

vi.spyOn(user, "isAdmin", "get").mockImplementation(() => true);
```

若同个模块中其它测试场景下需要修改不同的属性值，可以使用 `spyFn.mockRestore` 解决。

```jsx
it("xxx_1", () => {
  const spy = vi.spyOn(user, "isAdmin", "get").mockImplementation(() => true);
  expect(xxx).xxx();
  spy.mockRestore();
});

it("xxx_2", () => {
  const spy = vi.spyOn(user, "isAdmin", "get").mockImplementation(() => false);
  expect(xxx).xxx();
  spy.mockRestore();
});
```

## vscode debugger 测试用例出现 **Segmentation fault 问题**

[https://github.com/vitest-dev/vitest/issues/795](https://github.com/vitest-dev/vitest/issues/795)

考虑降 node 版本

## vitest 使用 happy-dom 仍然存在 Element 等内置方法不存在问题

1. 执行测试用例，控制台输出如下错误：

   `[error] TypeError: ele.isEqualNode is not a function`

   可以通过全局 mock 的方式解决：
   `global.HTMLElement.prototype.isEqualNode = vi.fn();`
