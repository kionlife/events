import { createApp } from 'vue';
import VCalendar from 'v-calendar';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'v-calendar/style.css';
import '../css/app.css';


const app = createApp(App);

app.use(VCalendar);
app.use(BootstrapVue3);

app.mount('#app');
