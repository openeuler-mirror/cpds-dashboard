<template>
  basicService
  <Table />
  <Pagination :total="20" :page="5" :limit="10" />
</template>
<script lang="ts" setup>
import Table from '/@/components/common/table/index.vue'
import Pagination from '/@/components/common/pagination/index.vue'
</script>
<style scoped lang="scss"></style>
