import { useContext, useEffect } from "react";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const userToken = localStorage.getItem("authToken");

  // useEffect(() => {
  //   if (userToken) {
  //     auth.loadTask(userToken);
  //     console.log("requireauth");
  //   }
  // }, []);

  if (!userToken || !auth.user) {
    return <Login />;
  }

  return children;
};
