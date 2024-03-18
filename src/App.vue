<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </AppProvider>
</template>

<script setup lang="ts">
import { AppProvider } from "@/components/index";
</script>

<style scoped></style>
