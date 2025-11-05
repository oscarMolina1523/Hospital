import type User from "@/entities/user.model";

export type UserContextType = {
  users: User[];
  usersByDepartment:User[];
  loadingUser: boolean;
  errorUser?: string;
  fetchUsers: () => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
};