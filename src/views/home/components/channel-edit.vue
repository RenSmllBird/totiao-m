<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <!-- 通过isEdit状态来控制按钮文本显示和编辑非编辑状态 -->
      <van-button
      class="edit-btn"
      type="danger"
      @click="isEdit = !isEdit"
      round plain size="mini">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item @click="onMyChannelsClick(obj,index)"  class="grid-item" v-for="(obj,index) in myChannels"  :key="obj.id">
        <!-- 通过isEdit来控制图标的显示隐藏 -->
         <van-icon v-show="isEdit && !fixedChannels.includes(obj.id)" slot="icon" name="clear"></van-icon>
        <template #text>
          <span  :class="{active:index === active}" class="text">{{obj.name}}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
      @click="addMyChannels(item)"
      class="grid-item"
      v-for="item in recommentChannels"
      icon="plus"
      :key="item.id"  :text="item.name" />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllChannels, addUserChannels, delUserChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  components: {},
  props: {
    // 我的展示页面的频道数据
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道数据
      isEdit: false, // 控制图标显示和按钮文本提示及编辑非编辑状态
      fixedChannels: [0] // 控制那些channel无法显示删除图标及无法删除 需要调用includes方法
    }
  },
  computed: {
    ...mapState(['user']),
    // 在计算属性中定义推荐频道的数据  推荐频道 = 全部频道 - 我的频道
    // 方法一： 循环遍历全部频道每一项 然后再在我的频道里面查找有无对应的属性 如果没有就push进准备的数组中
    recommentChannels() {
      const rmChannels = []
      this.allChannels.forEach(item => {
        // some遍历来的数组返回结果是布尔型
        const flag = this.myChannels.some(val => val.id === item.id)
        if (!flag) {
          rmChannels.push(item)
        }
      })
      return rmChannels
    },
    // 方法二： 利用filter筛选出在全部频道中没有跟我的频道中数据有重复属性的数据并return返回数据
    recommentChannel() {
      return this.allChannels.filter(item => !this.myChannels.find(val => val.id === item.id))
    }

  },
  watch: {},
  created() {
    // 在页面渲染完成后调用获取全部频道列表接口方法
    this.loadAllChannel()
  },
  mounted() {},
  methods: {
    // 定义获取全部频道列表接口方法
    async loadAllChannel() {
      try {
        const { data } = await getAllChannels()
        // console.log(data.data.channels);
        this.allChannels = data.data.channels
        // console.log(this.allChannels);
        this.$toast('获取全部频道数据成功！')
      } catch (error) {
        console.log(error)
        this.$toast('获取全部频道数据失败！')
      }
    },
    // 给我的频道数据中添加频道
    async addMyChannels(obj) {
      this.myChannels.push(obj)
      // console.log(obj);
      // 数据持久化处理
      if (this.user) { // this.user = 登录状态 = true 因为携带token  向服务器发送数据增加频道数据
        try {
          await addUserChannels({
            id: obj.id,
            seq: this.myChannels.length
          })
          this.$toast('增加新频道数据成功！')
        } catch (error) {
          this.$toast('增加新频道数据失败！')
        }
      } else { // this.user = 非登录状态 = false //为登录把数据存储到被百度
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 我的频道按钮处理方法
    onMyChannelsClick(obj, index) {
      if (this.fixedChannels.includes(obj.id)) {
        return
      }
      // 根据isEdit的状态来判断点击时是处于编辑状态还是非编辑状态
      if (this.isEdit) {
        // this.isEdit = 编辑状态 = true  在编辑状态下删除被选中的对象
        this.myChannels.splice(index, 1)
        // 判断当删除index值小于等于当前点击的active值时让传过去的active值减一
        if (index <= this.active) {
          this.$emit('updateActive', this.active - 1, true)
        }
        // 处理持久化问题
        this.deleteChannels(obj)
      } else {
        // this.isEdit = 编辑状态 = false  非编辑状态下通过子传父自定义事件
        this.$emit('updateActive', index, false)
      }
    },
    // delChannels 处理持久化方法
    async deleteChannels(obj) {
      console.log(obj.id)
      try {
        if (this.user) { // 登录状态 调用接口传给服务器更改数据
          await delUserChannel(obj.id)
        } else { // 非登录状态存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
        this.$toast('删除频道数据成功！')
      } catch (error) {
        this.$toast('删除频道数据失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
   .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
   /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
   /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
