import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import 'normalize.css/normalize.css' // 样式初始化
import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission'

Vue.config.productionTip = false // 权限控制
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
