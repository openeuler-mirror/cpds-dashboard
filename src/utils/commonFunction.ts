import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';

export default function () {
	const { toClipboard } = useClipboard();
	// Percent Format
	const percentFormat = (row: any, column: number, cellValue: any) => {
		return cellValue ? `${cellValue}%` : '-';
	};
	// List Date Time Format
	const dateFormatYMD = (row: any, column: number, cellValue: any) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	};
	// List Date Time Format
	const dateFormatYMDHMS = (row: any, column: number, cellValue: any) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
	};
	// List Date Time Format
	const dateFormatHMS = (row: any, column: number, cellValue: any) => {
		if (!cellValue) return '-';
		let time = 0;
		if (typeof row === 'number') time = row;
		if (typeof cellValue === 'number') time = cellValue;
		return formatDate(new Date(time * 1000), 'HH:MM:SS');
	};
	// Decimal Formatting
	const scaleFormat = (value: any = 0, scale: number = 4) => {
		return Number.parseFloat(value).toFixed(scale);
	};
	// Decimal Formatting
	const scale2Format = (value: any = 0) => {
		return Number.parseFloat(value).toFixed(2);
	};
	// Click Copy Text
	const copyText = (text: string) => {
		return new Promise((resolve, reject) => {
			try {
				toClipboard(text);
				ElMessage.success('复制成功');
				resolve(text);
			} catch (e) {
				ElMessage.error('复制失败');
				reject(e);
			}
		});
	};

	const debounce = (fn:any, delay:number = 300, thisArg?:any) => {
		let timer:number| null = null;
		return (...reset:any[]) => {
			timer && window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				fn.apply(thisArg, reset);
			}, delay);
		};
	};
	return {
		percentFormat,
		dateFormatYMD,
		dateFormatYMDHMS,
		dateFormatHMS,
		scaleFormat,
		scale2Format,
		copyText,
		debounce
	};
}
