import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: { name: 'rack' },
      children: [
        {
          path: 'storage',
          name: 'storage',
          redirect: { name: 'rack' },
          component: () => import('@/pages/storage/storage.vue'),
          children: [
            {
              path: 'rack',
              name: 'rack',
              component: () => import('@/pages/storage/rack/rack.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
