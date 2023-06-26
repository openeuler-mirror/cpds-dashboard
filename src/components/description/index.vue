<template>
    <div style="margin-bottom: 20px;">
        <el-card shadow="never">
            <el-card style="margin-top: 20px;">{{ desc }}</el-card>
            <div style="margin-top: 40px;">{{ desc }}</div>
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