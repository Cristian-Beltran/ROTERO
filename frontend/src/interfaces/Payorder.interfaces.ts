import type { Operator } from './Operator.interfaces'
import type { User } from './Roles.interfaces'
import type { TypePayorder } from './TypePayorder.interfaces'

export interface Payorder{
  id: number
  detail: string
  cancellationDate: Date
  cancellation: boolean
  createdAt: Date
  updatedAt: Date
  operator: Operator
  user: User
  typePayorder: TypePayorder
}
