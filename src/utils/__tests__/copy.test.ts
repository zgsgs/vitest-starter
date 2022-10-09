import { describe, expect, it } from 'vitest'
import { copyText } from '../copy'

describe('copy.ts', () => {
  it('复制内容到系统剪切板', async () => {
    const mockCopyText = 'hello world'

    expect(copyText(mockCopyText)).toMatchInlineSnapshot('"hello world"')
  })
})
