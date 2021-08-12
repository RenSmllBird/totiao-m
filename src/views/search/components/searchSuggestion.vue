<template>
  <div class="search-suggestion">
    <van-cell
    v-for="(item,index) in suggestions"
    :key="index"
    @click="$emit('search',item)"
    icon="search">
      <template #title>
        <div v-html="highlight(item)"></div>
      </template>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function(value) {
        console.log(value)
        this.loadSearchSuggestions(value)
      }, 500),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取联想数据失败！')
      }
    },
    highlight(item) {
      // console.log(item)
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const highlightStr = `<span style="color:red;">${this.searchText}</span>`
      const reg = RegExp(this.searchText, 'gi')
      return item.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped></style>
