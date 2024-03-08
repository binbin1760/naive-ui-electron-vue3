<template>
  <n-layout has-sider>
    <n-layout-sider
      width="10rem"
      collapse-mode="width"
      :collapsed-width="64"
      :content-style="siderStyle"
      :collapsed="isCollapsed"
      show-trigger
      @expand="isCollapsed=false"
      @collapse="isCollapsed=true"
    >
      <SideMenu v-model="isCollapsed"></SideMenu>
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <slot></slot>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
const siderStyle = ref({
  height: "100vh"
});
const isCollapsed = ref<boolean>(false);
</script>

<style scoped>
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(163, 10, 10, 0.4);
}
</style>