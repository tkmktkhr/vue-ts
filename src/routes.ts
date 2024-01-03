import { RouteRecordRaw } from 'vue-router';
import Login from './views/Login.vue';
import NotFound from './views/NotFound.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', component: TODO },
  { path: '/login', name: 'Login', component: Login },
  { path: '/about', component: TODO },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
