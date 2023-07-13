<template>
    <div>
        <div style="width: 100%;height: 100%;">
            <Line :data="state1.data"></Line>
        </div>
        <div class="table">
            <el-table :data="tableData()" style="width: 80%" element-loading-text="数据加载中..." v-loading="tableLoading">
                <el-table-column prop="name" :label="tableData()[0].time" />
                <el-table-column prop="value" label="value" align="center" width="100%" />
            </el-table>

        </div>
        <div class="example-pagination-block">

            <el-pagination background layout="prev, pager, next ,total,sizes" :total="state.total"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 30, 50]"
                :page-size="state.limit" />
        </div>
    </div>
</template>

<script lang="ts" setup>

import { reactive, watch, ref, defineAsyncComponent, toRefs, inject } from 'vue';
import { formatDate } from '/@/utils/formatTime';
import { useDataRetrievalApi } from '/@/api/data-retrieval/index';
import { dayjs } from 'element-plus';
import { Local } from '/@/utils/storage';
const Line = defineAsyncComponent(() => import('/@/components/echarts/Line.vue'))

const state1 = reactive<{
    data: {
        xData: any[],
        seriesData: any,
        yData: any[],
        subhealth_thresholds: number,
        fault_thresholds: number
    }
}>({
    data: {
        xData: [],
        seriesData: [],
        yData: [],
        subhealth_thresholds: 0,
        fault_thresholds: 0
    }
})

const tableLoading = ref(false);
const rawDataList = ref([{ name: '', value: null, time: '' }])
//Parameters used in the table
const state = reactive({
    page: 1,
    limit: 5,
    total: 0
});
//Frontend restricted pagination (tableData is the current display page table)
const tableData = () => {
    return rawDataList.value.filter(
        (item, index) =>
            index < state.page * state.limit &&
            index >= state.limit * (state.page - 1)
    );
};

//Change page number
const handleCurrentChange = (e: any) => {
    state.page = e;
};
//Change page limit
const handleSizeChange = (e: any) => {
    state.limit = e;
    state.page = 1
}
//define events and pass them to parent components
const emits = defineEmits(['update:value', 'refreshHistory']);
const close = () => {
    emits('update:value', false);
}
const props = defineProps<{ expression: string }>()
//use inject to obtain the value passed by the parent component
const datetimeRange = inject('datetimeRange', ref());
const defaultdateRange = inject('defaultdateRange', ref());
defineExpose({
    close
});
const regex = /(\{[^{}]*\})(?!.*\{[^{}]*\})/;
//Get original data
const getRawData = (query: string) => {
    const params = {
        query: encodeURIComponent(query),
        start_time: datetimeRange.value ? new Date(datetimeRange.value[0]).getTime() / 1000 : new Date(dayjs().subtract(defaultdateRange.value[0], defaultdateRange.value[1]).format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
        end_time: datetimeRange.value ? new Date(datetimeRange.value[1]).getTime() / 1000 : new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')).getTime() / 1000,
    }
    const step = Math.ceil((params.end_time - params.start_time) / 25)
    Object.assign(params, { step: step })
    useDataRetrievalApi().getRawData(params).then((res) => {
        rawDataList.value = res.data.result.map((item: any) => {
            const value = item.values[item.values.length - 1][1]
            const time = formatDate(new
                Date(item.values[item.values.length - 1][0] * 1000), 'YYYY-mm-dd HH:MM:SS')
            if (!item.metric) return { name: '{}', value: value, time: time }
            return { name: `${query}${JSON.stringify(item.metric)}`, value: value, time: time }
        })
        state.total = rawDataList.value.length
        state1.data.xData = Array.from(new Map(res.data.result[0].values).keys())
        state1.data.seriesData = res.data.result.map((item: any, index: number) => {
            let matches = rawDataList.value[index].name.match(regex)
            let name
            if (matches && matches.length > 0) {
                name = matches[1]
            } else {
                name = rawDataList.value[index].name
            }
            return {
                name: name,
                data: Array.from(new Map(item.values).values()),
                type: 'line',
                smooth: true,
                areaStyle: {
                    opacity: 0.4
                },
            }
        })
        //Obtain Historical Query Data
        const history = Local.get('history') || []
        if (history.length === 10) {
            history.pop()
        }
        //Delete the first data when the history is greater than 10
        if (history.length > 0 && history.some((item: any) => item.expression === query)) {
            history.forEach((item: any) => {
                if (item.expression === query) {
                    item.time = `${formatDate(new
                        Date(params.start_time * 1000), 'YYYY-mm-dd HH:MM:SS')} ~ ${formatDate(new
                            Date(params.end_time * 1000), 'YYYY-mm-dd HH:MM:SS')}`
                }
            });
        } else {
            history.unshift({
                expression: query, time: `${formatDate(new
                    Date(params.start_time * 1000), 'YYYY-mm-dd HH:MM:SS')} ~ ${formatDate(new
                        Date(params.end_time * 1000), 'YYYY-mm-dd HH:MM:SS')}`
            })
        }
        //Save to browser local storage
        Local.set('history', history)
        //Pass refresh history event to parent component
        emits('refreshHistory');
    }).finally(() => {

    })
}


watch(() => props.expression, () => {
    getRawData(props.expression)
}, { immediate: true })


</script>

<style scoped>
.table {
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
</style>