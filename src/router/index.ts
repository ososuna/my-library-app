import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import isAuthGuard from '@/router/auth/authGuard';
import authRouter from '@/router/auth';
import homeRouter from '@/router/home';

const routes: Array<RouteRecordRaw> = [
	{
		path: '',
		beforeEnter: [ isAuthGuard ],
		...homeRouter
	},
	{
		path: '/auth',
		...authRouter
	}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
