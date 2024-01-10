import type { User } from './Roles.interfaces'

export interface TypePayorder {
  id: number
  name: string
  detail: string
  amount: number
  createdAt: Date
  updatedAt: Date
  user: User
}
