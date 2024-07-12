import { RouteRecordRaw } from 'vue-router';
import Login from './views/Login.vue';
import NotFound from './views/NotFound.vue';
import Index from './views/Index.vue';
import Product from './views/Product.vue';
import ProductId from './views/ProductId.vue';
import Practice from './views/Practice.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', name: 'Index', component: Index },
  { path: '/login', name: 'Login', component: Login },
  { path: '/products', name: 'Product', component: Product },
  { path: '/products/:id', component: ProductId },
  { path: '/practice', name: 'Practice', component: Practice },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
