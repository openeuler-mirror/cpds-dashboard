<template>
    <div style="display: flex;align-items: center;padding: 10px;background:#5c8eec; border-radius: 5px;margin: 5px 0;">
        <div class="circle" style="margin-left: 30px;">
            <el-progress stroke-width="4" :width="40" :height="40" :text-inside="true" type="circle" :percentage="usageNum"
                color="#a2bbea" />
        </div>
        <div style="margin-left: 30px;color: azure; margin-left: 50px;">
            <table style="font-size: 20px;">
                <tr>
                    <td>{{ usageNum.toFixed(0) }}%</td>
                    <td>{{ usedNum }} {{ props.unit }}</td>
                    <td>{{ totalNum }} {{ props.unit }}</td>
                </tr>
                <tr>
                    <td>{{ props.name }}</td>
                    <td>{{ props.name }}使用量</td>
                    <td>{{ props.name }}总量</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const props = defineProps<{
    unit: string
    name: string
    data: any
}>()
const usageNum = computed(() => {
    return (props.data?.usage * 100)
})
const usedNum = computed(() => {
    if (props.name === 'CPU') {
        return (props.data?.used_core).toFixed(1)
    } else {
        return (props.data?.used_bytes / Math.pow(1024, 3)).toFixed(1)
    }

})
const totalNum = computed(() => {
    if (props.name === 'CPU') {
        return (props.data?.total_core).toFixed(1)
    } else {
        return (props.data?.total_bytes / Math.pow(1024, 3)).toFixed(1)
    }
})


</script>

<style scoped>
table {
    width: 100%;


}

td {
    /* vertical-align: middle; */
    width: 150px;
}

tr {
    width: 100%;
    height: 30px;
}
</style>