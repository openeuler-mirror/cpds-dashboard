<template>
    <div style="margin-bottom: 20px;">
        <el-card shadow="never">
            <div style="font-size: 25px;">{{ title }}</div>
            <el-card style="margin-top: 20px;">{{ desc }}</el-card>
        </el-card>
    </div>
</template>

<script lang="ts" setup>


const props = defineProps<{
    title?: string;
    desc?: string;
}>();

</script>

<style lang="scss" scoped>
.description-wrap {
    :deep(.el-card__body) {
        display: flex;
        align-items: center;
    }
}
</style>