import type { Operator } from './Operator.interfaces'
import type { User } from './Roles.interfaces'

export interface Driver {
  id: number
  firstName: string
  lastName: string
  ci: string
  cellphone: string
  createdAt: Date
  updatedAt: Date
  operator: Operator
  user: User
}
