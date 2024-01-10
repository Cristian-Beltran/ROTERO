import type { Operator } from './Operator.interfaces'
import type { Payorder } from './Payorder.interfaces'
import type { User } from './Roles.interfaces'
import type { TypeSantion } from './TypeSantion.interfaces'

export interface Santion {
  id: number
  detail: string
  createdAt: Date
  updatedAt: Date
  user: User
  operator: Operator
  payorder: Payorder
  typeSantion: TypeSantion
}
