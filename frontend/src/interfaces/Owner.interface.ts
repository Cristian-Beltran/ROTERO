import type { Operator } from '@/interfaces/Operator.interfaces'
import type { User } from '@/interfaces/Roles.interfaces'

export interface Owner {
  id: number
  firstName: string
  lastName: string
  ci: string
  createdAt: Date
  updatedAt: Date
  operator: Operator
  user: User
}
