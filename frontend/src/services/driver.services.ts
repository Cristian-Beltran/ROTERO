import axios from './axios'
import type { Driver } from '@/interfaces/Driver.interfaces'

export const getDriversRequest = (id: number) => axios.get<Driver[]>('/drivers/' + id + '/operator')
export const getDriverRequest = (id: number) => axios.get<Driver>('/drivers/' + id)
export const createDriverRequest = (driver: any) => axios.post<Driver>('/drivers', driver)
export const updateDriverRequest = (id: number, driver: any) =>
  axios.patch(`/drivers/${id}`, driver)
