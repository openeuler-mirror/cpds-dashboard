<template>
    <div style="display: flex;align-items: center;padding: 10px;background:#5c8eec; border-radius: 5px;margin: 5px 0;">
        <div class="circle">
            <el-progress stroke-width="4" :width="40" :height="40" :text-inside="true" type="circle" :percentage="usageNum"
                color="#a2bbea" />
        </div>
        <div style="margin-left: 30px;color: azure;margin: 0 auto;font-size: 20px;">
            <table>
                <tbody>
                    <tr>
                        <td>{{ used }}</td>
                    </tr>
                    <tr>
                        <td>{{ props.name }} {{ unit }}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from 'vue';
const props = defineProps<{
    name: string
    data: any
}>()

const usageNum = computed(() => {

    return (props.data?.usage * 100)

})
const unit = computed(() => {
    if (props.name === 'CPU') {
        return 'core'
    } else {
        if (props.data?.used_bytes > 1024 * 1024 * 1024 * 1024) return 'TB'
        return 'GB'
    }
})
const used = computed(() => {
    if (props.name === 'CPU') {
        return (props.data?.usage * props.data?.number_cores).toFixed(2) + ' / ' + props.data?.number_cores;
    } else {
        if (props.data?.used_bytes > 1024 * 1024 * 1024 * 1024) return (props.data?.used_bytes / Math.pow(1024, 4)).toFixed(1) + '/' + (props.data?.total_bytes / Math.pow(1024, 4)).toFixed(1)
        return (props.data?.used_bytes / Math.pow(1024, 3)).toFixed(1) + '/' + (props.data?.total_bytes / Math.pow(1024, 3)).toFixed(1)
    }


})
</script>

<style scoped>
tr {
    height: 30px;
}
</style>