<template>
  <el-form size="large" :model="form" class="login-content-form">
    <el-form-item class="login-animation1">
      <el-input
        type="text"
        :placeholder="$t('login.UserName Placeholder')"
        v-model="form.userName"
        clearable
        autocomplete="off"
      >
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2">
      <el-input
        type="password"
        :placeholder="$t('login.Password Placeholder')"
        v-model="form.password"
        autocomplete="off"
        show-password
        clearable
      >
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation3">
      <el-button type="primary" @click="onSignIn" class="login-content-submit">
        {{ $t('login.SignIn') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Session } from '/@/utils/storage'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { i18n } from '/@/i18n'
import { useUserStore } from '/@/store/userInfo'

const user = useUserStore()
const form = reactive({
  userName: 'admin',
  password: '1234'
})

// Login
const onSignIn = async () => {
  // Store token to browser cache
  Session.set('token', Math.random().toString(36).substr(0))
  user.updateUserInfo({ userName: form.userName, roles: ['admin'], authBtnList: [] })
  signInSuccess()
}

const route = useRoute()
const router = useRouter()
// Jump after successful login
const signInSuccess = () => {
  if (route.query?.redirect) {
    // Jump to homepage
    router.push({
      path: <string>route.query?.redirect,
      query:
        Object.keys(<string>route.query?.params).length > 0
          ? JSON.parse(<string>route.query?.params)
          : ''
    })
  } else {
    router.push('/')
  }
  // Login Success
  ElMessage.success(i18n.global.t('login.Login Success'))
}
</script>

<style scoped lang="scss">
.login-content-form {
  margin-top: 40px;

  .login-animation1,
  .login-animation2,
  .login-animation3 {
    margin: 50px auto;
    width: 80%;
  }

  .login-content-submit {
    width: 100%;
    border-radius: 50px;
  }
}
</style>
