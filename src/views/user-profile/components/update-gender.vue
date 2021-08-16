<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      userGender: this.value // 当前性别
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 确定事件
    async onConfirm(value, index) {
      this.userGender = index
      // 增加loading状态
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })

      try {
        // 调用更新接口请求
        await updateUserProfile({
          gender: this.userGender
        })
        // 返回提升信息
        this.$toast('更新性别成功！')
        // 关闭pop弹层
        this.$emit('close')
        // 子传父更新父组件值
        this.$emit('input', this.userGender)
      } catch (error) {
        this.$toast('更新性别失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
