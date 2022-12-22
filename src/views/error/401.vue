<template>
  <div>401</div>
  <div>您暂无权限访问</div>
  <div>
    <el-button type="primary" round @click="onSetAuth">重新授权</el-button>
  </div>
  <div class="err-image">
    <img src="/@/assets/401.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Session } from '/@/utils/storage'

export default defineComponent({
  name: '401',
  setup() {
    const router = useRouter()
    const onSetAuth = () => {
      Session.clear()
      router.push('/login')
    }
    return {
      onSetAuth
    }
  }
})
</script>
