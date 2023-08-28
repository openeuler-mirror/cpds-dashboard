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

import type { App } from 'vue';

// Button wave command
export function wavesDirective(app: App) {
	app.directive('waves', {
		mounted(el, binding) {
			el.classList.add('waves-effect');
			binding.value && el.classList.add(`waves-${binding.value}`);
			function setConvertStyle(obj: { [key: string]: unknown }) {
				let style: string = '';
				for (let i in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, i)) style += `${i}:${obj[i]};`;
				}
				return style;
			}
			function onCurrentClick(e: { [key: string]: unknown }) {
				let elDiv = document.createElement('div');
				elDiv.classList.add('waves-ripple');
				el.appendChild(elDiv);
				let styles = {
					left: `${e.layerX}px`,
					top: `${e.layerY}px`,
					opacity: 1,
					transform: `scale(${(el.clientWidth / 100) * 10})`,
					'transition-duration': `750ms`,
					'transition-timing-function': `cubic-bezier(0.250, 0.460, 0.450, 0.940)`,
				};
				elDiv.setAttribute('style', setConvertStyle(styles));
				setTimeout(() => {
					elDiv.setAttribute(
						'style',
						setConvertStyle({
							opacity: 0,
							transform: styles.transform,
							left: styles.left,
							top: styles.top,
						})
					);
					setTimeout(() => {
						elDiv && el.removeChild(elDiv);
					}, 750);
				}, 450);
			}
			el.addEventListener('mousedown', onCurrentClick, false);
		},
		unmounted(el) {
			el.addEventListener('mousedown', () => {});
		},
	});
}

// Custom drag command
export function dragDirective(app: App) {
	app.directive('drag', {
		mounted(el, binding) {
			if (!binding.value) return false;

			const dragDom = document.querySelector(binding.value[0]) as HTMLElement;
			const dragHeader = document.querySelector(binding.value[1]) as HTMLElement;

			dragHeader.onmouseover = () => (dragHeader.style.cursor = `move`);

			function down(e: any, type: string) {
				const disX = type === 'pc' ? e.clientX - dragHeader.offsetLeft : e.touches[0].clientX - dragHeader.offsetLeft;
				const disY = type === 'pc' ? e.clientY - dragHeader.offsetTop : e.touches[0].clientY - dragHeader.offsetTop;
				const screenWidth = document.body.clientWidth;
				const screenHeight = document.documentElement.clientHeight;
				const dragDomWidth = dragDom.offsetWidth;
				const dragDomheight = dragDom.offsetHeight;

				const minDragDomLeft = dragDom.offsetLeft;
				const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

				const minDragDomTop = dragDom.offsetTop;
				const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

				let styL: any = getComputedStyle(dragDom).left;
				let styT: any = getComputedStyle(dragDom).top;

				if (styL.includes('%')) {
					styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
					styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
				} else {
					styL = +styL.replace(/\px/g, '');
					styT = +styT.replace(/\px/g, '');
				}

				return {
					disX,
					disY,
					minDragDomLeft,
					maxDragDomLeft,
					minDragDomTop,
					maxDragDomTop,
					styL,
					styT,
				};
			}

			function move(e: any, type: string, obj: any) {
				let { disX, disY, minDragDomLeft, maxDragDomLeft, minDragDomTop, maxDragDomTop, styL, styT } = obj;

				let left = type === 'pc' ? e.clientX - disX : e.touches[0].clientX - disX;
				let top = type === 'pc' ? e.clientY - disY : e.touches[0].clientY - disY;

				if (-left > minDragDomLeft) {
					left = -minDragDomLeft;
				} else if (left > maxDragDomLeft) {
					left = maxDragDomLeft;
				}

				if (-top > minDragDomTop) {
					top = -minDragDomTop;
				} else if (top > maxDragDomTop) {
					top = maxDragDomTop;
				}

				dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
			}

			// pc side
			dragHeader.onmousedown = (e) => {
				const obj = down(e, 'pc');
				document.onmousemove = (e) => {
					move(e, 'pc', obj);
				};
				document.onmouseup = () => {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			};

			// mobile side
			dragHeader.ontouchstart = (e) => {
				const obj = down(e, 'app');
				document.ontouchmove = (e) => {
					move(e, 'app', obj);
				};
				document.ontouchend = () => {
					document.ontouchmove = null;
					document.ontouchend = null;
				};
			};
		},
	});
}

/**
 * Scroll bar hover display command
 * If the element has a scroll bar, move the element in to display the scroll bar, and move the element out to not display the scroll bar
*/
export function scrollBarDirective(app: App) {
	app.directive('scrollBar', {
		mounted(el, binding) {
			el.style.overflow = 'hidden';
			el.onmouseenter = (e:Event) => {
				(e.target as HTMLElement).style.overflow = 'overlay';
			};
			el.onmouseleave = (e:Event) => {
				(e.target as HTMLElement).style.overflow = 'hidden';
			};
		}
	});
}