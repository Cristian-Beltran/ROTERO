import axios from './axios'
import type { Auth } from '@/interfaces/Auth.interfaces'

export const loginRequest = (email: string, password: string) =>
  axios.post<Auth>('/auth/login', { email, password })

export const verifyTokenRequest = () => axios.post<Auth>('/auth/verify-token')
