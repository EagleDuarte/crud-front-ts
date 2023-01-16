import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Bem vindo ao GrowNotes!</h1>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
};
