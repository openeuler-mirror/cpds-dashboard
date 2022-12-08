<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <el-container class="common-layout">
        <el-header class="header">
          <ProgressCard
            class="progress"
            title="测试1"
            :used="6"
            :total="15"
            type="circle"
            textType="fraction"
          />
          <ProgressCard
            class="progress"
            title="测试2"
            :percentage="88"
            type="dashboard"
            textType="percentage"
          />
          <ProgressCard
            class="progress"
            title="测试3"
            :used="60"
            :total="15"
            type="circle"
            textType="fraction"
          />
          <ProgressCard
            class="progress"
            title="测试4"
            :used="14"
            :total="15"
            type="circle"
            textType="fraction"
          />
        </el-header>
        <el-main class="main-container">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>节点信息</span>
              </div>
            </template>
            <div class="node-table-box">
              <nodeTable />
            </div>
          </el-card>
        </el-main>
      </el-container>
      <el-aside> <nodeChart /></el-aside>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import nodeChart from './component/nodeChart.vue'
import nodeTable from './component/nodeTable.vue'
import ProgressCard from '/@/components/common/progressCard/index.vue'
</script>

<style lang="scss" scoped>
.common-layout {
  margin-top: 20px;
  height: 100%;
}

.el-header {
  display: flex;
  height: 30%;

  .progress {
    margin: 0 auto;
    width: height;
    height: 100%;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.node-table-box {
  padding: auto;
  margin: auto;
}

.box-card {
  margin-top: 20px;
  width: auto;
  height: auto;
}

.el-aside {
  width: 400px;
}
</style>
