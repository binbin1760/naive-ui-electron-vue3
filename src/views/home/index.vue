<template>
  <div class="home">
    <div class="tips">欢迎使用</div>
    <div @click="createProject" class="create-project">创建图片</div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
function createProject() {
  ipcRenderer.send("message");
}

ipcRenderer.on("message1", (e, msg) => {
  console.log(msg);
});
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.tips {
  font-size: 50px;
}
.create-project {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 100px;
}
</style>