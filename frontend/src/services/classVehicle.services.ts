import axios from './axios'
import type { ClassVehicle } from '@/interfaces/ClassVehicle.interfaces'

export const getClassVehiclesRequest = () => axios.get<ClassVehicle[]>('/class-vehicle/')
export const getClassVehicleRequest = (id: number) =>
  axios.get<ClassVehicle>('/class-vehicle/' + id)
export const createClassVehicleRequest = (classVehicle: any) =>
  axios.post<ClassVehicle>('/class-vehicle', classVehicle)
export const updateClassVehicleRequest = (id: number, classVehicle: any) =>
  axios.patch(`/class-vehicle/${id}`, classVehicle)
export const deleteClassVehicleRequest = (id: number) => axios.delete(`/class-vehicle/${id}`)
