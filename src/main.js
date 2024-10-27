import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/assets/CommonStyle.css';
import 'flatpickr/dist/flatpickr.css';
import Toast from 'vue3-toastify'

import router from './router';


const app = createApp(App);

app.use(router)

const toastOptions = {
    autoClose: 1500, 
    theme: 'colored',
    hideProgressBar:true
}
app.use(Toast,toastOptions)

app.mount('#app')