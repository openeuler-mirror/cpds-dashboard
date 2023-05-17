<template>
	<el-container class="layout-container flex-center layout-backtop">
		<Header />
		<Main />
		<el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script lang="ts">
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';

export default {
	name: 'layoutTransverse',
	// eslint-disable-next-line vue/no-reserved-component-names
	components: { Header, Main },
};
</script>
