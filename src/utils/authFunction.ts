import { useUserStore } from '/@/store/userInfo'

export function auth(value: string): boolean {
  const stores = useUserStore()
  return stores.userInfos.authBtnList.some((v: string) => v === value)
}

// Multiple permission verifications, true if one is satisfied
export function auths(value: Array<string>): boolean {
  let flag = false
  const stores = useUserStore()
  stores.userInfos.authBtnList.map((val: string) => {
    value.map((v: string) => {
      if (val === v) flag = true
    })
  })
  return flag
}
