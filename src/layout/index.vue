<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside"> Aside </el-aside>
      <el-container>
        <el-header class="header"> header </el-header>
        <el-main class="main">main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
@import url('/@/style/index.scss');

.container {
  height: 100vh;

  .aside {
    overflow: hidden;
  }

  .header {
    height: 80px;
    background: #ebf1f5;
  }
}
</style>
