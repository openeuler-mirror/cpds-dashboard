<template>
    <div :style="{ height: containerHeight }" class="chart" v-loading="resizeLoading" ref="chartRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef, watch, onUnmounted, computed } from 'vue';
import * as echarts from 'echarts';
import { formatDate } from '/@/utils/formatTime';

const props = withDefaults(defineProps<{
    data: {
        xData: any[],
        seriesData: any[],
        subhealth_thresholds?: number,
        fault_thresholds?: number,
        flag?: boolean
    }
    yUnit?: string
    title?: string
}>(), {
    yUnit: ''
})

const myChart = shallowRef();
const chartRef = ref<HTMLDivElement>();
const containerHeight = computed(() => {
    return 500 + props.data.seriesData.length * 20 + 'px'
})
const containerHeight1 = computed(() => {
    return 40 + props.data.seriesData.length * 20 + 'px'
})
const initChart = () => {
    myChart.value = echarts.init(chartRef.value as HTMLDivElement)
    const option = {
        title: {
            text: props.title
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: (params: any) => {
                if (params.componentType === "series") {
                    let str = `<div><p>${formatDate(new Date(params.value[0] * 1000), 'mm-dd HH:MM:SS')}</p>`;
                    let value = null
                    let yUnit = props.yUnit
                    value = params.value[1]
                    if (value === undefined) return
                    if (props.yUnit === '%') {
                        value = (value * 100).toFixed(2)
                    }
                    if (props.yUnit === 'KB/s') {
                        if (value >= 1024 * 1024 * 1024) {
                            value = (value / 1024 / 1024 / 1024).toFixed(2);
                            yUnit = 'GB/s'
                        } else if (value >= 1024 * 1024) {
                            value = (value / 1024 / 1024).toFixed(2);
                            yUnit = 'MB/s'
                        } else {
                            value = (value / 1024).toFixed(2)
                        }
                    }
                    str += `<p style="display:flex;justify-content:space-between;align-items:center;">
										<div>
											<span style="display:inline-block;max-width: 500px;word-break: break-all;white-space: normal;">
												<span style="display:inline-block;width:10px;height:10px;border-radius:10px;background:${params.color};margin-right:5px;"></span>
												${params.seriesName}
												<span style="font-weight:bold;">${value} ${yUnit}</span>
											</span>
										</div>
										
									</p>`


                    str += '</div>'
                    return str
                }
            }
        },
        legend: {
            padding: 6,
            itemGap: 6,
            itemHeight: 14,
            show: true,
            top: 'top',
        },
        grid: {
            top: containerHeight1.value
        },
        xAxis: {
            type: 'value',
            min: props.data.flag ? props.data.xData[0] : null as any,
            max: props.data.flag ? props.data.xData[props.data.xData.length - 1] : null as any,
            axisLabel: {
                formatter: function (value: any, index: any) {
                    return formatDate(new Date(value * 1000), 'mm-dd HH:MM:SS')
                }
            },
            axisTick: {
                alignWithLabel: true
            },
            splitLine: {
                show: false
            }

        },
        yAxis: {
            type: 'value',
            min: null as any,
            max: null as any,
            axisLine: {
                onZero: false
            },
            axisLabel: {
                formatter: function (value: any) {
                    let yUnit = props.yUnit;
                    if (props.yUnit === '%' && value <= 1) {
                        value = (value * 100).toFixed(1)
                    }
                    if (props.yUnit === 'KB/s') {
                        if (value >= 1024 * 1024 * 1024) {
                            value = (value / 1024 / 1024 / 1024).toFixed(2);
                            yUnit = 'GB/s'
                        } else if (value >= 1024 * 1024) {
                            value = (value / 1024 / 1024).toFixed(2);
                            yUnit = 'MB/s'
                        } else {
                            value = (value / 1024).toFixed(2)
                        }
                    }
                    return value + yUnit
                }
            }
        },
        series: props.data.seriesData

    };
    myChart.value.on('legendselectchanged', function (obj: any) {
        const legendData = Object.keys(obj.selected);
        const selectedObj = legendData.filter(item => obj.selected[item]);
        const updatedOption = {
            legend: {
                selected: <any>{},
            },
        };
        legendData.forEach((key) => {
            if (obj.name === key) {
                updatedOption.legend.selected[obj.name] = true;
            } else if (selectedObj.length === 0) {
                updatedOption.legend.selected[key] = true;
            } else {
                updatedOption.legend.selected[key] = false;
            }
        })
        myChart.value.setOption(updatedOption);
    });
    if (!props.data.flag) {
        option.xAxis.type = 'time'
        option.xAxis.min = 0;
        option.xAxis.axisLabel = {
            formatter: function (value: any, index: any) {
                let remainder = index % 1;
                if (remainder === 0) {
                    return `{MM}-{dd} {HH}:{mm}`;
                } else {
                    return '';
                }
            }
        }
        option.xAxis.max = new Date().getTime();
        option.yAxis.min = 0;
        option.yAxis.max = 100;
    }
    myChart.value.setOption(option);

};
const resize = () => {
    myChart.value.resize({
        animation: {
            duration: 200,
            easing: 'linear'
        }
    });
};
const resizeLoading = ref(false);

onMounted(() => {
    initChart();
    window.addEventListener('resize', resize);

});
watch(() => props.data, () => {
    if (!chartRef.value) return
    resizeLoading.value = true;
    setTimeout(() => {
        resize();
        resizeLoading.value = false;
    }, 500);
    initChart();
}, { immediate: true })
watch(props.data, () => {
    if (!chartRef.value) return
    resizeLoading.value = true;
    setTimeout(() => {
        resize();
        resizeLoading.value = false;
    }, 500);
    initChart();
}, { immediate: true })

onUnmounted(() => {
    window.removeEventListener('resize', resize);
});

</script>



<style scoped>
.chart {
    width: 100%;
}
</style>
