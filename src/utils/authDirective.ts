import type { App } from 'vue'
import { useUserStore } from '/@/store/userInfo'
import { judementSameArr } from '/@/utils/arrayOperation'

// User authority instruction
export function authDirective(app: App) {
  // Single permission verification（v-auth="xxx"）
  app.directive('auth', {
    mounted(el, binding) {
      const stores = useUserStore()
      if (!stores.userInfos.authBtnList.some((v: string) => v === binding.value))
        el.parentNode.removeChild(el)
    }
  })
  // Multiple permissions are verified. If one is satisfied, it will be displayed（v-auths="[xxx,xxx]"）
  app.directive('auths', {
    mounted(el, binding) {
      let flag = false
      const stores = useUserStore()
      stores.userInfos.authBtnList.map((val: string) => {
        binding.value.map((v: string) => {
          if (val === v) flag = true
        })
      })
      if (!flag) el.parentNode.removeChild(el)
    }
  })
  // Multiple permissions are verified. If all are satisfied, it will be displayed（v-auth-all="[xxx,xxx]"）
  app.directive('auth-all', {
    mounted(el, binding) {
      const stores = useUserStore()
      const flag = judementSameArr(binding.value, stores.userInfos.authBtnList)
      if (!flag) el.parentNode.removeChild(el)
    }
  })
}
