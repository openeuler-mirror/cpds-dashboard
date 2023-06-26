<template>
    <div>
        <div class="node-health" v-show="!visiable">
            <h2>节点状态</h2>
            <el-card class="table-wrap" shadow="never">
                <el-table :data="nodeList" style="width: 100% ;"
                    :row-style="{ height: '50px', background: '#f8f8f8', padding: '0' }">
                    <el-table-column label="节点" width="180">
                        <template #default="{ row }">
                            <div class="cell" style="height: 50px;">
                                <span class="iconfont icon-fuwuqiguanli" style="font-size: 40px;"></span>
                                <div style="margin-left: 5px;">
                                    <div>
                                        <el-button link size="small" type="primary"
                                            @click="openDetails(row.instance.split(':')[0])">
                                            {{ row.instance.split(':')[0] }}
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="运行容器数" width="180">
                        <template #default="{ row }">
                            <div class="cell">
                                {{ row.container.running }}/{{ row.container.total }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="CPU用量">
                        <template #default="{ row }">
                            <div class="cell">
                                <div>
                                    <div>{{ getPercent(row.cpu.usage) }}</div>
                                    <div style="color: #bfbfbf;">{{ getUsed('cpu', row.cpu.used_core, row.cpu.total_core) }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="内存用量">
                        <template #default="{ row }">
                            <div class="cell">
                                <div>
                                    <div>{{ getPercent(row.memory.usage) }}</div>
                                    <div style="color: #bfbfbf;">{{ getUsed('memory',
                                        row.memory.used_bytes, row.memory.total_bytes) }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="磁盘用量">
                        <template #default="{ row }">
                            <div class="cell">
                                <div>
                                    <div>{{ getPercent(row.disk.usage) }}</div>
                                    <div style="color: #bfbfbf;">{{ getUsed('disk', row.disk.used_bytes,
                                        row.disk.total_bytes)
                                    }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="endIndex < targets.length" style="width: 100%;background: #f8f8f8;">
                    <h3 style="text-align: center;line-height: 3;letter-spacing: 5px;cursor: pointer;" @click="loadMore">
                        加载更多</h3>
                </div>
                <div v-else-if="targets.length != 0" style="width: 100%;background: #f8f8f8;">
                    <h3 style="text-align: center;line-height: 3;letter-spacing: 5px;">暂无更多数据</h3>
                </div>
            </el-card>
        </div>

        <div class="cluster-status" v-if="visiable">
            <el-tabs v-model="activeName" type="card" class="tab" @tab-click="handleClick">
                <el-button type="primary" style="font-size: 15px;" @click="returnList">返回主页</el-button>
                <el-tab-pane label="概览" name="概览" lazy>
                    <div class="main">
                        <overview></overview>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="物理资源监控" name="物理资源监控" lazy><el-card class="box-card">
                        <physicalResources></physicalResources>
                    </el-card></el-tab-pane>
                <el-tab-pane label="容器健康监控" name="容器健康监控" lazy><el-card class="box-card">
                        <containHealth></containHealth>
                    </el-card></el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, provide, onMounted, reactive, toRefs, computed, watch } from 'vue';
const containHealth = defineAsyncComponent(() => import('./container-health.vue'));
const physicalResources = defineAsyncComponent(() => import('./physical-resources.vue'));
const overview = defineAsyncComponent(() => import('./overview.vue'));
import { useMonitorApi } from '/@/api/monitor-warn/index'
import { InstanceListInterface } from '../../interface/index'
const activeName = ref('');
provide('activeName', activeName);

const visiable = ref(false)
const handleClick = (tab: 'TabsPaneContext', event: Event) => { };
const alarmModule = ref('');
const address = ref()
const endIndex = ref(5)
const state = reactive<InstanceListInterface>({
    nodeList: []
})
const { nodeList } = toRefs(state)
const usage = reactive<{
    overViewInfo: {
        cpu: {
            usage: number;
            used_core: number;
            total_core: number;
        };
        memory: {
            usage: number;
            used_bytes: number;
            total_bytes: number;
        };
        disk: {
            usage: number;
            used_bytes: number;
            total_bytes: number;
        };
    }

}>({
    overViewInfo: {
        cpu: {
            usage: 0,
            used_core: 0,
            total_core: 0
        },
        memory: {
            usage: 0,
            used_bytes: 0,
            total_bytes: 0
        },
        disk: {
            usage: 0,
            used_bytes: 0,
            total_bytes: 0
        }
    }
})
const { overViewInfo } = toRefs(usage)
const targets = ref([])
provide('address', address);
const openDetails = (instance: string) => {
    activeName.value = '概览'
    address.value = instance
    visiable.value = true
}
const getPercent = computed(() => (usage: number) => {
    return (usage * 100).toFixed(0) + '%'
})
const getUsed = computed(() => (type: string, used: number, total: number) => {
    switch (type) {
        case 'cpu':
            return used.toFixed(2) + '/' + total.toFixed(2) + ' core';
        case 'memory':
            return (used / Math.pow(1024, 3)).toFixed(2) + '/' + (total / Math.pow(1024, 3)).toFixed(2) + ' Gi';
        case 'disk':
            return (used / Math.pow(1024, 3)).toFixed(2) + '/' + (total / Math.pow(1024, 3)).toFixed(2) + ' GB';
    }
})
const returnList = () => {
    activeName.value = ''
    visiable.value = false
}
//Obtain the instance of a node
const getTargets = async () => {
    useMonitorApi().getInstance().then(async (res: any) => {
        targets.value = res.data.targets.map((item: any) =>
            item.instance.split(':')[0]
        )
        if (targets.value.length > 5) {
            getTableData(targets.value.slice(0, 5))
        } else {
            getTableData(targets.value.slice(0, targets.value.length))
        }
    })
}
const loadMore = () => {
    let startIndex = nodeList.value.length
    endIndex.value = nodeList.value.length + 5
    if (endIndex.value > targets.value.length) {
        endIndex.value = targets.value.length
    }
    getTableData(targets.value.slice(startIndex, endIndex.value))
}
//Obtain node list data
const getTableData = async (ids: any) => {
    await Promise.all(ids.map((instance: string) => useMonitorApi().getNodeList({ instance: instance }))).then(res => {
        res.map(item => {
            nodeList.value.push(item.data[0])
        })
    })
}
onMounted(async () => {
    await getTargets()
})
//Transfer data to overview
const emits = defineEmits(['update:total', 'update:upNum', 'update:overViewInfo']);
const total = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.container.total
    }, 0)
})
const upNum = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.container.running
    }, 0)
})
const cpuUsage = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cpu.usage
    }, 0)
})
const cpuUsed = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cpu.used_core
    }, 0)
})
const cpuTotal = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cpu.total_core
    }, 0)
})
const memoryUsage = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.memory.usage
    }, 0)
})
const memoryUsed = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.memory.used_bytes
    }, 0)
})
const memoryTotal = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.memory.total_bytes
    }, 0)
})
const diskUsage = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.disk.usage
    }, 0)
})
const diskUsed = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.disk.used_bytes
    }, 0)
})
const diskTotal = computed(() => {
    return nodeList.value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.disk.total_bytes
    }, 0)
})

watch(nodeList.value, () => {
    overViewInfo.value.cpu = {
        usage: cpuUsage.value,
        used_core: cpuUsed.value,
        total_core: cpuTotal.value
    }
    overViewInfo.value.memory = {
        usage: memoryUsage.value,
        used_bytes: memoryUsed.value,
        total_bytes: memoryTotal.value
    }
    overViewInfo.value.disk = {
        usage: diskUsage.value,
        used_bytes: diskUsed.value,
        total_bytes: diskTotal.value
    }
    emits('update:total', total)
    emits('update:upNum', upNum)
    emits('update:overViewInfo', overViewInfo)
})

</script>

<style scoped>
.cluster-status {
    display: flex;
    height: 100vh;
    /* flex-direction: column; */
    padding: 5px;
    box-sizing: border-box;
}

.main {
    width: 100%;
    background-color: #ffffff;
}

.tab {
    width: 100%;
}

.node-health {
    margin-top: 30px;
}

::v-deep .el-table__body {
    -webkit-border-vertical-spacing: 15px;
}

::v-deep .el-table::before {
    height: 0;
}

::v-deep .el-table__row>td {
    border: none;
}

.cell {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center
}
</style>


