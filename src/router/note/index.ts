import { RouteComponent } from 'vue-router'

export default {
	name: 'note',
	component: (): Promise<RouteComponent> => import('@/views/note/NotePage.vue')
}
