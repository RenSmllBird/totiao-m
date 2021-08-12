<template>
  <div class="search-container">
    <!-- 外层form表单按钮包裹才在移动端键盘上有搜索按钮 -->
    <!-- search 事件在点击键盘上的搜索/回车按钮后触发 -->
    <!-- cancel 事件在点击搜索框右侧取消按钮时触发 -->
    <form action="/" class="search-form">
       <van-search
         v-model="searchText"
         show-action
         placeholder="请输入搜索关键词"
         background="#3296fa"
         @search="onSearch"
         @cancel="onCancel"
         @focus="isResultShow=false"
       />
    </form>
    <!-- 搜索结果 -->
    <searchResult v-if="isResultShow" :searchText="searchText"></searchResult>
    <!-- 搜索建议 -->
    <searchSuggestion
    v-else-if="searchText"
    :searchText="searchText"
    @search="onSearch" ></searchSuggestion>
    <!-- 搜索历史 -->
    <searchHistory v-else :searchHistories="searchHistories" @search="onSearch" @clearAllSearch="searchHistories= []"></searchHistory>
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'
import searchHistory from './components/searchHistory.vue'
import searchSuggestion from './components/searchSuggestion.vue'
import searchResult from './components/searchResult.vue'
export default {
  name: 'searchIndex',
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('SEARCH_HISTORIES') || []
    }
  },
  computed: {},
  watch: {
    searchHistories: {
      handler(val) {
        setItem('SEARCH_HISTORIES', val)
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      // console.log(val)
      this.searchText = val
      this.isResultShow = true
      // 判断获取的输入内容有没有在searchHistories数组中已经存在
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 已存在 把之前的删除 然后把回去的值增加为最新
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
