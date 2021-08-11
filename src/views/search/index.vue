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
    <searchHistory v-else></searchHistory>
  </div>
</template>

<script>
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
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      console.log(val)
      this.searchText = val
      this.isResultShow = true
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
