import { useAuthStore } from '@/stores/auth.stores'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const isAuthenticated = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const verify = await authStore.verifyToken()
  if (verify) {
    next()
  } else {
    next('/auth/login')
  }
}

export const isNotAuthenticated = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authSotre = useAuthStore()
  const verify = await authSotre.verifyToken()
  if (!verify) {
    next()
  } else {
    next('/root')
  }
}
