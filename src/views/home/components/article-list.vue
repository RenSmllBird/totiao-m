<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
    :success-text="promptText"
    :success-duration="1500">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad" >
      <!-- 文章列表组件 -->
      <!-- <van-cell
      v-for="item in list"
      :key="item.art_id"
      :title="item.title" /> -->
      <articleItem
      v-for="item in list"
      :key="item.art_id"
      :article="item"
      ></articleItem>
      <!-- 文章列表组件 -->
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import articleItem from '@/components/article-item'
export default {
  name: 'articleIndex',
  components: {
    articleItem
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      promptText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.obj.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        this.$toast('获取文章列表成功！')
        const { results } = data.data
        // console.log(results)
        // 2. 把数据添加到 list 数组中(追加！！！)
        this.list.push(...results)
        // 3. 设置本次加载中 loading 状态结束
        this.loading = false
        // 4. 判断数据是否加载结束(处理页码)
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.$toast('获取文章列表失败！')
        this.loading = false
        this.error = true
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.obj.id,
          timestamp: Date.now(), // 因为下拉刷新是取最新数据，所以时间为最新的当前时间
          with_top: 1
        })
        const { results } = data.data
        // console.log(results);
        // 从头部添加数据
        this.list.unshift(...results)
        this.isLoading = false // 下拉刷新后关闭loading加载状态
        this.$toast('更新数据成功！')
        this.promptText = `更新数据成功，更新了${results.length}条数据`
      } catch (error) {
        this.isLoading = false
        this.promptText = '更新失败'
        this.$toast('更新数据失败！', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // height: 100%; 百分比单位相对于父元素
  // 视口（在移动端是布局视口view port）单位：vw和vh 不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  overflow-y: auto;
  height: 82vh;
}
</style>
