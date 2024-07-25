import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/views/HomeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'punto-de-venta',
          name: 'punto-de-venta',
          component: () => import('@/views/PuntoDeVentaView.vue'),
        },
        {
          path: 'cliente',
          name: 'cliente',
          component: () => import('@/views/ClienteView.vue'),
        },
        {
          path: 'productos',
          name: 'productos',
          component: () => import('@/views/ProductosView.vue'),
        },
        {
          path: 'proveedores',
          name: 'proveedores',
          component: () => import('@/views/ProveedoresView.vue'),
        },
        {
          path: 'caja',
          name: 'caja',
          component: () => import('@/views/CajaView.vue'),
        },
      ]
    },
  ]
})

export default router