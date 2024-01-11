import { RouteRecordRaw } from 'vue-router';
import Login from './views/Login.vue';
import NotFound from './views/NotFound.vue';
import Index from './views/Index.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', name: 'Index', component: Index },
  { path: '/login', name: 'Login', component: Login },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
