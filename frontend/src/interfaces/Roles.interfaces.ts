export interface Role {
  id: number
  name: string
  description: string
  pPersonal: boolean
  pOwner: boolean
  createdAt: string
  updatedAt: string
  user: User
}
export interface User {
  id: number
  firstName: string
  lastName: string
}
