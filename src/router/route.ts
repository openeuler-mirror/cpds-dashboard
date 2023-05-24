import { RouteRecordRaw } from 'vue-router';
import { eeRoutes } from './routeEE';
import { nameToTitle } from './routeTitle';
/**
 * meta: {
 *      title:          Menu bar, tagsView bar, menu search name (international)
 *      isLink：        Hyperlink menu or not, enable external chain conditions
 *      isHide：        Whether to hide this route
 *      isKeepAlive：   Whether to cache component status
 *      isAffix：       Fixed on the tagsView column
 *      isIframe：      Whether to embed the window and open the condition
 *      roles：         The current route permission ID is used for role management
 *      icon：          Menu, tagsView icon
 * }
 */

//  Define Dynamic Routes
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: false,
		},
		children: [
			{
				path: '/no-cluster',
				name: 'noCluster',
				component: () => import('/@/views/no-cluster/index.vue'),
				meta: {
					title: nameToTitle.noCluster.title,
					isLink: '',
					isHide: true,
					isKeepAlive: false,
					isAffix: true,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: `iconfont icon-${nameToTitle.noCluster.icon}`,
				},
			},
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: nameToTitle.home.title,
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: `iconfont icon-${nameToTitle.home.icon}`,
				},
			},
			{
				path: '/monitor-warn',
				name: 'monitor-warn',
				component: () => import('/@/layout/index.vue'),
				meta: {
					title: nameToTitle.monitorWarn.title,
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: `iconfont icon-${nameToTitle.monitorWarn.icon}`,
				},
				children: [
					{
						path: '/monitor-warn/cluster-status',
						name: 'cluster-status',
						component: () => import('/@/views/monitor-warn/cluster-status/index.vue'),
						meta: {
							title: nameToTitle.clusterStatus.title,
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: `iconfont icon-${nameToTitle.clusterStatus.icon}`,
						},
					},
					{
						path: '/monitor-warn/node-health',
						name: 'node-health',
						component: () => import('/@/views/monitor-warn/node-health/index.vue'),
						meta: {
							title: nameToTitle.nodeHealth.title,
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: `iconfont icon-${nameToTitle.nodeHealth.icon}`,
						},
					},
					{
						path: '/monitor-warn/awrn-management',
						name: 'awrn-management',
						component: () => import('/@/views/monitor-warn/awrn-management/index.vue'),
						meta: {
							title: nameToTitle.awrnManagement.title,
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: `iconfont icon-${nameToTitle.awrnManagement.icon}`,
						},
					},
				],
			},
			{
				path: '/health-diagnosis',
				name: 'health-diagnosis',
				component: () => import('/@/layout/index.vue'),
				meta: {
					title: nameToTitle.healthDiagnosis.title,
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					roles: ['admin'],
					icon: `iconfont icon-${nameToTitle.healthDiagnosis.icon}`,
				},
				children: [
					{
						path: '/health-diagnosis/diagnostic-results',
						name: 'diagnostic-results',
						component: () => import('/@/views/health-diagnosis/diagnostic-results/index.vue'),
						meta: {
							title: nameToTitle.diagnosticResults.title,
							isLink: '',
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: `iconfont icon-${nameToTitle.diagnosticResults.icon}`,
						},
					},
					{
						path: '/health-diagnosis/data-retrieval',
						name: 'data-retrieval',
						component: () => import('/@/views/health-diagnosis/data-retrieval/index.vue'),
						meta: {
							title: nameToTitle.dataRetrieval.title,
							isLink: '',
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: `iconfont icon-${nameToTitle.dataRetrieval.icon}`,
						},
					},
				],
			},
			{
				path: '/rule-management',
				name: 'rule-management',
				component: () => import('/@/layout/index.vue'),
				meta: {
					title: nameToTitle.rlueManagement.title,
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					roles: ['admin'],
					icon: `iconfont icon-${nameToTitle.rlueManagement.icon}`,
				},
				children: [
					{
						path: '/rule-management/rule-view',
						name: 'rule-view',
						component: () => import('/@/views/rule-management/rule-view/index.vue'),
						meta: {
							title: nameToTitle.ruleView.title,
							isLink: '',
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							roles: ['admin'],
							icon: `iconfont icon-${nameToTitle.ruleView.icon}`,
						},
					},
				],
			},
		],
	},
];
// Load closed source function route
for (let eRoute of eeRoutes) {
	const pChildren = dynamicRoutes[0].children as RouteRecordRaw[];
	const index = pChildren.findIndex((route: any) => route.name === eRoute.name);
	if (index === -1) {
		dynamicRoutes[0].children = [...pChildren, eRoute];
	} else {
		(dynamicRoutes[0].children as RouteRecordRaw[])[index].children = [
			...(pChildren[index].children as RouteRecordRaw[]),
			...(eRoute.children as RouteRecordRaw[]),
		];
	}
}

export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: '找不到此页面',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: '没有权限',
			isHide: true,
		},
	},
];

// Define static routes
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		meta: {
			title: '布局界面',
		},
		children: [...notFoundAndNoPower],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
];
