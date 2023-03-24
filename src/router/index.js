import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/info/:id',
          name: 'info',
          component: () => import('../views/Information.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
      ]
    }
  ]
})

export default router
