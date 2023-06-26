<template>
    <div style="display: flex;align-items: center;padding: 10px;background:#5c8eec; border-radius: 5px;margin: 5px 0;">
        <div class="circle">
            <el-progress stroke-width="4" :width="40" :height="40" :text-inside="true" type="circle" :percentage="usageNum"
                color="#a2bbea" />
        </div>
        <div style="margin-left: 30px;color: azure;margin: 0 auto;">
            <table>
                <tbody>
                    <tr>
                        <td>{{ props.name }} {{ props.unit }}</td>
                    </tr>
                    <tr>
                        <td>{{ used }}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from 'vue';
const props = defineProps<{
    unit: string
    name: string
    data: any
}>()

const usageNum = computed(() => {

    return (props.data?.usage * 100)

})
const used = computed(() => {
    if (props.name === 'CPU') {
        return props.data?.used_core.toFixed(1) + '/' + props.data?.total_core?.toFixed(1);
    } else {
        return (props.data?.used_bytes / Math.pow(1024, 3)).toFixed(1) + '/' + (props.data?.total_bytes / Math.pow(1024, 3)).toFixed(1)
    }


})
</script>

<style scoped>
tr {
    height: 20px;
}
</style>