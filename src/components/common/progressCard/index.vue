<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ props.title }}</span>
      </div>
    </template>
    <div>
      <Progress
        :percentage="props.percentage"
        :total="props.total"
        :used="props.used"
        :type="props.type"
        :textType="props.textType"
        :text="props.text"
      />
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import Progress from './progress/progress.vue'
const props = defineProps({
  title: {
    type: String,
    default() {
      return ''
    }
  },
  // percentage: 0-100
  percentage: {
    type: Number,
    default() {
      return 0
    }
  },
  // value of total
  total: {
    type: Number,
    default() {
      return 0
    }
  },
  // value of used
  used: {
    type: Number,
    default() {
      return 0
    }
  },
  // progress type
  type: {
    type: String,
    default() {
      return 'line' // line/circle/dashboard
    }
  },
  // show text type
  textType: {
    type: String,
    default() {
      return 'percentage' //percentage/fraction/text
    }
  },
  // text content
  text: {
    type: String,
    default() {
      return ''
    }
  }
})
</script>

<style lang="scss">
.el-card__header {
  height: 10%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  height: 100%;
}
</style>
