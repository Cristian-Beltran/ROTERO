import type { Driver } from './Driver.interfaces'
import type { Operator } from './Operator.interfaces'
import type { Owner } from './Owner.interface'
import type { User } from './Roles.interfaces'

export interface Vehicle {
  id: number
  typeService: string
  modality: string
  maxLoad: number
  maxPass: number
  typeVehicle: string
  model: string
  brand: string
  motor: string
  chassis: string
  soat: string
  sure: string
  plate: string
  createdAt: Date
  updatedAt: Date
  operator: Operator
  owner: Owner
  driver: Driver
  user: User
}
