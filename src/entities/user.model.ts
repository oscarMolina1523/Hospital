import BaseModel from "./base.model";

export default class User extends BaseModel {
  username: string;
  email: string;
  password: string;
  roleId: string; 
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; 
  updatedBy: string; 
  departmentId?: string; // FK a Department (optional for CEO, Board of Directors)

  constructor({
    id,
    username,
    email,
    password,
    roleId,
    active,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    departmentId,
  }: {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    departmentId?: string;
  }) {
    super(id);
    this.username = username;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.departmentId = departmentId;
  }
}
