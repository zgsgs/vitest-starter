import { vi } from "vitest";

global.document.execCommand = vi.fn((status: string) => !!status);

// [error] TypeError: ele.isEqualNode is not a function
global.HTMLElement.prototype.isEqualNode = vi.fn();
