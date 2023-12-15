import axios from './axios'
import type { Role } from '@/interfaces/Roles.interfaces'
export const getRolesRequest = () => axios.get<Role[]>('/roles')
export const getRoleRequest = (id: number) => axios.get<Role>(`/roles/${id}`)
export const createRoleRequest = (role: Role) => axios.post('/roles', role)
export const updateRoleRequest = (id: number, role: Role) => axios.patch(`/roles/${id}`, role)
export const deleteRoleRequest = (id: number) => axios.delete(`/roles/${id}`)
