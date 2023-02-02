/**
 * Define interfaces to define object types
 * `stores` All types are defined here
 */

// User information
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

// Route cache list
export interface KeepAliveNamesState {
  keepAliveNames: string[]
  cachedViews: string[]
}

// TagsView routing List
export interface TagsViewRoutesState {
  tagsViewRoutes: string[]
  isTagsViewCurrenFull: Boolean
}
// Layout Configuration
export interface ThemeConfigState {
  isDrawer: boolean
  primary: string
  topBar: string
  topBarColor: string
  menuBar: string
  menuBarColor: string
  columnsMenuBar: string
  columnsMenuBarColor: string
  isCollapse: boolean
  isUniqueOpened: boolean
  isFixedHeader: boolean
  isFixedHeaderChange: boolean
  isClassicSplitMenu: boolean
  isShowLogo: boolean
  isShowLogoChange: boolean
  isBreadcrumb: boolean
  isTagsview: boolean
  isBreadcrumbIcon: boolean
  isTagsviewIcon: boolean
  isCacheTagsView: boolean
  isSortableTagsView: boolean
  isShareTagsView: boolean
  isFooter: boolean
  isInvert: boolean
  isIsDark: boolean
  isWartermark: boolean
  wartermarkText: string
  tagsStyle: string
  animation: string
  columnsAsideStyle: string
  columnsAsideLayout: string
  layout: string
  isRequestRoutes: boolean
  globalTitle: string
  globalViceTitle: string
  globalComponentSize: string
}

export interface ThemeConfigStates {
  themeConfig: ThemeConfigState
}
