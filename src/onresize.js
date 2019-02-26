import Vue from 'vue'
import { getList } from '@/api/table'

window.vm = new Vue()

window.vm.$on('search', (option) => {
  getList(option.url, option.data).then(res => {
    option.callback(res)
  })
})
