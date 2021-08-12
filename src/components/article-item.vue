<template>
  <van-cell  class="article-item" :to="{
    name:'article',
    params:{articleId:article.art_id}
    }">
    <!-- 顶部title插槽 -->
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{article.title}}</div>
    </template>
    <!-- 底部插槽  -->
    <template #label>
      <!-- 底部图片 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
        class="cover-item"
         v-for="(img,index) in article.cover.images"
         :key="index">
            <van-image
            class="cover-item-img"
          fit="cover"
          :src="img" />
         </div>
      </div>
      <!-- 作者 时间等信息插槽  -->
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}</span>
        <span>{{article.pubdate | relativeTime }}</span>
      </div>
    </template>
    <!-- 右侧图片插槽 -->
    <template #right-icon v-if="article.cover.type === 1">
        <van-image
        class="right-cover"
          fit="cover"
          :src="article.cover.images[0]" />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }
 .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
