<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file"  @change="onChangePhoto" />
    <!-- 个人信息 -->
    <van-cell class="avatar-cell" @click="$refs.file.click()" title="头像" is-link center>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" @click="isupdateUserNameShow = true" :value="user.name" is-link />
    <van-cell title="性别" @click="isupdateUserGenderShow = true" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell title="生日" @click="isupdateUserBirthdayShow = true" :value="user.birthday" is-link />
    <!-- /个人信息 -->

    <!-- 修改昵称 -->
    <van-popup
      v-model="isupdateUserNameShow"
      position="bottom"
      style="height:100%;">

      <updateName
      v-if="isupdateUserNameShow"
      @close="isupdateUserNameShow = false"
      v-model="user.name"></updateName>
    </van-popup>
    <!-- /修改昵称 -->

    <!-- 修改性别 -->
    <van-popup
      v-model="isupdateUserGenderShow"
      position="bottom"
      style="{height:70%;}">

      <updateGender
      v-if="isupdateUserGenderShow"
      @close="isupdateUserGenderShow = false"
      v-model="user.gender"></updateGender>
    </van-popup>
    <!-- /修改性别 -->

    <!-- 修改日期 -->
     <van-popup
      v-model="isupdateUserBirthdayShow"
      position="bottom"
      style="{height:70%;}">

      <updateBirthday
      v-if="isupdateUserBirthdayShow"
      @close="isupdateUserBirthdayShow = false"
      v-model="user.birthday"></updateBirthday>
    </van-popup>
    <!-- /修改日期 -->

    <!-- 修改用户头像 -->
    <van-popup
      v-model="isupdateUserPhotoShow"
      position="bottom"
      style="height:100%;">

      <updatePhoto
      v-if="isupdateUserPhotoShow"
      :img="img"
      @close="isupdateUserPhotoShow = false"
      @update-photo="user.photo = $event"
      ></updatePhoto>
    </van-popup>
    <!-- /修改用户头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  props: {},
  data () {
    return {
      user: {},
      isupdateUserNameShow: false,
      isupdateUserGenderShow: false,
      isupdateUserBirthdayShow: false,
      isupdateUserPhotoShow: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 数据加载完成时获取用户个人资料
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        //   this.$toast('获取用户个人资料成功！')
        this.user = data.data
      } catch (error) {
        this.$toast('获取用户个人资料失败！')
      }
    },
    onChangePhoto() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取 blob 数据
      const blod = window.URL.createObjectURL(file)
      // console.log(blod)
      // 把生成的图片地址给data的值，并通过父传子给子组件
      this.img = blod
      // 调用pop弹框和子组件  展示预览图片弹出层
      this.isupdateUserPhotoShow = true
      // file-input 如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value值清空！
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup{
      background-color:#f5f7f9;
  }
}
</style>
