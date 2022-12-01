import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// create the pinia
const pinia = createPinia()

//use persistent storage
pinia.use(piniaPluginPersist)

// export the pinia
export default pinia
