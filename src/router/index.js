import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/components/Search/SearchView.vue'
import Library from '@/components/Library/library.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  BASE_URL: '/weblibrar/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Library,
    },
    {
      path: '/Search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/library',
      name: 'Library',
      component: Library,
    }
  ],
})

export default router
