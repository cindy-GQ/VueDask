import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/playlist/:id',
      name: 'playlist-detail',
      component: () => import('@/views/playlist-detail/index.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/index.vue'),
    },
  ],
})

export default router
