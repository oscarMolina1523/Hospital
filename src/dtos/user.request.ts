export interface UserRequest {
  username?: string;
  email: string;
  password: string;
  departmentId?: string;
  roleId?: string;
  active: boolean;
}
