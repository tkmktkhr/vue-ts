import { createApp } from 'vue';
import { createPinia } from 'pinia';
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
// import { getFirestore } from 'firebase/firestore';
import { createDb } from './db';
import { VueFire, VueFireAuth } from 'vuefire';
// vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);

// /piːnjʌ/
const pinia = createPinia();
pinia.use(PiniaHistoryPlugin);

const firebase = createDb();
// export const db = getFirestore(firebase);

const vuetify = createVuetify({
  components,
  directives,
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
  .component('AppButton', AppButton)
  .component('AppCountInput', AppCountInput)
  .component('AppModalOverlay', AppModalOverlay)
  .mount('#app');
