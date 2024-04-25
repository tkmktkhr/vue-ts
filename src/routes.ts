import { RouteRecordRaw } from 'vue-router';
import Login from './views/Login.vue';
import NotFound from './views/NotFound.vue';
import Index from './views/Index.vue';
import Product from './views/Product.vue';
import ProductId from './views/ProductId.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', name: 'Index', component: Index },
  { path: '/login', name: 'Login', component: Login },
  { path: '/products', name: 'Product', component: Product },
  { path: '/products/:id', component: ProductId },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
