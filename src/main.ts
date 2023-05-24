import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
import { directive } from '/@/utils/directive';
import other from '/@/utils/other';
import ElementPlus from 'element-plus';
import mitt from 'mitt';
import VueGridLayout from 'vue-grid-layout';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus).use(VueGridLayout).mount('#app');
app.config.globalProperties.mittBus = mitt();
// Turn off console warning messages
app.config.warnHandler = () => null;
