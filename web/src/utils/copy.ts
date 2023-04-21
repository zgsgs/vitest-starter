/* eslint-disable no-console */
/**
 * 复制内容到系统剪切板
 * @param {string} value
 */
export function copyText(value: string) {
  if (!navigator.clipboard || !window.isSecureContext) {
    console.log('无法获取 navigator.clipboard 对象')
    return false
  }
  navigator.clipboard.writeText(value).then(() => {
    console.log('复制成功')
  }, () => {
    console.log('复制失败')
  })
  return true
}

export async function readClipboard() {
  if (!navigator.clipboard || !window.isSecureContext) {
    console.log('无法获取 navigator.clipboard 对象')
    return false
  }
  const result = await navigator.clipboard.readText()
  return result
}
