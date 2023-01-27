/**
 * Define interfaces to define object types
 * `stores` All types are defined here
 */

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

// TagsView routing List
export interface TagsViewRoutesState {
  tagsViewRoutes: string[]
  isTagsViewCurrenFull: Boolean
}
