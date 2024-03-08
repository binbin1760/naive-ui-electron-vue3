<template>
  <AppProvider>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </AppProvider>
</template>

<script setup lang="ts">
import { AppProvider } from "./components";
</script>

<style scoped></style>
