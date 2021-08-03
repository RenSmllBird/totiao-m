<template>
  <div class="login-container">
    <!-- nav头部导航栏 -->
    <van-nav-bar title="登录" class="login_header" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
  <van-field name="手机号" placeholder="请输入手机号">
    <template #left-icon>
      <i class="toutiao toutiao-shouji"></i>
    </template>
  </van-field>
  <van-field name="验证码" placeholder="请输入验证码" >
    <template #left-icon>
      <i class="toutiao toutiao-yanzhengma1"></i>
    </template>
    <template #button>
      <van-button round class="send_sms_btn" size="small" type="default">发送验证码</van-button>
    </template>
  </van-field>
  <div class="login_btn_wrap">
    <van-button class="login_btn"  block type="info" native-type="submit">立即登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit(value) {
      console.log(value)
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
