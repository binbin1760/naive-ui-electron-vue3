<template>
  <div class="work-page">
    <div class="left">项目资源栏目</div>
    <div class="middle">
      <div class="picture">图片预览区域</div>
      <div class="tool">工具栏</div>
    </div>
    <div class="right">工程信息预览</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.work-page {
  height: 100vh;
  display: flex;
}
.left {
  width: 150px;
  background: aqua;
}
.middle {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.picture {
  flex: 1;
  background: red;
}
.tool {
  height: 200px;
  background: #cccccc;
}
.right {
  width: 200px;
  background: aqua;
}
</style>