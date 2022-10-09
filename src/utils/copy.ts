/* eslint-disable no-console */
/**
 * 复制内容到系统剪切板
 * @param {string} value
 */
export function copyText(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value).then(() => {
      console.log('复制成功')
    }, () => {
      console.log('复制失败')
    })
  }
  return value
}
