import { createContext } from "react";
import { Login } from "../../types/User";

export type AuthContextType = {
  user: Login | null;
  signin: (name: string, pass: string) => Promise<boolean>;
  signup: (name: string, pass: string, Rpass: string) => Promise<boolean>;
  signout: () => void;
  createTask: (
    description: string,
    detail: string,
    name: string
  ) => Promise<any>;
  loadTask: (token: string) => Promise<any>;
  deletTask: (id: string) => Promise<any>;
  editTask: (
    id: string,
    description: string,
    detail: string,
    name: string
  ) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>(null!);
