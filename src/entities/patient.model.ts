import BaseModel from "./base.model";

export default class Patient extends BaseModel {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  departmentId: string;
  medicalHistory: string; // JSON o tabla relacionada
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string; 
  updatedBy?: string; 

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
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
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


  static fromJson(json: any): Patient {
    const id = String(json["id"] || "");
    const firstName = String(json["firstName"] || "");
    const lastName = String(json["lastName"] || "");
    const birthDate = json["birthDate"] ? new Date(json["birthDate"]) : new Date();
    const gender = String(json["gender"] || "");
    const departmentId = String(json["departmentId"] || "");
    const medicalHistory = String(json["medicalHistory"] || "");
    const createdAt = json["createdAt"] ? new Date(json["createdAt"]) : undefined;
    const updatedAt = json["updatedAt"] ? new Date(json["updatedAt"]) : undefined;
    const createdBy = json["createdBy"] ? String(json["createdBy"]) : undefined;
    const updatedBy = json["updatedBy"] ? String(json["updatedBy"]) : undefined;

    return new Patient({
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
    });
  }

  static fromJsonModel(json: any): Patient {
    const id = String(json["id"] || "");
    const firstName = String(json["firstName"] || "");
    const lastName = String(json["lastName"] || "");
    const birthDate = json["birthDate"] ? new Date(json["birthDate"]) : new Date();
    const gender = String(json["gender"] || "");
    const departmentId = String(json["departmentId"] || "");
    const medicalHistory = String(json["medicalHistory"] || "");

    return new Patient({
      id,
      firstName,
      lastName,
      birthDate,
      gender,
      departmentId,
      medicalHistory,
    });
  }

  toJsonDTO() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate.toISOString(),
      gender: this.gender,
      departmentId: this.departmentId,
      medicalHistory: this.medicalHistory,
    };
  }
}
