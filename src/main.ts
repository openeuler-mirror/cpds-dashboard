import { createApp } from 'vue'

import App from '/@/App.vue'
import router from '/@/router'
import pinia from '/@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { i18n } from '/@/i18n/index'
import mitt from 'mitt'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

//import element-plus-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(pinia).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).mount('#app')
app.config.globalProperties.mittBus = mitt()

// Turn off console warning messages
app.config.warnHandler = () => null
