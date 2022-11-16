import authRouter from '@/router/auth';
import isAuthGuard from '@/router/auth/authGuard';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteComponent, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '',
		beforeEnter: [ isAuthGuard ],
		name: 'home',
		component: (): Promise<RouteComponent> => import('@/views/home/HomePage.vue')
	},
	{
		path: '/auth',
		...authRouter
	},
	{
		path: '/note/bookId/:bookId',
		name: 'note',
		component: (): Promise<RouteComponent> => import('@/views/note/NotePage.vue')
	},
	{
		path: '/note/new',
		name: 'newNote',
		component: (): Promise<RouteComponent> => import('@/views/note/NewNotePage.vue')
	},
	{
		path: '/note/edit/:id',
		name: 'editNote',
		component: (): Promise<RouteComponent> => import('@/views/note/EditNotePage.vue')
	}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
