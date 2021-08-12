<template>
  <div class="search-result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
    >
      <van-cell v-for="(obj,index) in list" :key="index" :title="obj.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1 根据请求获取数据
        const { data } = await getSearchResult({
          // 2 根据接口文档传入对应的值
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // 3 结构获取的数据
        const { results } = data.data
        // console.log(results)
        // 4 添加进list数组中
        this.list.push(...results)
        // 5 改变loading状态为false 继续加载更多
        this.loading = false
        // 6 判断获取的数据还有没有值
        if (results.length) {
          // 如果有值，每次loading为false状态是接口申请page页加1
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        // 获取失败关闭加载loading状态
        this.loading = false
        // 提示组件内容保存内容
        this.error = true
        this.$toast('获取搜索结果数据失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
