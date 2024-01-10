import axios from './axios'
import type { Operator } from '@/interfaces/Operator.interfaces'
export const getOperatorsRequest = () => axios.get<Operator[]>('/operators')
export const getOperatorRequest = (id: number) => axios.get<Operator>('/operators/' + id)
export const createOperatorRequest = (operator: any) => axios.post('/operators', operator)
export const updateOperatorRequest = (id: number, operator: any) =>
  axios.patch(`/operators/${id}`, operator)

export const uploadFileRequest = (id: number, file: FormData, location: string) =>
  axios.patch(`/operators/${id}/files/?location=` + location, file)

export const authorizeOperatorRequest = (id: number) => axios.patch(`/operators/${id}/authorize`)
export const deleteOperatorRequest = (id: number) => axios.delete(`/operators/${id}`)

export const getTotalAffiliateRequest = () => axios.get(`/operators/total-Affiliates`)