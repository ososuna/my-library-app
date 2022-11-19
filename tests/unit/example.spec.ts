import { mount } from '@vue/test-utils'
import BookPage from '@/views/BookPage.vue'

describe('BookPage.vue', () => {
  it('renders book vue', () => {
    const wrapper = mount(BookPage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
  })
})
