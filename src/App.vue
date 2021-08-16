<template>
  <div id="app">
    <!-- </keep-alive>
    <keep-alive>  -->
      <!-- 组件一旦创建之后，将缓存起来，下一次再出现的时候不需要重新创建 但是不能用在全局否则其他组件的不会执行beforeCreate,created,beforeMount,mounted四个钩子函数-->
        <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less"></style>
