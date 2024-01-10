import axios from './axios'
import type { TypeSantion } from '@/interfaces/TypeSantion.interfaces'

export const getTypeSantionsRequest = () => axios.get<TypeSantion[]>('/type-santions/')
export const getTypeSantionRequest = (id: number) => axios.get<TypeSantion>('/type-santions/' + id)
export const createTypeSantionRequest = (typeSantion: any) =>
  axios.post<TypeSantion>('/type-santions', typeSantion)
export const updateTypeSantionRequest = (id: number, typeSantion: any) =>
  axios.patch(`/type-santions/${id}`, typeSantion)
export const deleteTypeSantionRequest = (id: number) => axios.delete(`/type-santions/${id}`)
