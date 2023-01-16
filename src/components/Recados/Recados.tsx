import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import "./Recados.css";
import { useNavigate } from "react-router-dom";
import { Recado } from "../../types/User";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";

export const Recados: any = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Recado[]>([]);
  const [filtrada, setFiltrada] = useState<Recado[]>([]);

  function newTask() {
    navigate("/new_tasks");
  }

  const userToken = localStorage.getItem("authToken");

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  };

  const handleLoadTask = async () => {
    if (userToken) {
      const tasks = await auth.loadTask(userToken);
      setTasks(tasks);
    }
  };

  async function handleDeletTask(id: string) {
    await auth.deletTask(id);
    handleLoadTask();
  }

  function handleEditTask(id: string) {
    navigate(`/edit_tasks/${id}`);
  }

  useEffect(() => {
    handleLoadTask();
  }, []);

  function buscar() {
    let inputBuscaNormal: any = document.querySelector(".input-busca-normal");
    let valueInput = inputBuscaNormal.value.trim();
    let filtrada = filtrar(valueInput);
    valueInput.length != 0 && filtrada.length > 0
      ? console.log("teste")
      : alert("RECADO NÃO ENCONTRADO");
    if (filtrada) {
      setFiltrada(filtrada);
      handleLoadTask();
    }
  }

  const listaTasks = tasks.map((task) => (
    <tr key={task.id}>
      <td className="text-start">{task.description}</td>
      <td className="text-start">{task.detail}</td>
      <td>
        <button
          className="btn btn-primary m-1"
          onClick={() => handleEditTask(task.id)}
        >
          Editar
        </button>
        <button
          className="btn btn-danger m-1"
          onClick={() => handleDeletTask(task.id)}
        >
          Apagar
        </button>
      </td>
    </tr>
  ));

  const listaFiltradaNova = filtrada.map((task) => (
    <tr key={task.id}>
      <td className="text-start">{task.description}</td>
      <td className="text-start">{task.detail}</td>
      <td>
        <button
          className="btn btn-primary m-1"
          onClick={() => handleEditTask(task.id)}
        >
          Editar
        </button>
        <button
          className="btn btn-danger m-1"
          onClick={() => handleDeletTask(task.id)}
        >
          Apagar
        </button>
      </td>
    </tr>
  ));

  let listaRecadosFiltrados: Recado[] = [];

  function filtrar(valueInput: any) {
    let recadosFiltrados = tasks.filter((task) =>
      task.description
        ?.toLocaleLowerCase()
        .includes(valueInput.toLocaleLowerCase())
    );
    listaRecadosFiltrados = recadosFiltrados;
    return recadosFiltrados;
  }

  return (
    <>
      <div className="container mt-5 rounded-4 shadow">
        <div className="row bg-white rounded-4 align-items-md-stretch">
          <header className="container-fluid bg-white rounded-4">
            <div className="">
              <h2 className="fw-bold text-center p-2">GrowNotes - CRUD</h2>
              <p className="text-center p-2">
                Bem vindo, inicie abaixo:{" "}
                <span className="text-center text-decoration-underline fs-4 p-2"></span>
              </p>
              <div>
                <ButtonGroup className="mb-2">
                  <Button onClick={newTask} className="btn btn-dark">
                    Adicionar Recado
                  </Button>
                  <Button onClick={handleLogout} className="btn btn-warning">
                    Sair
                  </Button>
                </ButtonGroup>
                <div>
                  <InputGroup className="justify-content-center">
                    <Button
                      id="btnGroupAddon"
                      variant="outline-secondary"
                      onClick={buscar}
                    >
                      Buscar
                    </Button>
                    <Form.Control
                      type="text"
                      placeholder="Buscar por Descrição"
                      className="input-busca-normal"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
          </header>
          <main>
            {/* <!--LISTA RECADOS--> */}
            <div className="m-2 table-responsive ">
              <table className="table table-hover align-middle" id="note-table">
                <thead className="">
                  <tr className="fw-bold text-start">
                    <th>Descrição</th>
                    <th>Detalhamento</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {filtrada.length > 0 ? listaFiltradaNova : listaTasks}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
