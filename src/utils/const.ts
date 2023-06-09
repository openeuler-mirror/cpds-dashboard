import { mapData } from '../types';

export const timeNameMap: mapData = {
	'a minute': '1 分钟',
	'5 minutes': '5 分钟',
	'10 minutes': '10 分钟',
	'30 minutes': '30 分钟',
	'an hour': '1 小时',
	'2 hours': '2 小时',
	'3 hours': '3 小时',
	'6 hours': '6 小时',
	'12 hours': '12 小时',
	'a day': '1 天',
	'3 days': '3 天',
	'7 days': '7 天',
	'30 days': '30 天',
	'a month': '1 个月',
};
export const shortcuts = [
	{
		text: '最近 5 分钟',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 5 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 10 分钟',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 10 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 30 分钟',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 30 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 1 小时',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 2 小时',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 2 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 3 小时',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 6 小时',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 6 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 12 小时',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 12 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 1 天',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 24 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 3 天',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3 * 24 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 7 天',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 7 * 24 * 60 * 60 * 1000);
			return [start, end];
		},
	},
	{
		text: '最近 1 个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 30 * 24 * 60 * 60 * 1000);
			return [start, end];
		},
	},
];
