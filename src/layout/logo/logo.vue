<template>
  <div
    :class="{ 'logo-style': true, 'collapse-logo': isCollapse, 'uncollapse-logo': !isCollapse }"
  ></div>
</template>

<script lang="ts">
export default {
  name: 'layoutLogo',
  props: {
    isCollapse: Boolean
  }
}
</script>

<style lang="scss">
.logo-style {
  display: inline-block;
  margin: 15px;
}

.collapse-logo {
  width: 50%;
  height: 50%;
  background: url('/@/assets/cpds-mini-icon.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.uncollapse-logo {
  width: 80%;
  height: 80%;
  background: url('/@/assets/cpds-icon.png');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
