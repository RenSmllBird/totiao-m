<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="username"
        rows="2"
        autosize
        type="textarea"
        maxlength="21"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      username: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async  onConfirm() {
      // 1 规则校验
      if (this.username.trim() === '') return this.$toast('昵称不能为空！')
      // 2 设置loading加载
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 3 发生更新请求
        await updateUserProfile({
          name: this.username
        })
        //  4 返回成功的提示信息
        this.$toast.success('更新昵称成功！')
        // 5 子传父关闭pop
        this.$emit('close')
        // 6 子传父更新父组件name名称
        this.$emit('input', this.username)
      } catch (error) {
        this.$toast('更新用户昵称失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
