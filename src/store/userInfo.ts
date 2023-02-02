import { defineStore } from 'pinia'
import { UserInfosState, UserInfosStates } from './interface'

// User information
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
    // Update user information
    updateUserInfo(user: UserInfosState) {
      this.userInfos.userName = user.userName
      this.userInfos.roles = user.roles
      this.userInfos.authBtnList = user.authBtnList
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
