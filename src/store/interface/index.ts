export interface UserInfosState {
  roles: string[]
  userName: string
  authBtnList: string[]
}
export interface UserInfosStates {
  userInfos: UserInfosState
}
// routing List
export interface RoutesListState {
  routesList: string[]
  isColumnsMenuHover: Boolean
  isColumnsNavHover: Boolean
}
