/* 
 *  Copyright 2023 CPDS Author
 *  
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  
 *       https://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

export const nameToTitle: Record<string, any> = {
	monitorWarn: { title: '监控告警', icon: 'jiankong' },
	clusterStatus: { title: '集群状态', icon: 'jiqun' },
	nodeHealth: { title: '节点健康', icon: 'jiedian' },
	healthDiagnosis: { title: '健康诊断', icon: 'jiankangzhenduan' },
	diagnosticResults: { title: '诊断结果', icon: 'jieguo' },
	dataRetrieval: { title: '原始数据检索', icon: 'jieguojiancha' },
	noCluster: { title: '未关联集群', icon: 'weiguanlian' },
	home: { title: '概览', icon: 'guizeguanli' },
	rlueManagement: { title: '规则管理', icon: 'guizeguanli' },
	ruleView: { title: '查看规则', icon: 'chakan' },
} as const;
