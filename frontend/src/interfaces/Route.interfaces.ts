import type { User } from './Roles.interfaces'
import type { Vehicle } from './Vehicle.interfaces'

export interface Route {
  id: number
  hourEntry: string
  hourExit: string
  dayEntry: string
  dayExit: string
  draw: boolean
  createdAt: Date
  updatedAt: Date
  vehicle: Vehicle
  user: User
  startLat: number
  startLng: number
  endLat: number
  endLng: number
}
