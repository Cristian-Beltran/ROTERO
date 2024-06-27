import type { Operator } from './Operator.interfaces'
import type { User } from './Roles.interfaces'
import type { Service, ServiceType } from './Service'

export interface Payorder {
  id: number
  detail: string
  cancellationDate: Date
  cancellation: boolean
  createdAt: Date
  updatedAt: Date
  operator: Operator
  user: User
  reason: string
  type: ServiceType
  payorderDetails: PayorderDetail[]
}

export interface PayorderDetail {
  id: number
  count: number
  createdAt: Date
  updatedAt: Date
  service: Service
  payorder: Payorder
}
