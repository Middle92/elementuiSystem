import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// 全局注册svg图标组件
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
