<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside" :style="{ width: isCollapse ? '63px' : '230px' }">
        <AppMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-row>
            <el-col :span="1">
              <el-button link type="default" @click="toggle">
                <el-icon :size="25"><fold /></el-icon>
              </el-button>
            </el-col>
            <el-col :span="23">
              <Header />
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import AppMenu from '/@/layout/menu/index.vue'
import Header from '/@/layout/header/index.vue'
import { ref } from 'vue'
import { Fold } from '@element-plus/icons-vue'

let isCollapse = ref(false)
const toggle = (): void => {
  isCollapse.value = !isCollapse.value
}
</script>
<style scoped lang="scss">
.container {
  height: 100vh;

  .aside {
    overflow: hidden;
  }

  .header {
    height: 80px;
    background: var(--header-bg-color);
  }
}
</style>
