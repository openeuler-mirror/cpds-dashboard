<template>
  <img :class="{ 'collapse-logo': isCollapse, 'uncollapse-logo': !isCollapse }" />
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
.collapse-logo {
  margin: 15px;
  width: 50%;
  height: 50%;
  background: url('/@/assets/cpds-mini-icon.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.uncollapse-logo {
  margin: 15px;
  width: 80%;
  height: 80%;
  background: url('/@/assets/cpds-icon.png');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
