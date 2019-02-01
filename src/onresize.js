import Vue from 'vue'
import router from './router'
import { getList } from '@/api/table'

window.vm = new Vue()
window.onresize = () => {
  let route
  // 判断路由
  ['systemPower'].forEach((item) => {
    if (item === router.history.current.name) {
      route = true
      return
    }
    route = false
  })
  if (route) {
    // 计算表格高度
    window.vm.$emit('countTableHeight')
    // 筛选框是否显示下拉按钮
    window.vm.$emit('isBottonFun')
  }
}

window.vm.$on('search', (option) => {
  getList(option.data).then(res => {
    option.callback(res)
  })
})
