<template>
	<div class="login-container">
		<div class="login-icon-group">
			<div class="login-icon-group-title">
				<!-- Icon position  -->
				<!-- <img /> -->
				<div class="login-icon-group-title-text font25">{{ getThemeConfig.globalViceTitle }}</div>
			</div>
		</div>
		<div class="login-content">
			<div class="login-content-main">
				<h4 class="login-content-title ml15">欢迎登录</h4>
				<Account />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { NextLoading } from '/@/utils/loading';
import Account from '/@/views/login/component/account.vue';

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
// Get layout configuration information
const getThemeConfig = computed(() => {
	return themeConfig.value;
});
onMounted(() => {
	NextLoading.done();
});
</script>

<style scoped lang="scss">
.login-container {
	width: 100%;
	height: 100%;
	position: relative;
	background-image: url('/@/assets/login-bg.png');
	background-size: cover;
	.login-icon-group {
		width: 100%;
		height: 100%;
		position: relative;
		.login-icon-group-title {
			position: absolute;
			top: 50px;
			left: 80px;
			display: flex;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
			}
			&-text {
				padding-left: 15px;
				color: var(--el-color-white);
			}
		}
	}
	.login-content {
		width: 450px;
		padding: 20px;
		position: absolute;
		top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
		background-color: var(--el-color-white);
		border: 5px solid var(--el-color-primary-light-8);
		border-radius: 5px;
		overflow: hidden;
		z-index: 1;
		height: 410px;
		.login-content-main {
			margin: 0 auto;
			width: 90%;
			.login-content-title {
				color: var(--el-text-color-primary);
				font-weight: 500;
				font-size: 30px;
				text-align: center;
				letter-spacing: 4px;
				margin: 15px;
				white-space: nowrap;
				z-index: 5;
				position: relative;
				transition: all 0.3s ease;
			}
		}
	}
}
</style>
