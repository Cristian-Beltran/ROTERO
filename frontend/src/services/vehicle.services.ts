import axios from './axios'
import type { Vehicle } from '@/interfaces/Vehicle.interfaces'

export const getVehiclesRequest = (id: number) =>
  axios.get<Vehicle[]>('/vehicle/' + id + '/operator')
export const getVehicleRequest = (id: number) => axios.get<Vehicle>('/vehicle/' + id)
export const getVehicleByPlateRequest = (plate: string) =>
  axios.get<Vehicle>('/vehicle/' + plate + '/plate')
export const createVehicleRequest = (vehicle: any) => axios.post<Vehicle>('/vehicle', vehicle)
export const updateVehicleRequest = (id: number, vehicle: any) =>
  axios.patch(`/vehicle/${id}`, vehicle)
export const deleteVehicleRequest = (id: number) => axios.delete(`/vehicle/${id}`)

export const getVehiclesForClassRequest = () => axios.get(`/vehicle/classVehicle`)

export const getCertificationPdfRequest = (id: number) =>
  axios.get(`/vehicle/${id}/pdf`, { responseType: 'blob' })
