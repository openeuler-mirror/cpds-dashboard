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
                    <td v-if="props.name === 'CPU'">{{ usedNum }}</td>
                    <td v-if="props.name != 'CPU'">{{ usedNum }}</td>
                    <td v-if="props.name != 'CPU'">{{ totalNum }}</td>
                </tr>
                <tr>
                    <td>{{ props.name }}</td>
                    <td v-if="props.name === 'CPU'">集群CPU总核数</td>
                    <td v-if="props.name != 'CPU'">{{ props.name }}使用量</td>
                    <td v-if="props.name != 'CPU'">{{ props.name }}总量</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const props = defineProps<{
    name: string
    data: any
}>()
//process computing
const usageNum = computed(() => {
    return (props.data?.usage * 100)
})
//usage calculation
const usedNum = computed(() => {
    if (props.name === 'CPU') {
        return (props.data?.number_cores) + ' cores'
    } else {
        if (props.data?.used_bytes > 1024 * 1024 * 1024 * 1024) return (props.data?.used_bytes / Math.pow(1024, 3)).toFixed(1) + ' TB'
        return (props.data?.used_bytes / Math.pow(1024, 3)).toFixed(1) + ' GB'
    }

})
//total calculation
const totalNum = computed(() => {
    if (props.name === 'CPU') {
        return (props.data?.total_core).toFixed(1) + ' cores'
    } else {
        if (props.data?.used_bytes > 1024 * 1024 * 1024 * 1024) return (props.data?.used_bytes / Math.pow(1024, 3)).toFixed(1) + ' TB'
        return (props.data?.total_bytes / Math.pow(1024, 3)).toFixed(1) + ' GB'
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