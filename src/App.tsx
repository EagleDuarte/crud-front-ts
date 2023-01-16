import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./contexts/Auth/RequireAuth";
import { Private } from "./pages/Private";
import { Recados } from "./components/Recados/Recados";
import { Login } from "./pages/Login";
import { CriarLogin } from "./pages/CriarLogin";
import { Formulario } from "./components/Formulario/Formulario";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";
import { Editar } from "./components/Editar/Editar";

function App() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("authToken");
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (userToken) {
      auth.loadTask(userToken);
      console.log("app");
      navigate("/private");
    }
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<CriarLogin />} />
        <Route
          path='/tasks'
          element={
            <RequireAuth>
              <Recados />
            </RequireAuth>
          }
        />
        <Route
          path='/new_tasks'
          element={
            <RequireAuth>
              <Formulario />
            </RequireAuth>
          }
        />
        <Route
          path='/edit_tasks/:id'
          element={
            <RequireAuth>
              <Editar />
            </RequireAuth>
          }
        />
        <Route
          path='/private'
          element={
            <RequireAuth>
              <Private />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
