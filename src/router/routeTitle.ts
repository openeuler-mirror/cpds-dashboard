export const nameToTitle: Record<string, any> = {
	monitorWarn: { title: '监控警告', icon: 'weiguanlian' },
	clusterStatus: { title: '集群状态', icon: 'gaishu' },
	nodeHealth: { title: '节点健康', icon: 'jiqun' },
	awrnManagement: { title: '警告管理', icon: 'jiedian' },
	healthDiagnosis: { title: '健康诊断', icon: 'cunchuchi' },
	diagnosticResults: { title: '诊断结果', icon: 'shijian' },
	dataRetrieval: { title: '原始数据检索', icon: 'renwuliebiao' },
	noCluster: { title: '未关联集群', icon: 'weiguanlian' },
	home: { title: '概览', icon: 'gaishu' },
} as const;
