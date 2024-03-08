<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <slot></slot>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemColorActive: "red"
  }
};
</script>

<style scoped></style>