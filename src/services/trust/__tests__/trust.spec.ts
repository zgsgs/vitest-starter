import { describe, expect, it, vi } from "vitest";
import { trustService } from "..";
import { type } from "../type";

describe("trust.ts", () => {
  it("should get an initial info", () => {
    expect(trustService.isTrusting).not.toBeTruthy();
  });

  it("should set trust status succeed", () => {
    // 这里可以直接做到修改 hasPriv 的值，而无需直接 vi.mock 去修改整个 type 对象
    const spy = vi.spyOn(type, "hasPriv", "get").mockImplementation(() => true);

    trustService.setTrustStatus(true);
    expect(trustService.isTrusting).toBeTruthy();

    trustService.setTrustStatus(false);
    expect(trustService.isTrusting).not.toBeTruthy();

    spy.mockClear();
  });
});
