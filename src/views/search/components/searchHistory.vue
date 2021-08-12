<template>
  <div class="search-history">
    <van-cell title="搜索历史">
     <div v-if="isDeleteShow">
        <span @click="$emit('clearAllSearch')">全部删除</span>&emsp;
        <span @click="isDeleteShow = false">完成</span>
     </div>
     <van-icon v-else @click="isDeleteShow = true"   name="delete" />
    </van-cell>
    <van-cell v-for="(item,index) in searchHistories" :key="index" :title="item" @click="delSearchItem(item,index)">
      <van-icon  v-show="isDeleteShow" name="close" />
    </van-cell>

  </div>
</template>

<script>

export default {
  name: 'searchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delSearchItem(item, index) {
      if (this.isDeleteShow) {
        // true 删除状态  删除该数据  props接收的数据如果是数组或对象只能修改里面的内容不能改变原数组或对象xxx=[]/xxx={}
        this.searchHistories.splice(index, 1)
      } else {
        // false 非删除状态  点击等于搜索子传父自定义事件
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
