<template>
  <div>404</div>
  <div>没有找到该页面</div>
  <div>
    <el-button type="primary" round @click="onGoHome">返回首页</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '404',
  setup() {
    const router = useRouter()
    const onGoHome = () => {
      router.push('/')
    }

    return {
      onGoHome
    }
  }
})
</script>
