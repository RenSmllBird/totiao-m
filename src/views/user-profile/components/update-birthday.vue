<template>
  <div class="update-birthday">
    <!--
      currentDate 双向绑定了日期选择器
        设置日期选择器的默认值
        同步日期选择器选择的日期
      min-date: 可选的最小日期
      max-date: 可选的最大日期
     -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 确定事件
    async onConfirm(value) {
      // console.log(value);
      // 配置loading加载状态
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const date = dayjs(value).format('YYYY-MM-DD')
        // console.log(date);
        await updateUserProfile({
          birthday: date
        })
        this.$toast('更新日期成功！')
        this.$emit('close')
        this.$emit('input', date)
      } catch (error) {
        this.$toast('更新日期失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
