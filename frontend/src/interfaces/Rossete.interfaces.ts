import type { User } from './Roles.interfaces'
import type { Vehicle } from './Vehicle.interfaces'

export interface Rossete {
  id: number
  expiration: string
  createdAt: Date
  updatedAt: Date
  vehicle: Vehicle 
  user: User
}
