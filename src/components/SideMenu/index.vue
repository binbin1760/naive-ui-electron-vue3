<template>
  <n-menu
    :collapsed="isCollapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuItem"
  />
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {BookOutline as BookIcon,PersonOutline as PersonIcon} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const ToCollapsed = defineModel({ type: Boolean })
const menuItem = ref<Array<MenuOption>>([
    {
        label: '第一',
        key: 'first',
        icon:renderIcon(BookIcon)
    },
    {
        label: '第一',
        key: 'second',
        icon:renderIcon(PersonIcon)
    }
])

const isCollapsed = computed(() => { 
    return ToCollapsed.value
})
</script>

<style scoped></style>