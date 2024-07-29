import type { Operator } from './Operator.interfaces'
import type { User } from './Roles.interfaces'

export interface Route {
  id: number
  hourEntry: string
  hourExit: string
  dayEntry: string
  dayExit: string
  draw: boolean
  createdAt: Date
  updatedAt: Date
  user: User
  operator: Operator
  startLat: number
  startLng: number
  endLat: number
  endLng: number
}
