<template>
  <div class="login-container">
    <!-- nav头部导航栏 -->
    <van-nav-bar title="登录" class="login_header">
       <template #left>
         <van-icon name="cross" @click="$router.back()"/>
       </template>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="userFrom">
      <!-- 手机号输入框 -->
      <van-field
        name="mobile"
        v-model="user.mobile"
        :rules="userFromRules.mobile"
        maxlength="11"
        type="number"
        placeholder="请输入手机号">
      <template #left-icon>
        <i class="toutiao toutiao-shouji"></i>
      </template>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field
        name="验证码"
        v-model="user.code"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
        placeholder="请输入验证码" >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma1"></i>
        </template>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 5"
          @finish="isCountDownShow = false"
          format="ss秒" />
          <!-- 验证码按钮 -->
          <van-button round
          v-else
          class="send_sms_btn"
          native-type="button"
          size="small"
          @click="onSendSms"
          type="default">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login_btn_wrap">
        <van-button class="login_btn"  block type="info" native-type="submit">立即登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    // 定义请求接口需要传入的双向绑定的值
      user: {
        mobile: '',
        code: ''
      },
      //  定义验证手机号和验证码的规则
      userFromRules: {
        mobile: [
          { required: true, message: '手机号不能为空！' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式错误！' }],
        code: [{ required: true, message: '验证码不能为空！' },
          { pattern: /^\d{6}$/, message: '验证码格式错误！' }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit() {
      // 获取登录表单提交数据
      const user = this.user
      // 登录中有加载转圈显示  当后面还要toast触发时，上一个会立马关闭
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 持续时间，0表示持续展示不停止
        duration: 0 // 持续时间，0表示持续展示不停止
      })

      try {
        const res = await login(user)
        this.setUser(res.data.data)
        console.log(res)
        this.$toast('登录成功！')
      } catch (error) {
        // 根据后端返回接口提示对应的内容
        if (error.response.status === 400) {
          this.$toast('手机号或验证码错误！')
        } else {
          this.$toast('登录失败，请稍后再试！', error)
        }
      }
    },
    async onSendSms() {
      // 点击验证码按钮时，校验手机号输入框规则并用try catch捕捉对错
      try {
        await this.$refs.userFrom.validate('mobile')
      } catch (error) {
        if (error.message === '手机号不能为空！') {
          return this.$toast('手机号不能为空！')
        } else if (error.message === '手机号格式错误！') {
          return this.$toast('手机号格式错误！')
        } else {
          console.log(error)
          return this.$toast('验证失败！')
        }
      }
      // 验证表单通过后显示倒计时
      this.isCountDownShow = true
      // 发送请求接口
      try {
        await sendSms(this.user.mobile)
        this.$toast('验证码发送成功！')
      } catch (error) {
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁，请稍后再试！')
        } else if (error.response.status === 404) {
          this.$toast('手机号不存在！')
        } else {
          this.$toast('发送失败，请稍后再试！', error)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  .toutiao-shouji,
  .toutiao-yanzhengma1 {
    font-size: 37px;
    position: absolute;
  }
  .toutiao-shouji {
    top: 22px;
    left: 18px;
  }

  .toutiao-yanzhengma1 {
    top: 30px;
    left: 18px;
  }

  .van-cell {
    padding-left: 60px;
  }

  .send_sms_btn {
    line-height: 46px;
    padding: 12px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login_btn_wrap {
    padding: 53px 33px;
    .login_btn {
      background-color: #1989fa;
      border: none;
    }
  }
}
</style>
