import { useContext, useState, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Editar: any = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  //------FUNÇÕES NÃO UTILIZADAS NESSE PROJETO-----
  // const userName = localStorage.getItem("authName");
  const userToken = localStorage.getItem("authToken");

  const params = useParams();
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDetailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDetail(event.target.value);
  };

  function voltar() {
    navigate("/private");
  }

  function loadName() {
    const user = JSON.parse(localStorage.getItem("authData") || "");
    if (user) setName(user.data._name);
  }

  async function handleEditTask() {
    setDescription(description);
    setDetail(detail);
    loadName();

    if (params) {
      const id = params.id;
      if (id) {
        await auth.editTask(id, description, detail, name);
      }
    }
    navigate("/private");
  }

  return (
    <>
      <div className="container mt-5 rounded-4 shadow">
        <div className="row bg-white rounded-4 align-items-md-stretch">
          <header className="container-fluid bg-white rounded-4">
            <div className="">
              <h3 className="fw-bold text-center p-2">
                Deseja atualizar seus recados?
              </h3>
              <p className="text-center h3-2">Realize as alterações abaixo:</p>
            </div>
          </header>
        </div>
      </div>
      <div className="container shadow">
        <Form
          className="row  mt-2 bg-white rounded-4"
          onSubmit={handleEditTask}
        >
          <Form.Group className="col-12 col-sm-12 m-1">
            <Form.Control
              type="text"
              placeholder="Descrição"
              name="description"
              id="description"
              onChange={handleDescriptionInput}
            />
          </Form.Group>
          <Form.Group className="col-12 col-sm-12 m-1">
            <Form.Control
              type="text"
              placeholder="Detalhamento"
              name="detail"
              id="detail"
              onChange={handleDetailInput}
            />
          </Form.Group>
          <Form.Group className="row m-1">
            <Button
              className=" btn col-12 col-sm-2 m-1"
              variant="success"
              type="submit"
            >
              Salvar Alterações
            </Button>
            <Button
              className=" btn col-12 col-sm-2 m-1"
              variant="primary"
              onClick={voltar}
            >
              Cancelar
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
