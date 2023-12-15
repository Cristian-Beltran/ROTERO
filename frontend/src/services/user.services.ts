import axios from './axios'
import type { PermissionLevel, User } from '@/interfaces/User.interfaces'
export const getUsersRequest = async (permissionLevel: PermissionLevel) =>
  axios.get<User[]>('/users?permissionLevel=' + permissionLevel)
export const getUserRequest = async (id: number) => axios.get<User>(`/users/${id}`)
export const createUserRequest = async (data: User, permissionLevel: PermissionLevel) =>
  axios.post('/users?permissionLevel=' + permissionLevel, data)
export const updateUserRequest = async (id: number, data: User) => axios.patch(`/users/${id}`, data)
export const deleteUserRequest = async (id: number) => axios.delete(`/users/${id}`)
