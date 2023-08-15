<template>
    <div class="chart" v-loading="resizeLoading" style="width: 100%;" ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';
const myChart = shallowRef();
const chartRef = ref<HTMLDivElement>();
const props = defineProps<{
    data: {
        running: number,
        total: number
    }
}>()
const initChart = () => {
    if (myChart.value != null && myChart.value != "" && myChart.value != undefined) {
        echarts.dispose(chartRef.value as HTMLDivElement);
    }
    myChart.value = echarts.init(chartRef.value as HTMLDivElement)
    const option = {

        legend: {
            orient: 'vertical',
            x: 'left',
            y: 'center',
            textStyle: {
                "fontSize": 25
            },
            selectedMode: false
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                silent: true,
                label: {
                    show: true,
                    position: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    formatter: function () {
                        return `${props.data.running}/${props.data.total}`
                    },

                },

                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 0, name: `节点容器个数: ${props.data.total}` },
                    { value: props.data.running, name: `运行中的容器: ${props.data.running}`, itemStyle: { color: '#51c41b' } },
                    { value: props.data.total - props.data.running, name: `停止的容器: ${props.data.total - props.data.running}`, itemStyle: { color: '#f5232d' } },


                ]
            }
        ]
    }
    myChart.value.setOption(option);
}
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
    setTimeout(() => {
        resize();
        resizeLoading.value = false;
    }, 500);
    initChart();

})
onUnmounted(() => {
    window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 400px;
}
</style>