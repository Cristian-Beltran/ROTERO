import axios from './axios'
import type { Rossete } from '@/interfaces/Rossete.interfaces'

export const getRossetesRequest = () => axios.get<Rossete[]>('/rossetes')
export const getRosseteRequest = (id: number) => axios.get<Rossete>(`/rossetes/${id}`)
export const createRosseteRequest = (rossete: any) => axios.post('/rossetes', rossete)
export const updateRosseteRequest = (id: number, rossete: any) =>
  axios.patch(`/rossetes/${id}`, rossete)
export const deleteRosseteRequest = (id: number) => axios.delete(`/rossetes/${id}`)

export const getRossetePdfRequest = (id: number) =>
  axios.get(`/rossetes/${id}/pdf`, { responseType: 'blob' })

export const readQrRosseteRequest = (token: string) => axios.get(`/rossetes/${token}/qr`)
