import axios from './axios'
import type { Payorder } from '@/interfaces/Payorder.interfaces'

export const getPayordersRequest = (initDate: string, endDate: string) =>
  axios.get<Payorder[]>('/payorders?initDate=' + initDate + '&endDate=' + endDate)
export const getPayorderRequest = (id: number) => axios.get<Payorder>('/payorders/' + id)
export const createPayorderRequest = (payorder: any) => axios.post('/payorders', payorder)
export const updatePayorderRequest = (id: number, payorder: any) =>
  axios.patch(`/payorders/${id}`, payorder)
export const deletePayorderRequest = (id: number) => axios.delete(`/payorders/${id}`)
export const cancelationPayorderRequest = (id: number) =>
  axios.patch(`/payorders/${id}/cancelation`)

export const getPayorderPdfRequest = (id: number) =>
  axios.get(`/payorders/${id}/pdf`, { responseType: 'blob' })

export const getPayordersPdfRequest = (initDate: string, endDate: string) =>
  axios.get(`/payorders/report/pdf?initDate=${initDate}&endDate=${endDate}`, {
    responseType: 'blob'
  })
