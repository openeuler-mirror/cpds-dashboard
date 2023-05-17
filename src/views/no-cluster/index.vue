<template>
	<div class="wrap">
		<el-alert type="warning" :closable="false">
			管理平台尚未连接存储集群，请<el-link type="primary" @click="addCluster">添加</el-link>！
		</el-alert>
	</div>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

const { proxy } = <any>getCurrentInstance();
const addCluster = () => {
	proxy.mittBus.emit('add-cluster');
};
</script>
<style scoped lang="scss">
.wrap {
    padding: 15px;
    :deep(.el-alert){
        .el-alert__description{
            font-size: 14px;
            display: flex;
            align-items: center;
            margin: 0;
        }
    }
}
</style>