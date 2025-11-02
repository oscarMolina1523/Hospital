import BaseModel from "./base.model";

export default class Patient extends BaseModel {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  departmentId: string;
  medicalHistory: string; // JSON o tabla relacionada
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; 
  updatedBy: string; 

  constructor({
    id,
    firstName,
    lastName,
    birthDate,
    gender,
    departmentId,
    medicalHistory,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    departmentId: string;
    medicalHistory: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
  }) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.departmentId = departmentId;
    this.gender = gender;
    this.medicalHistory = medicalHistory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
