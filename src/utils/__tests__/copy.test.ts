import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { copyText } from "../copy";

// 由于实际代码中用了 Date.now() 获取时间戳，所以这里需要自己 mock 一下日期
const date = new Date(2021, 3, 8);

describe("copy.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();

    // mock 系统时间
    vi.setSystemTime(date);
  });
  afterAll(() => {
    // 还原为真实时间
    vi.useRealTimers();
  });
  it("复制内容到系统剪切板", async () => {
    const mockCopyText = "hello world";

    // 这里插入移除节点间谍，避免节点被移除，便于后续测试
    const spyRemoveChild = vi
      .spyOn(document.body, "removeChild")
      .mockImplementation((ele: Node) => ele);

    // mock execCommand 函数，node 本身不支持
    const spyExecCommand = vi
      .spyOn(document, "execCommand")
      .mockImplementation((status: string) => !!status);

    // 执行方法
    copyText(mockCopyText);

    const inputEle = document.getElementsByTagName("input")[0];
    const spyInputSelect = vi
      .spyOn(inputEle, "select")
      .mockImplementation(() => null);

    // 断言 input 元素是否存在
    expect(inputEle).not.toBeUndefined();

    // 断言 id 是否正确
    expect(inputEle.getAttribute("id")).toEqual(`copyInput${date.valueOf()}`);

    // value 是否一致
    expect(inputEle.getAttribute("value")).toEqual(mockCopyText);

    // 这里必须弄成异步的，由于 spyInputSelect 是在调用 copyText 后执行的
    setTimeout(() => {
      // 断言 select 方法是否被调用
      expect(spyInputSelect).toHaveBeenCalledTimes(1);
    }, 10);

    // 断言 document.execCommand 方法是否被调用
    expect(spyExecCommand).toHaveBeenCalledTimes(1);

    // 断言传入参数是否为 'copy'
    expect(spyExecCommand.mock.calls[0][0]).toEqual("copy");

    // 断言是否执行移除节点操作
    expect(spyRemoveChild).toHaveBeenCalledTimes(1);

    // 断言传参是否为 input 节点
    expect(spyRemoveChild.mock.calls[0][0]).toEqual(inputEle);
  });
});
