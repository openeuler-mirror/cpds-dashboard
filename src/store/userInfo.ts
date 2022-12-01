import { defineStore } from 'pinia'
import { UserInfosState, UserInfosStates } from './interface'

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserInfosStates => ({
    userInfos: {
      userName: '',
      roles: []
    }
  }),
  actions: {
    updateUserInfo(user: UserInfosState) {
      this.userInfos.userName = user.userName
      this.userInfos.roles = user.roles
    }
  }
})
