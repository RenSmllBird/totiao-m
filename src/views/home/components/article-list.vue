<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad" >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'articleIndex',
  components: {},
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
      error: false
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
        console.log(results)
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
    }
  }
}
</script>

<style lang="less" scoped></style>
