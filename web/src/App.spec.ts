import { mount } from '@vue/test-utils'
import { sleep } from '../test/utils'
import App from './App.vue'

describe('App.vue', () => {
  it('should render success', async () => {
    // given
    const wrapper = mount(App)
    const text = 'Vite + Vue + TS'
    // when
    await sleep(200)

    // const html = wrapper.html()
    const hasText = wrapper.text()
    const nodeNum = wrapper.findAll('.copy').length
    // then
    // expect(html).toMatchInlineSnapshot()
    // 断言文本内容是否存在
    expect(hasText).contain(text)
    // 断言文章列表数
    expect(nodeNum).toBe(1)
  })

  it('should 复制按钮是否存在', async () => {
    // given
    const wrapper = mount(App)
    const copyBtn = wrapper.find('.copy')
    // when
    // 触发点击事件
    // copyBtn.trigger('click')
    const isExists = copyBtn.exists()

    // then
    // 断言该按钮是否存在
    expect(isExists).toBeTruthy()
  })
})
