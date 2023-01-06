import { defineStore } from 'pinia'
import { UserInfosState, UserInfosStates } from './interface'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserInfosStates => ({
    userInfos: {
      userName: '',
      roles: [],
      authBtnList: []
    }
  }),
  actions: {
    updateUserInfo(user: UserInfosState) {
      this.userInfos.userName = user.userName
      this.userInfos.roles = user.roles
    }
  },
  //use persistent storage
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: sessionStorage
      }
    ]
  }
})
