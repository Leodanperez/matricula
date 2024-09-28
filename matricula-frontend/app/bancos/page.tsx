"use client";

import FeatherIcon from "feather-icons-react";
import { FormEvent, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

export default function Banco() {
  //Variable booleano
  const [show, setShow] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>("");
  const [esModoEditar, setEsModoEditar] = useState<boolean>(false);
  const [banco, setBanco] = useState({
    nombre: "",
    direccion: "",
    codigo: "",
  });

  const handleClose = () => {
    setShow(false);
    setTitulo("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanco({ ...banco, [name]: value.toUpperCase() });
  };

  const handleGuardar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(banco);
  }

  const handleShow = (identificador: number) => {
    if (identificador === 1) {
      setTitulo("Agregar Banco");
    } else {
      setTitulo("Editar Banco");
    }
    setShow(true);
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Bancos</h1>
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary" onClick={() => handleShow(1)}>
              Agregar Banco
            </button>
          </div>
        </div>

        <div className="table-responsive small">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Nombre Banco</th>
                <th scope="col">Estado</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>BCP</td>
                <td>Activo</td>
                <td>
                  <div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleShow(2)}
                    >
                      <FeatherIcon icon="edit" />
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <FeatherIcon icon="trash" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {esModoEditar ? "Editar Banco" : "Agregar Banco"}
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleGuardar}>
          <Modal.Body>

            <Form.Label className="form-label">BANCO</Form.Label>            
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FeatherIcon icon="home" />
              </InputGroup.Text>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Nombre del banco"
                name="nombre"
                value={banco.nombre}
                onChange={handleChange}
                required
              />              
            </InputGroup>

            <Form.Label className="form-label">DIRECCIÓN</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FeatherIcon icon="framer" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Dirección del banco"
                name="direccion"
                value={banco.direccion}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <Form.Label className="form-label">CODIGO</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FeatherIcon icon="tag" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Código"
                name="codigo"
                value={banco.codigo}
                onChange={handleChange}
                required
              />
            </InputGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" type="submit">Cerrar</Button>
            <Button variant="outline-primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
