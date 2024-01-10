export interface Role {
  id:          number;
  name:        string;
  description: string;
  isActive:    boolean;
  pRoute:      boolean;
  pOwner:      boolean;
  pOperator:   boolean;
  pDriver:     boolean;
  createdAt:   Date;
  updatedAt:   Date;
  user:        User;
}

export interface User {
  id: number
  firstName: string
  lastName: string
}
