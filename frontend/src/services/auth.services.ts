import axios from './axios'
import type { Auth } from '@/interfaces/Auth.interfaces'

export const loginRequest = (email: string, password: string) =>
  axios.post<Auth>('/auth/login', { email, password })

export const verifyTokenRequest = () => axios.post<Auth>('/auth/verify-token')

export const updateProfileRequest = (data: { password: string; oldpassword: string }) =>
  axios.patch<Auth>('/auth/update-profile', data)
export const updatePasswordRequest = (data: any) => axios.patch<Auth>('/auth/update-password', data)
export const uploadFirmOneRequest = (file: FormData) => axios.post(`/auth/firm/one`, file)
export const uploadFirmTwoRequest = (file: FormData) => axios.post(`/auth/firm/two`, file)
