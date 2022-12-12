import request from '/@/utils/request'

export function useLoginApi() {
  return {
    // Login
    signIn: (params: object) => {
      return request({
        url: '/api/login',
        method: 'post',
        data: params
      })
    },
    // Logout
    signOut: (params: object) => {
      return request({
        url: '/api/logout',
        method: 'post',
        data: params
      })
    }
  }
}
