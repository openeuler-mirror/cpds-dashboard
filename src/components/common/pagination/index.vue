<template>
  <div class="pagination-container fr">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'Pagination',
  props: {
    total: {
      default: 0,
      type: Number
    },
    page: {
      // current page
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Number,
      default: 10
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val: number) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val: number) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val: number) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange(val: number) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>
<style scoped>
.pagination-container {
  padding: 32px 16px;
  background: #fff;
}
</style>
