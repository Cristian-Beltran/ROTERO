import axios from './axios'
import type { Service } from '@/interfaces/Service'

export const getTypePayordersRequest = () => axios.get<Service[]>('/service/PAGO/type')
export const getTypePayorderRequest = (id: number) =>
  axios.get<Service>('/service/' + id)
export const createTypePayorderRequest = (typePayorder: any) =>
  axios.post<Service>('/service', typePayorder)
export const updateTypePayorderRequest = (id: number, typePayorder: any) =>
  axios.patch(`/service/${id}`, typePayorder)
export const deleteTypePayorderRequest = (id: number) => axios.delete(`/service/${id}`)
