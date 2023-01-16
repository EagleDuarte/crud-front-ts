import { ChangeEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("authToken") || "";

  const [name, setEmail] = useState("");
  const [pass, setPassword] = useState("");

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (name && pass) {
      const isLogged = await auth.signin(name, pass);
      if (isLogged || userToken) {
        navigate("/private");
        auth.loadTask(userToken);
      } else {
        alert("Não deu certo.");
      }
    }
  };

  return (
    <>
      <div className="container w-75 mt-5 rounded-4 shadow">
        <div className="row bg-white rounded-4 align-items-md-stretch">
          <div className="col bg d-none d-md-block col-md-5 col-lg-6 col-xl-6 rounded-4"></div>
          <div className="col">
            <h2 className="fw-bold text-center pt-4 mb-4">
              Olá, seja bem vindo!{" "}
            </h2>
            <div className="mb-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={handleEmailInput}
              />
            </div>
            <div className="mb-6 mt-2">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                className="form-control"
                type="password"
                value={pass}
                onChange={handlePasswordInput}
              />
            </div>
            <div className="d-grid mt-2">
              <button onClick={handleLogin} className="btn btn-success">
                Realizar Login
              </button>
            </div>
            <div className="my-4">
              <Link to="/signup">Não possui conta? Clique aqui.</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
