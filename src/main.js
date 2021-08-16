import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 引入vant组件css文件
import 'vant/lib/index.css'

// 引入全局css样式文件
import './styles/index.less'

// 使用 lib-flexible (opens new window)动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'
// 引入第三方处理时间工具包
import '@/utils/dayjs'

// 全局注册vant组件
Vue.use(Vant)

// 前置守卫
router.beforeEach((to, from, next) => {
  // 去的页面是否需要登录
  if (to.meta.needLogin) {
    // 需要登录
    if (store.state.user) {
      // 登录了 放行继续下一步
      next()
    } else {
      // 未登录 非法进入，默认去登录页面
      next('/login')
    }
  } else {
    // 不需要登录
    next()
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
