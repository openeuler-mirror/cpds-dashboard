<template>
  <div class="login-container">
    <div class="login-icon-group-title">
      <div class="login-icon-group-title-text">
        {{ $t('common.Container Problem Detect System') }}
      </div>
    </div>
    <div class="login-content">
      <div class="login-content-main">
        <h4 class="login-content-title ml15">{{ $t('login.Welcome') }}</h4>
        <Account />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Account from '/@/views/login/component/account.vue'
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/login-bg.png');
  background-size: cover;

  .login-icon-group-title {
    position: absolute;
    top: 50px;
    left: 80px;
    display: flex;
    align-items: center;
    font-size: 25px;
    color: var(--el-color-white);

    &-text {
      padding-left: 15px;
    }
  }

  .login-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    padding: 20px;
    margin: auto;
    width: 400px;
    height: 410px;
    background-color: var(--el-color-white);
    border-radius: 5px;

    .login-content-main {
      margin: 0 auto;
      width: 90%;

      .login-content-title {
        position: relative;
        z-index: 5;
        margin: 15px;
        font-size: 30px;
        text-align: center;
        white-space: nowrap;
        color: var(--el-text-color-primary);
        transition: all 0.3s ease;
        font-weight: 500;
        letter-spacing: 4px;
      }
    }
  }
}
</style>
