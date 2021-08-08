import dayjs from 'dayjs'
import Vue from 'vue'
// 编译语言为中文
import 'dayjs/locale/zh-cn'
// 导入relativeTime组件
import relativeTime from 'dayjs/plugin/relativeTime'

// 全局使用简体中文
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 全局注册处理时间工具
Vue.filter('relativeTime', value => {
  const time = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  // console.log(time)
  return dayjs().to(time)
})
// 测试
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// console.log(dayjs().from('2000'));
// console.log(dayjs().to('2000'));
