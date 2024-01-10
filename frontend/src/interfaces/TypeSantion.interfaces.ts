import type { User } from './Roles.interfaces'
import type { TypePayorder } from './TypePayorder.interfaces'

export interface TypeSantion {
  id: number
  detail: string
  severity: string
  createdAt: Date
  updatedAt: Date
  user: User
  typePayorder: TypePayorder
}
