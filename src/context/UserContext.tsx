// src/context/UserContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import User from "@/entities/user.model";
import type { UserContextType } from "./TypesContext";
import UserService from "@/services/user.service";

const UserContext = createContext<UserContextType | undefined>(undefined);

const userService = new UserService();

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersByDepartment, setUsersByDepartment] = useState<User[]>([]);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<string>();

  const fetchUsers = useCallback(async () => {
    setLoadingUser(true);
    try {
      const allUsers = await userService.getUsers();
      setUsers(allUsers);
    } catch (error) {
      setErrorUser("Error fetching users: " + error);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const fetchUserById = useCallback(async () => {
    setLoadingUser(true);
    try {
      const usersByDept = await userService.getUserByDepartment();
      setUsersByDepartment(usersByDept);
    } catch (error) {
      setErrorUser("Error fetching users by department: " + error);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider
      value={{
        users,
        usersByDepartment,
        loadingUser,
        errorUser,
        fetchUsers,
        fetchUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
