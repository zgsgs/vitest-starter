import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "../mocks/server";
import '../mocks/global';

// 配置服务 onUnhandleRequest: 'error' 只要产生了没有相应类型的请求处理，就会发生错误。
// 在所有测试之前启动服务器
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// 所有测试后关闭服务器
afterAll(() => server.close());

// 每次测试后重置处理程序“对测试隔离很重要”
afterEach(() => server.resetHandlers());
