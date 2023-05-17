import { RouteRecordRaw } from 'vue-router';
import { nameToTitle } from './routeTitle';

const eeViewRouter = import.meta.glob('../views/viewsEE/**/*.vue');
const layout = () => import('/@/layout/index.vue');

export const eeRoutes: RouteRecordRaw[] = [];
for (let path in eeViewRouter) {
	// const fullName = (path.match(/\.\.\/views\/(.*)\/index.vue$/) as any[])[1].toLowerCase()
	// Parent Route Name
	const pName: string = (path.match(/\.\.\/views\/(.*)\/index.vue$/) as any[])[1].split('/')[1];
	// Subroute Name
	const cName: string = (path.match(/\.\.\/views\/(.*)\/index.vue$/) as any[])[1].split('/')[2];
	const index = eeRoutes.findIndex((route) => route.name === pName);
	if (index === -1) {
		eeRoutes.push({
			path: `/${pName}`,
			name: pName,
			component: layout,
			meta: {
				title: nameToTitle[pName].title,
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: true,
				isIframe: false,
				roles: ['admin'],
				icon: `iconfont icon-${nameToTitle[pName].icon}`,
			},
			children: [
				{
					path: `/${pName}/${cName}`,
					name: cName,
					component: eeViewRouter[path],
					meta: {
						title: nameToTitle[cName].title,
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: true,
						isIframe: false,
						roles: ['admin'],
						icon: `iconfont icon-${nameToTitle[cName].icon}`,
					},
				},
			],
		});
	} else {
		eeRoutes[index].children?.push({
			path: `/${pName}/${cName}`,
			name: cName,
			component: eeViewRouter[path],
			meta: {
				title: nameToTitle[cName].title,
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: true,
				isIframe: false,
				roles: ['admin'],
				icon: `iconfont icon-${nameToTitle[cName].icon}`,
			},
		});
	}
}
