<template>
  <div class="logo"></div>
  <el-menu
    default-active="2"
    :collapse="props.isCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
    background-color="#ebf1f5"
    text-color="#606266"
    active-text-color="#2F74FF"
    class="menu"
    router
  >
    <template v-for="(first, index) in Routes.children">
      <el-sub-menu :index="first.path" v-if="first.children" :key="index">
        <template v-if="first.children">
          <el-menu-item-group v-for="(second, sec_index) in first.children" :key="sec_index">
            <el-menu-item :index="first.path + '/' + second.path"
              ><i class="el-icon-odometer"></i>
              {{ second.name }}
            </el-menu-item>
          </el-menu-item-group>
        </template>
        <template #title>
          <span>{{ first.name }}</span>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="first.path" :key="'item' + index">
        <span>{{ first.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { Routes } from '/@/router/route'
const props = defineProps(['isCollapse'])
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.logo {
  height: 80px;
  background: #e1eaf4;
}

.menu {
  min-height: calc(100vh - 80px);
}
</style>
