import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

// 当你的项目页面越来越多之后，在开发环境之中使用 lazy-loading 会变得不太合适，每次更改代码触发热更新都会变得非常的慢。所以建议只在生产环境之中使用路由懒加载功能。
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
* hidden: true                   true:表示导航栏不显示这个项目
* alwaysShow: true               true:无论children长度是多少，都会显示在根项目
*                                false:需要children有值才显示
* redirect: noredirect           'noredirect' 表示面包屑不跳转，其他值表示跳转路径
* name:'router-name'             用于<keep-alive>的name (必填!!!)
* meta : {
    title: 'title'               显示在导航栏的标题、面包屑标题
    icon: 'svg-name'             显示在导航栏的图标
    roles: ['admin', 'editor']   角色权限 不设置则无限制
  }
**/
export const constantRouterMap = [
  {
    // 固定的路由页面
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    // hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'home',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: '错误页',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'page401',
        meta: {
          title: '401错误页',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'page404',
        meta: {
          title: '404错误页',
          noCache: true
        }
      }
    ]
  }
]

export const asyncRouterMap = [
  // 异步的路由页面，根据权限加载
  {
    path: '/permission',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'permission',
    meta: {
      title: '权限控制',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'pagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'directivePermission',
        meta: {
          title: '权限指令'
        }
      }
    ]
  },
  {
    path: '/tree',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: '树',
      icon: 'tree'
    },
    children: [
      {
        path: 'tree1',
        name: 'Tree1',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '过滤树',
          icon: 'tree'
        }
      },
      {
        path: 'tree2',
        name: 'Tree2',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '过滤树222',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      roles: ['admin'],
      title: '表格',
      icon: 'table'
    },
    children: [
      {
        path: 'table1',
        name: 'Table1',
        component: () => import('@/views/table/index'),
        meta: {
          title: '表格1'
        }
      },
      {
        path: 'table2',
        name: 'Table2',
        component: () => import('@/views/table/index'),
        meta: {
          title: '表格2'
        }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    alwaysShow: true,
    name: 'Form',
    meta: {
      roles: ['admin'],
      title: '表单',
      icon: 'form'
    },
    children: [
      {
        path: 'form1',
        name: 'Form1',
        component: () => import('@/views/form/index'),
        meta: {
          title: '表单1'
        }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      roles: ['admin'],
      title: '多级目录',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // 父级路由
        name: 'Menu1',
        meta: {
          title: '目录1'
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: '目录1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: '目录1-2'
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: '目录1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: '目录1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: '目录1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: '目录2'
        }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      roles: ['admin'],
      title: '组件',
      icon: 'component'
    },
    children: [
      {
        path: 'tinymce',
        component: () => import('@/views/components-demo/tinymce'),
        name: 'tinymce-demo',
        meta: {
          title: 'tinymce富文本'
        }
      },
      {
        path: 'drag-dialog',
        component: () => import('@/views/components-demo/dragDialog'),
        name: 'dragDialog-demo',
        meta: {
          title: '拖拽对话框'
        }
      },
      {
        path: 'avatar-upload',
        component: () => import('@/views/components-demo/avatarUpload'),
        name: 'avatarUpload-demo',
        meta: {
          title: '头像上传'
        }
      },
      {
        path: 'clipboard',
        component: () => import('@/views/components-demo/clipboard'),
        name: 'clipboardDemo',
        meta: {
          title: '剪切板'
        }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel',
      roles: ['admin']
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'exportExcel',
        meta: {
          title: '导出Excel'
        }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'selectExcel',
        meta: {
          title: '选择并导出Excel'
        }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'uploadExcel',
        meta: {
          title: '导入Excel'
        }
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'detail',
    meta: {
      title: '详情页示例',
      icon: 'detail',
      roles: ['admin']
    },
    children: [
      {
        path: 'addFrom',
        component: () => import('@/views/detail/addFrom'),
        name: 'addFrom',
        meta: {
          icon: 'detail',
          title: '新增页'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //使用history而非hash 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
