import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'// 进度条样式
import { getToken } from '@/utils/auth' // 从cookies拿取token

NProgress.configure({ showSpinner: false })// 配置好进度条

// 权限判断方法
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // 如果叫“admin”就直接通过 判断条件根据业务改也行
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect']// 免登录白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  if (getToken()) { // 判断当前是否有token
    /* has token */
    if (to.path === '/login') { // 如果当前是登录页则路由到首页
      next({ path: '/' })
      NProgress.done() // 如果当前页面是首页是无法再钩子函数执行进度条完成动作，这里手动执行一下
    } else { // 其他页面的情况
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.roles // 角色roles是一个数组，如: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true 清除历史
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
        // 根据业务可删 ↑
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 如果当前页面是登录是无法再钩子函数执行进度条完成动作，这里手动执行一下
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 执行进度条完成动作
})
