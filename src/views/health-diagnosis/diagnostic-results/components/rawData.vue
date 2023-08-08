<template>
    <div>
        <div style="width: 100%;height: 100%">
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
                :page-size="state.limit" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useHealthApi } from '/@/api/health-diagnosis/index';
import { reactive, watch, ref, defineAsyncComponent, toRefs, computed } from 'vue';
import { ResultInterface } from '../../interface/index'
import { formatDate } from '/@/utils/formatTime';
import { useRuleApi } from '/@/api/rule-management/index';
import { ElMessage, dayjs } from 'element-plus';
const Line = defineAsyncComponent(() => import('/@/components/echarts/retrievalLine.vue'))

const state1 = reactive<{
    data: {
        xData: any[],
        seriesData: any,
        subhealth_thresholds: number,
        fault_thresholds: number
        flag: boolean
    }
}>({
    data: {
        xData: [],
        seriesData: [],
        subhealth_thresholds: 0,
        fault_thresholds: 0,
        flag: false
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
const regex = /(\{[^{}]*\})(?!.*\{[^{}]*\})/;
//Change page number
const handleCurrentChange = (e: any) => {
    state.page = e;
};
//Change page limit
const handleSizeChange = (e: any) => {
    state.limit = e;
    state.page = 1
}

const emits = defineEmits(['update:value']);
const close = () => {
    emits('update:value', false);
}
const props = defineProps<{ rawData: ResultInterface }>()
defineExpose({
    close
});

const getCondition = (pair: string, condition: string, thresholds: string) => {
    if (condition === "==") return pair == thresholds
    if (condition === "!=") return pair != thresholds
    if (condition === ">") return pair > thresholds
    if (condition === "<") return pair < thresholds
}
const getRawData = (query: string, condition: string, thresholds: any) => {
    useHealthApi().getRawData({ query: encodeURIComponent(query), start_time: dayjs().subtract(10, 'minutes').unix(), end_time: dayjs().unix(), step: 10 }).then((res) => {
        const result = res.data.result.filter((item: any) => {
            return item.values.some((pair: any) => {
                return getCondition(pair[1], condition, thresholds)
            })
        })
        rawDataList.value = result.map((item: any) => {
            const value = item.values[item.values.length - 1][1]
            const time = formatDate(new
                Date(item.values[item.values.length - 1][0] * 1000), 'YYYY-mm-dd HH:MM:SS')
            if (!item.metric) return { name: '{}', value: value, time: time }
            return { name: `${query}${JSON.stringify(item.metric)}`, value: value, time: time }
        })
        let start = dayjs().subtract(10, 'minutes').unix()
        const getResult = ((item: any) => {
            let resultData = []
            let end = item.values[0][0] - 10
            for (let i = start; i <= end; i = i + 10) {
                resultData.push(i)
            }
            resultData = resultData.map((value: any) => {
                return [value, null]
            })
            return [...resultData, ...result[0].values]
        })
        let maxLengthValues = result[0];
        result.forEach((item: any) => {
            if (item.values.length > maxLengthValues.values.length) {
                maxLengthValues.values = item.values;
            }
        });
        state.total = rawDataList.value.length
        state1.data.flag = result.length > 0
        state1.data.xData = Array.from(new Map(getResult(maxLengthValues)).keys())
        state1.data.seriesData = result.map((item: any, index: number) => {
            let matches = rawDataList.value[index].name.match(regex)
            let name
            if (matches && matches.length > 0) {
                name = matches[1]
            } else {
                name = rawDataList.value[index].name
            }
            return {
                name: name,
                data: Array.from(new Map(getResult(item))),
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
            let condition
            let thresholds
            if (ruleData.value.fault_condition_type) {
                condition = ruleData.value.fault_condition_type
                thresholds = ruleData.value.fault_thresholds
            } else {
                condition = ruleData.value.subhealth_condition_type
                thresholds = ruleData.value.subhealth_thresholds
            }
            getRawData(ruleData.value.expression, condition, thresholds)
        } else {
            ElMessage.warning('对应规则被删除，无法查看')
        }

    }).catch(error => {
        let req = error.response
        if (req.data.code === 4001) {
            ElMessage.warning('该表达式查询结果为空')
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