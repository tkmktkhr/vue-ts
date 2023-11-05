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

const app = createApp(App);

// /piːnjʌ/
const pinia = createPinia();
pinia.use(PiniaHistoryPlugin);

app
  .use(pinia)
  .use(FontAwesomePlugin)
  .component('AppButton', AppButton)
  .component('AppCountInput', AppCountInput)
  .component('AppModalOverlay', AppModalOverlay)
  .mount('#app');
