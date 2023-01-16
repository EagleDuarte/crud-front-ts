import { useContext, useEffect, useState } from "react";
import { Recados } from "../../components/Recados/Recados";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Private = () => {
  const auth = useContext(AuthContext);
  const userToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (userToken) {
      auth.loadTask(userToken);
    }
  }, []);

  return (
    <div>
      <Recados />
    </div>
  );
};
