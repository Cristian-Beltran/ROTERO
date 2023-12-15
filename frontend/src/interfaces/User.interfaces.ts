import type { Role } from './Roles.interfaces'
export interface User {
  id?: number
  firstName?: string
  lastName?: string
  birthday?: Date
  ci?: string
  email?: string
  permissionLevel?: PermissionLevel
  isActive?: boolean
  cellphone?: string
  lastLogin?: Date
  createdAt?: Date
  updatedAt?: Date
  role?: Role
}

export enum PermissionLevel {
  ADMINISTRADOR = 'ADMINISTRADOR',
  OPERADOR = 'OPERADOR',
  CONSULTOR = 'CONSULTOR'
}
