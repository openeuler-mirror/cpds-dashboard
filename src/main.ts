import { createApp } from 'vue'

import '/@/style.css'
import App from '/@/App.vue'
import router from '/@/router'
import pinia from '/@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

//import element-plus-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(pinia).use(ElementPlus).mount('#app')
