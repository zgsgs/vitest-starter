/**
 * 复制内容到系统剪切板
 * @param {string} value
 */
export function copyText(value: string) {
    let input = document.createElement('input');
    let inputID = `copyInput${Date.now()}`;
    input.setAttribute('id', inputID);
    input.setAttribute('value', value);

    // 触发浏览器自带的复制功能
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) {
        console.log('copy succeed');
    }

    // 移除输入框
    document.body.removeChild(input);
}
