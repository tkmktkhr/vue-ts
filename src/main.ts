import { createApp } from 'vue';
import { createPinia } from 'pinia';
// REFACTOR change to import vue-router correctly
import { routes } from '@/routes';
// import routes from '~pages';
import './assets/main.pcss';
import '@/style.css';
import App from '@/App.vue';
// App Wide Components
import AppButton from '@/components/AppButton.vue';
import AppCountInput from '@/components/AppCountInput.vue';
import AppModalOverlay from '@/components/AppModalOverlay.vue';
// Icons and Styles
import FontAwesomePlugin from './plugins/FontAwesome';
import { PiniaHistoryPlugin } from '@/plugins/PiniaHistoryPlugin';
import { createDb } from './db';
import { VueFire, VueFireAuth } from 'vuefire';
// vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// vue-router
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

// /piːnjʌ/
const pinia = createPinia();
pinia.use(PiniaHistoryPlugin);

const firebase = createDb();

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  // Provide the history implementation to use. Vue router is using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

app
  .use(pinia)
  .use(FontAwesomePlugin)
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp: firebase,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
  .use(vuetify)
  .use(router)
  .component('AppButton', AppButton)
  .component('AppCountInput', AppCountInput)
  .component('AppModalOverlay', AppModalOverlay)
  .mount('#app');
