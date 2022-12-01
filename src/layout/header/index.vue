<template>
  <div class="header-right">
    <div class="header-user">
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon>
            <caret-bottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">{{ $t('common.home') }}</el-dropdown-item>
            <el-dropdown-item command="loginout">{{ $t('common.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { Session } from '/@/utils/storage'
import Cookies from 'js-cookie'

export default {
  setup() {
    const router = useRouter()
    const username = Cookies.get('userName')
    const handleCommand = (command: string) => {
      if (command == 'loginout') {
        Session.clear()
        Cookies.remove('userName')
        router.push('/login')
      } else if (command == 'home') {
        router.push('/')
      }
    }
    return {
      username,
      handleCommand
    }
  }
}
</script>
<style lang="scss">
.header-right {
  float: right;
  padding: 20px;
}
</style>
