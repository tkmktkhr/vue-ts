import { RouteRecordRaw } from 'vue-router';

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', component: TODO },
  { path: '/about', component: TODO },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
