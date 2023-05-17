// Font icon url
const cssCdnUrlList: Array<string> = [
	// '//at.alicdn.com/t/font_2298093_y6u00apwst.css',
	// '//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
];
// Third party js url
const jsCdnUrlList: Array<string> = [];

// Dynamic batch setting font icon
export function setCssCdn() {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = v;
		link.crossOrigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

// Dynamic batch setting of third-party js
export function setJsCdn() {
	if (jsCdnUrlList.length <= 0) return false;
	jsCdnUrlList.map((v) => {
		let link = document.createElement('script');
		link.src = v;
		document.body.appendChild(link);
	});
}

// Set font icons and dynamic js in batch
const setIntroduction = {
	// set css
	cssCdn: () => {
		setCssCdn();
	},
	// set js
	jsCdn: () => {
		setJsCdn();
	},
};

export default setIntroduction;
