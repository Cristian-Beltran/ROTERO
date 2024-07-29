import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, isNotAuthenticated } from '@/guards/auth.guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Layout auth
    {
      path: '/',
      redirect: '/vehicle',
      component: () => import('@/layouts/consult/PublicLayout.vue'),
      children: [
        {
          path: '/vehicle',
          name: 'consult',
          component: () => import('@/views/consult/ConsultView.vue')
        }
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      component: () => import('@/layouts/auth/AuthLayout.vue'),
      beforeEnter: [isNotAuthenticated],
      children: [
        {
          path: '/auth/login',
          name: 'auth-login',
          component: () => import('@/views/auth/LoginView.vue')
        }
      ]
    },
    {
      path: '/root',
      redirect: '/dashboard',
      component: () => import('@/layouts/admin/AdminLayout.vue'),
      beforeEnter: [isAuthenticated],
      children: [
        {
          path: '/firm',
          name: 'firm',
          component: () => import('@/views/admin/FirmView.vue')
        },
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
        },
        {
          path: '/operator',
          name: 'operator',
          component: () => import('@/views/admin/OperatorView.vue')
        },
        {
          path: '/operator/create',
          name: 'operator-create',
          component: () => import('@/views/admin/OperatorData.vue')
        },
        {
          path: '/operator/edit',
          name: 'operator-edit',
          component: () => import('@/views/admin/OperatorData.vue')
        },
        {
          path: '/payorder',
          name: 'payorder',
          component: () => import('@/views/admin/PayorderView.vue')
        },
        {
          path: '/payorder/create',
          name: 'payorder-create',
          component: () => import('@/views/admin/PayorderData.vue')
        },
        {
          path: '/payorder/edit',
          name: 'payorder-edit',
          component: () => import('@/views/admin/PayorderData.vue')
        },
        {
          path: '/santion',
          name: 'santion',
          component: () => import('@/views/admin/SantionView.vue')
        },
        {
          path: '/santion/create',
          name: 'santion-create',
          component: () => import('@/views/admin/SantionData.vue')
        },
        {
          path: '/santion/edit',
          name: 'santion-edit',
          component: () => import('@/views/admin/SantionData.vue')
        },
        {
          path: '/operator/:id',
          name: 'operator-info',
          component: () => import('@/views/admin/OperatorInfo.vue')
        },
        {
          path: '/owner/:id/create',
          name: 'owner-create',
          component: () => import('@/views/admin/OwnerData.vue')
        },
        {
          path: '/owner/:id/edit',
          name: 'owner-edit',
          component: () => import('@/views/admin/OwnerData.vue')
        },
        {
          path: '/vehicle/:id/create',
          name: 'vehicle-create',
          component: () => import('@/views/admin/VehicleData.vue')
        },
        {
          path: '/vehicle/:id/edit',
          name: 'vehicle-edit',
          component: () => import('@/views/admin/VehicleData.vue')
        },
        
        {
          path: '/route/:id/create',
          name: 'route-create',
          component: () => import('@/views/admin/RouteData.vue')
        },
        {
          path: '/route/:id/edit',
          name: 'route-edit',
          component: () => import('@/views/admin/RouteData.vue')
        },
        {
          path: '/rossete',
          name: 'rossete',
          component: () => import('@/views/admin/RosseteView.vue')
        },
        {
          path: '/rossete/create',
          name: 'rossete-create',
          component: () => import('@/views/admin/RosseteData.vue')
        },
        {
          path: '/rossete/edit',
          name: 'rossete-edit',
          component: () => import('@/views/admin/RosseteData.vue')
        },
        {
          path: '/readQr',
          name: 'readQr',
          component: () => import('@/views/admin/ReadQr.vue')
        },
        {
          path: '/route/map',
          name: 'route-map',
          component: () => import('@/views/admin/RouteMap.vue')
        },
        {
          path: '/type-payorder',
          name: 'type-payorder',
          component: () => import('@/views/admin/TypePayorderView.vue')
        },
        {
          path: '/type-payorder/create',
          name: 'type-payorder-create',
          component: () => import('@/views/admin/TypePayorderData.vue')
        },
        {
          path: '/type-payorder/edit',
          name: 'type-payorder-edit',
          component: () => import('@/views/admin/TypePayorderData.vue')
        },
        {
          path: '/type-santion',
          name: 'type-santion',
          component: () => import('@/views/admin/TypeSantionView.vue')
        },
        {
          path: '/type-santion/create',
          name: 'type-santion-create',
          component: () => import('@/views/admin/TypeSantionData.vue')
        },
        {
          path: '/type-santion/edit',
          name: 'type-santion-edit',
          component: () => import('@/views/admin/TypeSantionData.vue')
        },
        {
          path: '/class-vehicle',
          name: 'class-vehicle',
          component: () => import('@/views/admin/ClassVehicleView.vue')
        },
        {
          path: '/class-vehicle/create',
          name: 'class-vehicle-create',
          component: () => import('@/views/admin/ClassVehicleData.vue')
        },
        {
          path: '/class-vehicle/edit',
          name: 'class-vehicle-edit',
          component: () => import('@/views/admin/ClassVehicleData.vue')
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
