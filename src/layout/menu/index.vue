<template>
  <div class="logo"></div>
  <el-menu
    default-active="2"
    :collapse="props.isCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
    background-color="var(--nav--bg-color)"
    text-color="var(--menu-text-color)"
    active-text-color="var(--menu-text-active-color)"
    class="menu"
    router
  >
    <template v-for="(first, index) in Routes.children">
      <el-sub-menu :index="first.path" v-if="first.children" :key="index">
        <template v-if="first.children">
          <el-menu-item-group v-for="(second, sec_index) in first.children" :key="sec_index">
            <el-menu-item :index="first.path + '/' + second.path">
              <el-icon><component :is="second.meta.icon" /></el-icon>
              <span>{{ $t(second.meta.title) }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </template>
        <template #title>
          <el-icon><component :is="first.meta.icon" /></el-icon>
          <span>{{ $t(first.meta.title) }}</span>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="first.path" :key="'item' + index">
        <el-icon><component :is="first.meta.icon" /></el-icon>
        <span>{{ $t(first.meta.title) }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Routes } from '/@/router/route'
const props = defineProps(['isCollapse'])
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">
@import url('/@/style/navmenu.scss');

.logo {
  height: 80px;
  background: var(--nav--bg-color);
}

.menu {
  min-height: calc(100vh - 80px);
}
</style>
