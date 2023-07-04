<template>
    <div>
        <div style="width: 100%;height: 100%;">
            <Line :data="state1.data"></Line>
        </div>
        <div class="table">
            <el-table :data="tableData()" style="width: 80%" element-loading-text="数据加载中..." v-loading="tableLoading">
                <el-table-column prop="name" :label="getTime" />
                <el-table-column prop="value" label="value" align="center" width="100%" />
            </el-table>

        </div>
        <div class="example-pagination-block">
            <!-- <div class="example-demonstration">分页</div> -->
            <el-pagination background layout="prev, pager, next ,total,sizes" :total="state.total"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 30, 50]"
                :page-size="5" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useHealthApi } from '/@/api/health-diagnosis/index';
import { reactive, watch, ref, defineAsyncComponent, toRefs, computed } from 'vue';
import { ResultInterface } from '../../interface/index'
import { formatDate } from '/@/utils/formatTime';
import { useRuleApi } from '/@/api/rule-management/index';
import { dayjs } from 'element-plus';
const Line = defineAsyncComponent(() => import('/@/components/echarts/Line.vue'))

const state1 = reactive<{
    data: {
        xData: any[],
        seriesData: any,
        subhealth_thresholds: number,
        fault_thresholds: number
    }
}>({
    data: {
        xData: [],
        seriesData: [],
        subhealth_thresholds: 0,
        fault_thresholds: 0
    }
})

const getruleData = reactive({
    ruleData: {
        expression: '',
        subhealth_condition_type: '',
        fault_condition_type: '',
        subhealth_thresholds: '',
        fault_thresholds: ''
    }
})
const { ruleData } = toRefs(getruleData)
const tableLoading = ref(false);
interface RawInterface {
    name: string,
    value: string | null
    time: string
}
const rawDataList = ref<Array<RawInterface>>([])
const getTime = computed(() => {
    if (!tableData()[0]?.time) return
    return tableData()[0].time
})
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
}

const emits = defineEmits(['update:value']);
const close = () => {
    emits('update:value', false);
}
const props = defineProps<{ rawData: ResultInterface }>()
defineExpose({
    close
});

const getRawData = (query: string) => {
    useHealthApi().getRawData({ query: encodeURIComponent(query), start_time: dayjs().subtract(10, 'minutes').unix(), end_time: dayjs().unix(), step: 10 }).then((res) => {
        rawDataList.value = res.data.result.map((item: any) => {
            const value = item.values[item.values.length - 1][1]
            const time = formatDate(new
                Date(item.values[item.values.length - 1][0] * 1000), 'YYYY-mm-dd HH:MM:SS')
            if (!item.metric) return { name: '{}', value: value, time: time }
            const { job, instance } = item.metric
            return { name: `${query}{instance="${instance}",job="${job}"}`, value: value, time: time }
        })
        state.total = rawDataList.value.length
        state1.data.xData = Array.from(new Map(res.data.result[0].values).keys())
        state1.data.seriesData = res.data.result.map((item: any, index: number) => {
            return {
                name: rawDataList.value[index].name,
                data: Array.from(new Map(item.values).values()),
                type: 'line',
                smooth: true,
                areaStyle: {
                    opacity: 0.4
                },
                markLine: {
                    symbol: ['none', 'none'],
                    width: 1,
                    lineStyle: {
                        width: 0.8,
                        type: 'solid',
                    },
                    data: [
                        {
                            yAxis: ruleData.value.fault_thresholds,
                            lineStyle: {
                                color: 'red'
                            },
                        },
                        {
                            yAxis: ruleData.value.subhealth_thresholds,
                            lineStyle: {
                                color: 'yellow'
                            },
                        },
                    ],
                    label: {
                        show: false,
                        color: 'rgb(91, 155, 213)',
                    },
                },
            }
        })
    }).finally(() => {

    })
}
const getRuleData = (loading: boolean = false, filter: string) => {
    tableLoading.value = loading;
    useRuleApi().getRuleList({ filter: filter }).then((res) => {
        ruleData.value = res.data.records[0]
        if (ruleData.value) {
            getRawData(ruleData.value.expression)
        }

    }).finally(() => {
        tableLoading.value = false;
    })
}

watch(() => props.rawData, () => {
    getRuleData(true, props.rawData.rule_name)
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