<template>
	<el-card class="description-wrap mb15" shadow="never">
		<SvgIcon v-if="isShowIconSvg" :name="props?.logo" :size="64"></SvgIcon>
		<div class="logo" v-else>
			<img :src="props.logo" :alt="props.title+'logo'">
		</div>
		<div class="info">
			<h3>{{ props.title }}</h3>
			<p>{{ props.desc }}</p>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    logo:string;
    title:string;
    desc:string;
}>();
const isShowIconSvg = computed(() => {
	return props?.logo?.startsWith('iconfont');
});
</script>

<style lang="scss" scoped>
.description-wrap{
    :deep(.el-card__body){
        display: flex;
        align-items: center;
        .logo{
            width: 150px;
            height: 100px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: calc(100% - 115px);
            height: 100px;
            margin-left: 15px;
            overflow-y: auto;
            h3{
                line-height: 30px;
            }
            p{
                line-height: 22px;
            }
        }
    }
}
</style>