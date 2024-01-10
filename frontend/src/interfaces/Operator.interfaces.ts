import type { User } from './Roles.interfaces'

export interface Operator {
  id: number
  businessName?: string
  legalRepresentative?: string
  owner?: string
  seprec?: string
  nit?: string
  administrativeResolution?: string
  dateRa?: Date
  initialAffiliates?: number
  currentAffiliates?: number
  state?: string
  tecnicalNumber?: string
  legalNumber?: string
  observations?: string
  operatorCertification?: string
  validity?: Date
  route?: string
  createdAt?: Date
  updatedAt?: Date
  user?: User
  operator?: User
}
