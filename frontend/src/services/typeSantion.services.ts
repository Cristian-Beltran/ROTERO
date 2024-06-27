import axios from './axios'
import type { Service } from '@/interfaces/Service'

export const getTypeSantionsRequest = () => axios.get<Service[]>('/service/SANCION/type')
export const getTypeSantionRequest = (id: number) => axios.get<Service>('/service/' + id)
export const createTypeSantionRequest = (typeSantion: any) =>
  axios.post<Service>('/service', typeSantion)
export const updateTypeSantionRequest = (id: number, typeSantion: any) =>
  axios.patch(`/service/${id}`, typeSantion)
export const deleteTypeSantionRequest = (id: number) => axios.delete(`/service/${id}`)
