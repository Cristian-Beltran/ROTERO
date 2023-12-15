import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/guards/auth.guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Layout auth
    {
      path: '/auth',
      redirect: '/auth/login',
      component: () => import('@/layouts/auth/AuthLayout.vue'),
      children: [
        {
          path: '/auth/login',
          name: 'auth-login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: '/auth/register',
          name: 'auth-register',
          component: () => import('@/views/auth/RegisterView.vue')
        },
        {
          path: '/auth/operator',
          name: 'auth-operator',
          component: () => import('@/views/auth/OperatorView.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/layouts/admin/AdminLayout.vue'),
      beforeEnter: [isAuthenticated],
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/admin/DashboardView.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/admin/ProfileView.vue')
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import('@/views/admin/AdminView.vue')
        },
        {
          path: '/admin/create',
          name: 'admin-create',
          component: () => import('@/views/admin/AdminData.vue')
        },
        {
          path: '/admin/edit',
          name: 'admin-edit',
          component: () => import('@/views/admin/AdminData.vue')
        },
        {
          path: '/role',
          name: 'role',
          component: () => import('@/views/admin/RoleView.vue')
        },
        {
          path: '/role/create',
          name: 'role-create',
          component: () => import('@/views/admin/RoleData.vue')
        },
        {
          path: '/role/edit',
          name: 'role-edit',
          component: () => import('@/views/admin/RoleData.vue')
        },
        {
          path: '/consultor',
          name: 'consultor',
          component: () => import('@/views/admin/ConsultorView.vue')
        },
        {
          path: '/consultor/create',
          name: 'consultor-create',
          component: () => import('@/views/admin/ConsultorData.vue')
        },
        {
          path: '/consultor/edit',
          name: 'consultor-edit',
          component: () => import('@/views/admin/ConsultorData.vue')
        }
      ]
    }
    /*{
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }*/
  ]
})

export default router
