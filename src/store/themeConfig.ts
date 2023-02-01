import { defineStore } from 'pinia'
import { ThemeConfigStates, ThemeConfigState } from './interface'

// Layout Configuration
export const useThemeConfig = defineStore('themeConfig', {
  state: (): ThemeConfigStates => ({
    themeConfig: {
      // Whether to open the layout configuration drawer
      isDrawer: false,

      /**
       * Global themes
       */
      // Theme Colors
      primary: '#0052cc',
      // Whether dark mode is enabled
      isIsDark: true,

      /**
       * Menu / Top bar
       */
      // Top bar navigation background color
      topBar: '#ffffff',
      // Top bar navigation font color
      topBarColor: '#606266',
      // Menu navigation background bolor
      menuBar: '#545c64',
      // Menu navigation font bolor
      menuBarColor: '#eaeaea',
      // Column menu background color
      columnsMenuBar: '#545c64',
      // Column menu font color
      columnsMenuBarColor: '#e6e6e6',
      /**
       * Interface Settings
       */
      // Whether to enable the horizontal folding effect of the menu
      isCollapse: false,
      // Whether to open menu accordion effect
      isUniqueOpened: false,
      // Whether to open and fix Header
      isFixedHeader: false,
      // Initialization variable, used to update the height of the menu el scrollbar. Do not delete it
      isFixedHeaderChange: false,
      // Whether to open the classic layout split menu (only the classic layout takes effect)
      isClassicSplitMenu: false,
      /**
       * Interface display
       */
      // Whether to open the sidebar Logo
      isShowLogo: true,
      // Initialization variable, used to update the height of the menu el scrollbar. Do not delete it
      isShowLogoChange: false,
      // Whether to enable Breadcrumb to force classic and horizontal layout not to be displayed
      isBreadcrumb: true,
      // Whether to open Tagsview
      isTagsview: true,
      // Whether to open Breadcrumb icon
      isBreadcrumbIcon: false,
      // Whether to open Tagsview icon
      isTagsviewIcon: false,
      // Whether to open TagsView cache
      isCacheTagsView: false,
      // Whether to open TagsView drag
      isSortableTagsView: true,
      // Whether to open TagsView sharing
      isShareTagsView: false,
      // Whether to open Footer bottom copyright information
      isFooter: false,
      // Whether to turn on the weak color mode
      isInvert: false,
      // Whether to enable watermark
      isWartermark: false,
      // Watermark copy
      wartermarkText: 'dsms',

      /**
       * Other settings
       */
      // Tagsview style：<tags-style-one|tags-style-four|tags-style-five>，default: tags-style-five
      tagsStyle: 'tags-style-one',
      // Master page switch animation：<slide-right|slide-left|opacitys>，default: slide-right
      animation: 'slide-right',
      // Column highlight style：<columns-round|columns-card>，default: columns-round
      columnsAsideStyle: 'columns-round',
      // Column layout style：<columns-horizontal|columns-vertical>，default: columns-horizontal
      columnsAsideLayout: 'columns-vertical',

      /**
       * Layout Switch
       */
      // Layout Switch：<defaults|classic|transverse|columns>，default defaults
      layout: 'defaults',

      /**
       * Backend control route
       */
      // Whether to enable back-end control routing
      isRequestRoutes: false,

      /**
       * Global Site Title
       */
      // Site main title (menu navigation, browser current page title)
      globalTitle: '',
      // Site subtitle (top text of landing page)
      globalViceTitle: '',
      // Default global component size: <large|default|small>，default: large
      globalComponentSize: 'default'
    }
  }),
  actions: {
    setThemeConfig(data: ThemeConfigState) {
      this.themeConfig = data
    }
  }
})
