import { useUserStore } from '/@/store/userInfo'

export function auth(value: string): boolean {
  const stores = useUserStore()
  return stores.userInfos.authBtnList.some((v: string) => v === value)
}
