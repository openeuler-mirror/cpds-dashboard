<template>
  <el-table :data="tableData" border class="node-table" size="large">
    <el-table-column prop="name" :label="$t('home.nodeTable.Name')" width="180" />
    <el-table-column prop="ipaddress" :label="$t('home.nodeTable.IpAddress')" />
    <el-table-column prop="status" :label="$t('home.nodeTable.Status')" />
    <el-table-column prop="malfunction" :label="$t('home.nodeTable.Malfunction')" />
    <el-table-column prop="subhelth" :label="$t('home.nodeTable.SubHealth')" />
  </el-table>
</template>

<script lang="ts" setup>
//TODO this data is for test, api requests will be used later
const tableData = [
  {
    name: '节点一',
    ipaddress: '192.168.0.1',
    status: '在线',
    malfunction: 0,
    subhelth: 3
  },
  {
    name: '节点二',
    ipaddress: '192.168.0.2',
    status: '在线',
    malfunction: 2,
    subhelth: 3
  },
  {
    name: '节点三',
    ipaddress: '192.168.0.3',
    status: '在线',
    malfunction: 1,
    subhelth: 3
  },
  {
    name: '节点四',
    ipaddress: '192.168.0.4',
    status: '离线',
    malfunction: 0,
    subhelth: 0
  }
]
</script>
<style>
.node-table {
  margin: 0 auto;
  width: 90%;
  height: auto;
}
</style>
