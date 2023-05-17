<template>
	<el-form size="large" class="login-content-form" @keyup.enter="onSignIn">
		<el-form-item class="login-animation1">
			<el-input type="text" placeholder="请输入用户名" v-model="state.ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-input type="password" placeholder="请输入密码" v-model="state.ruleForm.password" autocomplete="off" show-password clearable>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="state.loading.signIn">
				<span>登 录</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import { Session } from '/@/utils/storage';
interface LoginState {
	ruleForm: {
		username: string;
		password: string;
	};
	loading: {
		signIn: boolean;
	};
}

const route = useRoute();
const router = useRouter();
const state = reactive<LoginState>({
	ruleForm: {
		username: '',
		password: '',
	},
	loading: {
		signIn: false,
	},
});
// Login
const onSignIn = async () => {
	state.loading.signIn = true;
	Session.set('authorization', 'admin');
	Session.set('refreshtoken', 'admin');
	sessionStorage.setItem('clusterVip', 'true');
	Cookies.set('userName', 'admin');
	await initFrontEndControlRoutes();
	signInSuccess();
};
// Jump after successful login
const signInSuccess = () => {
	if (route.query?.redirect) {
		// Jump to homepage
		router.push({
			path: <string>route.query?.redirect,
			query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
		});
	} else {
		// If it is a copy and paste path, other than the home page/login page, it will be redirected to the corresponding path after successful login
		router.push('/');
	}
	// Close loading
	state.loading.signIn = true;
	// Login Success Time Greeting
	ElMessage.success(`${formatAxis(new Date())}，登录成功`);
	// Add loading to prevent temporary blank when entering the interface for the first time
	NextLoading.start();
};
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 40px;

	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
			margin-bottom: 30px;
		}
	}

	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;

		&:hover {
			color: #909399;
		}
	}

	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 20px;
	}

	/* Change Google Chrome Auto Fill background color and text color */
	:deep input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
		-webkit-text-fill-color: var(--el-text-color-primary) !important;
	}
}
</style>
