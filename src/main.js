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

// 全局注册vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
