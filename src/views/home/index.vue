<template>
  <div class="home">
    <div class="tips">欢迎使用</div>
    <div @click="createProject" class="create-project">创建项目/导入项目</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function createProject() {
  router.push("/work");
}
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