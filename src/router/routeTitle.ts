export const nameToTitle: Record<string, any> = {
	monitorWarn: { title: '监控警告', icon: 'jiankong' },
	clusterStatus: { title: '集群状态', icon: 'jiqun' },
	nodeHealth: { title: '节点健康', icon: 'jiedian' },
	awrnManagement: { title: '警告管理', icon: 'jichuguanli' },
	healthDiagnosis: { title: '健康诊断', icon: 'jiankangzhenduan' },
	diagnosticResults: { title: '诊断结果', icon: 'jieguo' },
	dataRetrieval: { title: '原始数据检索', icon: 'jieguojiancha' },
	noCluster: { title: '未关联集群', icon: 'weiguanlian' },
	home: { title: '概览', icon: 'guizeguanli' },
	rlueManagement: { title: '规则管理', icon: 'guizeguanli' },
	ruleView: { title: '查看规则', icon: 'chakan' },
} as const;
