<template>
  <el-table border class="node-table">
    <el-table-column prop="name" :label="$t('home.nodeTable.Name')" width="180" />
    <el-table-column prop="ipaddress" :label="$t('home.nodeTable.IpAddress')" />
    <el-table-column prop="status" :label="$t('home.nodeTable.Status')" />
    <el-table-column prop="malfunction" :label="$t('home.nodeTable.Malfunction')" />
    <el-table-column prop="subhelth" :label="$t('home.nodeTable.SubHealth')" />
  </el-table>
</template>

<script lang="ts" setup></script>
<style>
.node-table {
  width: 80%;
}
</style>
