import './assets/css/styles.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import 'vue-step-progress/dist/main.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/tabler.css';
import './assets/styles/styles.css'

library.add(fas, fab);

const pinia = createPinia()
const app = createApp(App)

DataTable.use(DataTablesCore);
app.use(router)
app.use(pinia)
app.use(VueSweetalert2);
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
