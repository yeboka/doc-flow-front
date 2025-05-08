
export enum Role {
  ADMIN = 'admin',
  SUPER_MANAGER = 'super_manager',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export type RoleType = keyof typeof Role;