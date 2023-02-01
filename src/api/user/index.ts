import request from '/@/utils/request'

export function useUserApi() {
  return {
    // Get userinfo
    userInfo: (params: object) => {
      return request({
        url: '/api/getLoginUser',
        method: 'post',
        data: params
      })
    }
  }
}
