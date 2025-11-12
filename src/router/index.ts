import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/game', name: 'game', component: () => import('@/views/GameView.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
