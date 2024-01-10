import type { User } from './Roles.interfaces'
import type { Route } from './Route.interfaces'

export interface Rossete {
  id: number
  expiration: string
  createdAt: Date
  updatedAt: Date
  route: Route
  user: User
}
