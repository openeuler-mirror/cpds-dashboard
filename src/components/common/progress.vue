<template>
  <div class="progress">
    <el-progress :percentage="progressNumber" :type="type">
      <span class="percentage-value">{{ showText }}</span>
    </el-progress>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
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

const progressNumber = computed(() => {
  if (props.percentage == 0 && props.total != 0) {
    return (props.used / props.total) * 100
  } else if (props.percentage > 100) return 100
  else if (props.percentage < 0) return 0
  else return props.percentage
})

const showText = computed(() => {
  if (props.textType == 'percentage')
    return props.percentage == 0 ? (props.used / props.total) * 100 : props.percentage
  else if (props.textType == 'fraction') return props.used + '/' + props.total
  else if (props.textType == 'text') return props.text
  else return props.textType
})
</script>

<style lang="scss">
.progress {
  position: relative;
}
</style>
