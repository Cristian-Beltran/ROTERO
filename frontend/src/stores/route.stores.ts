import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type { Route } from '@/interfaces/Route.interfaces'
import {
  getRouteRequest,
  getRoutesRequest,
  createRouteRequest,
  updateRouteRequest,
  deleteRouteRequest,
  uploadRouteRequest
} from '@/services/route.services'

export const useRouteStore = defineStore('route', () => {
  const routes = reactive<Route[]>([])
  const route = ref<Route | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return routes.filter((data) => {
      return (
        data.operator.businessName?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })

  async function getRoutes(): Promise<void> {
    loading.value = true
    const { data } = await getRoutesRequest()
    const dataMap = data.map((route) => {
      return {
        ...route,
        userName: `${route?.user?.firstName} ${route.user?.lastName}`,
        operatorName: `${route?.operator?.businessName}`,
        check: false
      }
    })
    routes.splice(0, routes.length, ...dataMap)
    loading.value = false
  }
  async function getRoute(id: number): Promise<void> {
    const { data } = await getRouteRequest(id)
    route.value = data
  }
  async function createRoute(route: Route) {
    return await createRouteRequest(route)
  }
  async function updateRoute(id: number, route: Route) {
    return await updateRouteRequest(id, route)
  }
  async function deleteRoute(id: number): Promise<void> {
    await deleteRouteRequest(id)
  }
  async function uploadFile(id: number, file: FormData) {
    return await uploadRouteRequest(id, file)
  }

  return {
    routes,
    route,
    search,
    loading,
    filter,
    getRoutes,
    getRoute,
    createRoute,
    updateRoute,
    deleteRoute,
    uploadFile,
  }
})
