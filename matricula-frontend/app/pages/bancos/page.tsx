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
  const [seleccionarBancoId, setSeleccionarBancoId] = useState<number | null>(
    null
  );

  const [listadoBancos, setListadoBancos] = useState<IBanco[] | null>(null);
  const [buscar, setBuscar] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);
  const [selectedBanco, setSelectedBanco] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectAll, setSelectAll] = useState<boolean>(false);

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
    setSeleccionarBancoId(null);
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
    const date = new Date();

    const year = date.getFullYear().toString();
    const day = date.getDate().toString();

    let code = banco.codigo;

    if (name === "nombre") {
      const bankCode = value
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

      code = bankCode + day + year;
    }

    setBanco({ ...banco, [name]: value.toUpperCase(), codigo: code });
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
      if (esModoEditar && seleccionarBancoId) {
        const resultado = await fetchData<DtoResponse>(
          `editar-banco/${seleccionarBancoId}`,
          {
            method: "PUT",
            data: banco,
          }
        );
        showToast({ message: resultado.message, type: "success" });
      } else {
        const resultado = await fetchData<DtoResponse>("/crear-banco", {
          method: "POST",
          data: banco,
        });

        if (resultado.status === 422) {
          showToast({ message: resultado.message, type: "error" });
        } else if (resultado.status === 200) {
          showToast({ message: resultado.message, type: "success" });
        } else {
          showToast({ message: resultado.message, type: "error" });
        }
      }

      handleClose();
      obtenerListadoBancos(buscar, page);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleEditar = (banco: IBanco) => {
    setEsModoEditar(true);
    setSeleccionarBancoId(banco.id);
    setBanco({
      nombre: banco.nombre,
      direccion: banco.direccion,
      codigo: banco.codigo,
    });
    setShow(true);
  };

  const handleEliminar = async (id: number) => {
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
        try {
          const resultado = await fetchData<DtoResponse>(
            `/eliminar-banco/${id}`,
            {
              method: "DELETE",
            }
          );
          showToast({ message: resultado.message, type: "success" });
          obtenerListadoBancos(buscar, page);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const descarExcel = async () => {
    try {
      const resultado = await fetchData(`/exportar-excel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.ms-excel",
        },
        responseType: "blob",
      });

      if (!resultado) {
        showToast({ message: "Error al descargar el archivo", type: "error" });
      }

      //convertir la respuesta en un blob (archivo binarios)
      const blob = new Blob([resultado], { type: "application/vnd.ms-excel" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bancos.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();
      //showToast({ message: resultado.message, type: "success" });
      obtenerListadoBancos(buscar, page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeleccionarTodoChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Crear un nuevo objeto de los bancos seleccionados
    const newSelectedBancos = listadoBancos?.reduce((acc, banco) => {
      acc[banco.id] = newSelectAll;
      return acc;
    }, {} as { [key: number]: boolean });

    const data = [21, 23, 23, 33];

    console.log();

    setSelectedBanco(newSelectedBancos);
  };

  //Manejar el checkbox individual
  const handleCheckboxChange = (bancoId: number) => {
    setSelectedBanco((prev) => ({
      ...prev,
      [bancoId]: !prev[bancoId],
    }));
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
        <Form.Select
          className="form-select-sm w-25"
          value={perPage}
          onChange={handlePerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Form.Select>
        <Form.Control
          type="text"
          value={buscar}
          onChange={handleChangeBuscar}
          className="form-control w-50"
          placeholder="Buscar bancos..."
        />
        <Button
          variant="warning-outline"
          className="btn btn-outline-warning"
          onClick={descarExcel}
        >
          <FeatherIcon icon="download" />
          Descargar
        </Button>
      </div>

      <div className="table-responsive">
        <Table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col" className="centered-cell">
                <Form.Check
                  type="checkbox"
                  id="selected-all"
                  checked={selectAll}
                  onChange={handleSeleccionarTodoChange}
                />
              </th>
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
                    <Form.Check
                      type="checkbox"
                      id={`checkbox-${banco.id}`}
                      checked={!!selectedBanco[banco.id]}
                      onChange={() => handleCheckboxChange(banco.id)}
                    />
                  </td>
                  <td className="centered-cell">{banco.nombre}</td>
                  <td className="centered-cell">{banco.direccion}</td>
                  <td className="centered-cell">{banco.codigo}</td>
                  <td className="text-center centered-cell">
                    <Button
                      variant="primary-outline"
                      className="btn btn-outline-primary btn-sm"
                      type="submit"
                      onClick={() => handleEditar(banco)}
                    >
                      <FeatherIcon icon="edit-2" />
                    </Button>
                    <Button
                      variant="danger-outline"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => handleEliminar(banco.id)}
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
                disabled={true}
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
              {esModoEditar ? "Editar Banco" : "Agregar Banco"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
}
