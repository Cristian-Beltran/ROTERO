import axios from './axios'
import type { Route } from '@/interfaces/Route.interfaces'

export const getRoutesRequest = () => axios.get<Route[]>('/routes')
export const getRouteRequest = (id: number) => axios.get<Route>(`/routes/${id}`)
export const createRouteRequest = (route: any) => axios.post('/routes', route)
export const updateRouteRequest = (id: number, route: any) => axios.patch(`/routes/${id}`, route)
export const deleteRouteRequest = (id: number) => axios.delete(`/routes/${id}`)
export const uploadRouteRequest = (id: number, file: FormData) =>
  axios.patch(`/routes/${id}/files`, file)
