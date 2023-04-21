import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

describe('', () => {
  const msg = '一段有意思的话'
  const wrapper = mount(HelloWorld, {
    props: { msg },
  })
  it('renders message when message is not empty', () => {
    expect(wrapper.find('h1').text()).toBe(msg)
  })
})
