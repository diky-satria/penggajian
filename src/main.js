import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//my style css
import './assets/style.css'

//bootstrap
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'

//datatable
import 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

//loading overlay
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

// chart

//axios and baseURL
axios.interceptors.request.use((config) => {
    config.baseURL = 'http://localhost:8000/'
    config.withCredentials = true
    return config
})

store.dispatch('auth/me').then(() => {
    createApp(App).use(store).use(router).mount('#app')
})
