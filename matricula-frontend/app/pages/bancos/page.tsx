"use client";

import FeatherIcon from "feather-icons-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import showToast from "@/app/components/utils/toastify";
import Breandcrumb from "@/app/components/breadcrumb";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import fetchData from "@/app/components/api/apiData";
import Paginator from "@/app/components/pagination";

type IBanco = {
  id: number;
  nombre: string;
  direccion: string;
  codigo: string;
};

type DtoResponse = {
  status: number;
  message: string;
};

interface Banco {
  data: IBanco[];
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

export default function Banco() {
  const [show, setShow] = useState<boolean>(false);
  const [esModoEditar, setEsModoEditar] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const [listadoBancos, setListadoBancos] = useState<IBanco[] | null>(null);
  const [buscar, setBuscar] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);

  const [banco, setBanco] = useState({
    nombre: "",
    direccion: "",
    codigo: "",
  });

  // Inicializar el sweetalert
  const MySwal = withReactContent(Swal);

  const handleClose = () => {
    setShow(false);
    setEsModoEditar(false);
    setValidated(false);
    setBanco({
      nombre: "",
      direccion: "",
      codigo: "",
    });
  };

  const obtenerListadoBancos = useCallback(
    async (buscar: string, page: number) => {
      try {
        const resultado = await fetchData<Banco>(
          `/obtener-bancos?nombre=${buscar}&page=${page}&perPage=${perPage}`
        );
        setListadoBancos(resultado.data);
        setTotal(resultado.total);
        setLastPage(resultado.lastPage);
      } catch (error) {
        console.log(error);
      }
    },
    [perPage]
  );

  useEffect(() => {
    obtenerListadoBancos(buscar, page);
  }, [buscar, page, obtenerListadoBancos]);

  const handleChangeBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscar(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanco({ ...banco, [name]: value.toUpperCase() });
  };

  const handleGuardar = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);

      /* if (!banco.nombre || !banco.direccion || !banco.codigo) {
        showToast({ message: "Campos obligatorios", type: "warning" });
      } */
      return;
    }
    e.preventDefault();
    try {
      const resultado = await fetchData<DtoResponse>("/crear-banco", {
        method: "POST",
        data: banco,
      });
      showToast({ message: resultado.message, type: "success" });
      handleClose();
      obtenerListadoBancos(buscar, page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleEliminar = async () => {
    MySwal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (resultado) => {
      if (resultado.isConfirmed) {
        showToast({ message: "Eliminado de forma correcta", type: "success" });
      }
    });
  };

  return (
    <>
      <Breandcrumb titulo="Listado de bancos" />

      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="primary-outline"
          className="btn btn-outline-primary"
          onClick={handleShow}
        >
          <FeatherIcon icon="plus" />
          Agregar Banco
        </Button>
        <Form.Control
          type="text"
          value={buscar}
          onChange={handleChangeBuscar}
          className="form-control w-50"
          placeholder="Buscar bancos..."
        />
      </div>

      <div className="table-responsive">
        <Table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">BANCO</th>
              <th scope="col">DIRECCIÓN</th>
              <th scope="col">CÓDIGO</th>
              <th scope="col" className="text-center">
                OPCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            {listadoBancos ? (
              listadoBancos.map((banco, index) => (
                <tr key={banco.id}>
                  <td className="centered-cell">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="centered-cell">{banco.nombre}</td>
                  <td className="centered-cell">{banco.direccion}</td>
                  <td className="centered-cell">{banco.codigo}</td>
                  <td className="text-center centered-cell">
                    <Button
                      variant="primary-outline"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <FeatherIcon icon="edit-2" />
                    </Button>
                    <Button
                      variant="danger-outline"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={handleEliminar}
                    >
                      <FeatherIcon icon="trash" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Paginator
          currentPage={page}
          lastPage={lastPage}
          onPageChange={handlePageChange}
        />
      </div>

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
        <Form noValidate validated={validated} onSubmit={handleGuardar}>
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
              <Form.Control.Feedback type="invalid">
                Por favor ingrese el nombre del banco
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                Por favor ingrese la direccion
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                Por favor ingrese el codigo del banco
              </Form.Control.Feedback>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              type="button"
              onClick={handleClose}
            >
              Cerrar
            </Button>
            <Button variant="outline-primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
}
