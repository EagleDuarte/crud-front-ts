import { useEffect, useState } from "react";
import { settingApi } from "../../hooks/settingApi";
import { Login } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<Login | null>(null);
  const [name, setName] = useState("");
  const api = settingApi();

  function loadName() {
    const user = JSON.parse(localStorage.getItem("authData") || "");
    if (user) setName(user.data._name);
    return user.data._name;
  }

  const signin = async (name: string, pass: string) => {
    const data = await api.signin(name, pass);
    if (data.ok) {
      setUser(data);
      setToken(data.token);
      setData(data);
      return true;
    }
    return false;
  };

  const signup = async (name: string, pass: string, Rpass: string) => {
    const data = await api.signup(name, pass, Rpass);
    if (data.ok) {
      setUser(data);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signout = () => {
    console.log("signout está sendo executada.");
    setUser(null);
    setToken("");
    setData("");
  };

  const loadTask = async (token: string) => {
    if (token) {
      const data = await api.loadTask(loadName());
      if (data) {
        setUser(data.data);
        return data.data;
      }
    }
    return false;
  };

  const createTask = async (
    description: string,
    detail: string,
    name: string
  ) => {
    const data = await api.createTask(description, detail, name);
    if (data.ok) {
      setUser(data);
      return true;
    }
    return false;
  };

  const editTask = async (
    id: string,
    description: string,
    detail: string,
    name: string
  ) => {
    const data = await api.editTask(id, description, detail, name);
    if (data.ok) {
      setUser(data);
      return true;
    }
    return false;
  };

  const deletTask = async (id: string) => {
    const data = await api.deletTask(id);
    return data;
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const setData = (data: any) => {
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const setUserName = (data: string) => {
    localStorage.setItem("authName", JSON.stringify(data));
  };

  const setUserId = (data: string) => {
    localStorage.setItem("authId", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signup,
        signout,
        createTask,
        loadTask,
        deletTask,
        editTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
