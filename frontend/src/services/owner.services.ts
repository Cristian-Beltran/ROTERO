import axios from './axios'
import type { Owner } from '@/interfaces/Owner.interface'

export const getOwnersRequest = (id: number) => axios.get<Owner[]>('/owners/' + id + '/operator')
export const getOwnerRequest = (id: number) => axios.get<Owner>('/owners/' + id)
export const createOwnerRequest = (owner: any) => axios.post<Owner>('/owners', owner)
export const updateOwnerRequest = (id: number, owner: any) => axios.patch(`/owners/${id}`, owner)
export const deleteOwnerRequest = (id: number) => axios.delete(`/owners/${id}`)
