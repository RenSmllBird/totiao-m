<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed >
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated class="channel-tabs">
      <van-tab
      :title="obj.name"
      v-for="obj in channels"
      :key="obj.id" >
      <!--  -->
      <articleList :obj=obj></articleList>
      <!--  -->
      </van-tab>
    <div slot="nav-right" class="placeholder">
    </div>
    <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
    </div>
    </van-tabs>
    <van-popup
     v-model="isChannelEditShow"
       closeable
       close-icon-position="top-left"
       position="bottom"
       :style="{ height: '100%' }" >
       <!--  -->
       <channelEdit
       :myChannels="channels" :active="active" @updateActive='updateActiveFn'></channelEdit>
       <!--  -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './components/article-list.vue'
import channelEdit from './components/channel-edit.vue'
export default {
  name: 'homeIndex',
  components: {
    articleList,
    channelEdit
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {

  },
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        // this.$toast('获取用户频道列表成功！')
        // console.log(data.data.channels)
        this.channels = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast('获取用户频道列表失败！')
      }
    },
    // 接收子传父的索引号来改变active的状态
    updateActiveFn(index, show) {
      // console.log(index);
      this.active = index

      // 非编辑状态下点击channel关闭汉堡弹出层
      this.isChannelEditShow = show
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
    padding-top: 174px;
    padding-bottom: 100px;
  // tabs 标签导航也设置为固定定位
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .page-nav-bar {
    background-color: #3296fa;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
  border-right: 1px solid #EDEFF3;
  min-width: 200px;
  height: 80px;
  .van-tab__text {
    font-size: 27px;
    color: #777777;
  }
    }

    .van-tab--active .van-tab__text{
  color: #333 !important;
    }
    .van-tabs__line {
  width:31px !important;
  height:6px;
  background:rgba(50,150,250,1);
  border-radius:3px;
  bottom: 8px;
    }
    .van-tabs__nav {
  padding: 0;
    }
    .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
    }

    .hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
    }
  }
}
</style>
