import type { User } from './Roles.interfaces'

export interface Service {
  id: number
  name: string
  detail: string
  amount: number
  type: ServiceType
  createdAt: Date
  updatedAt: Date
  user: User
}

export enum ServiceType {
  'SANCION',
  'PAGO'
}
