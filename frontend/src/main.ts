import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

// Icons
import * as FaIcons from 'oh-vue-icons/icons/fa'
import * as CoIcons from 'oh-vue-icons/icons/co'
import * as GiIcons from 'oh-vue-icons/icons/gi'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

const Co = Object.values({ ...CoIcons })
const Fa = Object.values({ ...FaIcons })
const Gi = Object.values({ ...GiIcons })

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
addIcons(...Fa, ...Co, ...Gi)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const options = {
  // You can set your default options here
}
app.use(Toast, options)
app.use(VueSweetalert2)
app.component('v-icon', OhVueIcon)
app.mount('#app')
