import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { sleep } from '../test/utils'
import App from './App.vue'

describe('App.vue', () => {
  it('should render success', async () => {
    // given
    const wrapper = mount(App)
    // when
    await sleep(200)

    // then
    expect(wrapper.html()).toMatchSnapshot()

    // 断言文章列表标题是否存在
    expect(wrapper.text()).contain('文章列表')

    // 断言文章列表数
    expect(wrapper.findAll('.post-item').length).toBe(3)
  })

  it('should load comments succeed when click load comments button', async () => {
    // given
    const wrapper = mount(App)
    const loadCommentsBtn = wrapper.find('.load-comment-button')
    // when
    // 触发点击事件
    loadCommentsBtn.trigger('click')

    // then
    // 断言该按钮是否存在
    expect(loadCommentsBtn.exists()).toBe(true)
    await sleep(200)
    expect(wrapper.findAll('.comment-item').length).toBe(3)
  })
})
