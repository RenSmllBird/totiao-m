<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img">

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {

  name: 'UpdatePhoto',
  components: {},
  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: true
    })
  },
  methods: {
    // 确定事件
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        //   console.log(blob)  // 裁剪后的结果信息
        this.updatePhoto(blob)
      })
    },
    async updatePhoto(blob) {
      // nwe一个formDate容器
      const formDate = new FormData()
      // 利用formDate的append的方法追加元素进容器
      formDate.append('photo', blob)
      // 调用接口发送请求
      try {
        const { data } = await updateUserPhoto(formDate)
        // console.log(data)
        // 返回请求成功后的信息
        this.$toast.success('更新头像成功！')
        // 子传父关闭pop弹层
        this.$emit('close')
        // 子传父更新父组件的值
        this.$emit('update-photo', data.data.photo)
      } catch (error) {
        this.$toast('更新头像失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
