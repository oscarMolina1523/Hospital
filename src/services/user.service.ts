import User from "@/entities/user.model";
import HTTPService from "./http-service";

export default class UserService extends HTTPService {
  private path: string;

  constructor() {
    super();
    this.path = "users";
  }

  async getUsers(): Promise<User[]> {
    const response = await super.get(this.path);
    const data = response.data || [];
    return data.map((item: any) => User.fromJson(item));
  }

  async getById(id: string): Promise<User | null> {
    const response = await super.get(`${this.path}/${id}`);
    if (!response) return null;

    return User.fromJson(response);
  }

  async getUserByDepartment() {
    const response = await super.get(`${this.path}/area`);
    const data = response.data || [];
    return data.map((item: any) => User.fromJson(item));
  }

  async addUser(user: User): Promise<User | null> {
    const body = User.fromJsonModel(user).toJsonDTO();
    const response = await super.post(this.path, body);

    if (!response) return null;
    return User.fromJson(response);
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    const body = User.fromJsonModel(user).toJsonDTO();
    const response = await super.put(`${this.path}/${id}`, body);

    if (!response) return null;
    return User.fromJson(response);
  }

  async deleteUser(id: string): Promise<void> {
    await super.delete(`${this.path}/${id}`);
  }
}
