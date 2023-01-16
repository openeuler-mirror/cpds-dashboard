import { nextTick } from 'vue'
import '/@/theme/loading.scss'

// Page Global Loading
export const NextLoading = {
  // create loading
  start: () => {
    const bodys: Element = document.body
    const div = <HTMLElement>document.createElement('div')
    div.setAttribute('class', 'loading-next')
    const htmls = `
			<div class="loading-next-box">
				<div class="loading-next-box-warp">
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
				</div>
			</div>
		`
    div.innerHTML = htmls
    bodys.insertBefore(div, bodys.childNodes[0])
    window.nextLoading = true
  },
  // remove loading
  done: () => {
    nextTick(() => {
      window.nextLoading = false
      const el = <HTMLElement>document.querySelector('.loading-next')
      el?.parentNode?.removeChild(el)
    })
  }
}
