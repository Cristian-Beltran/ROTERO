import axios from './axios'
import type { TypePayorder } from '@/interfaces/TypePayorder.interfaces'

export const getTypePayordersRequest = () => axios.get<TypePayorder[]>('/type-payorders/')
export const getTypePayorderRequest = (id: number) =>
  axios.get<TypePayorder>('/type-payorders/' + id)
export const createTypePayorderRequest = (typePayorder: any) =>
  axios.post<TypePayorder>('/type-payorders', typePayorder)
export const updateTypePayorderRequest = (id: number, typePayorder: any) =>
  axios.patch(`/type-payorders/${id}`, typePayorder)
export const deleteTypePayorderRequest = (id: number) => axios.delete(`/type-payorders/${id}`)
