import axios from './axios'
import type { Santion } from '@/interfaces/Santion.interfaces'

export const getSantionsRequest = (initDate: string, endDate: string) =>
  axios.get<Santion[]>('/santions?initDate=' + initDate + '&endDate=' + endDate)
export const getSantionRequest = (id: number) => axios.get<Santion>('/santions/' + id)
export const createSantionRequest = (santion: any) => axios.post('/santions', santion)
export const updateSantionRequest = (id: number, santion: any) =>
  axios.patch(`/santions/${id}`, santion)
export const deleteSantionRequest = (id: number) => axios.delete(`/santions/${id}`)
