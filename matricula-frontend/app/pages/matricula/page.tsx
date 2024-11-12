"use client";
import Breandcrumb from "@/app/components/breadcrumb";
import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

const Matricula = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
  const [showModalPay, setShowModalPay] = useState<boolean>(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenModalDetail = () => setShowModalDetail(true);
  const handleCloseModalDetail = () => setShowModalDetail(false);

  const handleOpenModalPay = () => setShowModalPay(true);
  const handleCloseModalPay = () => setShowModalPay(false);
  return (
    <>
      <Breandcrumb titulo="Lista de matriculados" />
      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="primary-outline"
          className="btn btn-outline-primary"
          onClick={handleOpenModal}
        >
          <FeatherIcon icon="plus" />
          Realizar matricula
        </Button>
        <Form.Select className="form-select-sm w-25">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Form.Select>
        <Form.Control
          type="text"
          className="form-control w-50"
          placeholder="Buscar..."
        />
        <Button variant="warning-outline" className="btn btn-outline-warning">
          <FeatherIcon icon="download" size={20} />
          Reporte
        </Button>
      </div>

      <div className="table-responsive">
        <Table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">COD MATRICULA</th>
              <th scope="col">ESTUDIANTE</th>
              <th scope="col">NIVEL</th>
              <th scope="col">GRADO</th>
              <th scope="col">SECCION</th>
              <th scope="col">SITUACION</th>
              <th scope="col" className="text-center">
                OPCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="centered-cell">1</td>
              <td className="centered-cell">
                <Button variant="link" onClick={handleOpenModalDetail}>
                  LP769576806
                </Button>
              </td>
              <td className="centered-cell">LEODAN PEREZ</td>
              <td className="centered-cell">SECUNDARIA</td>
              <td className="centered-cell">2 GRADO</td>
              <td className="centered-cell">A</td>
              <td className="centered-cell">PROMOVIDO</td>
              <td className="text-center centered-cell">
                <Button
                  variant="primary-outline"
                  className="btn btn-outline-primary btn-sm"
                  type="submit"
                >
                  <FeatherIcon icon="edit" />
                </Button>
                <Button
                  variant="danger-outline"
                  className="btn btn-outline-danger btn-sm ms-2"
                >
                  <FeatherIcon icon="trash-2" />
                </Button>
                <Button
                  variant="warning-outline"
                  className="btn btn-outline-warning btn-sm ms-2"
                  onClick={handleOpenModalPay}
                >
                  <FeatherIcon icon="shopping-cart" />
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={8} className="text-center">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
            <tr>
              <td colSpan={8} className="text-center">
                No hay datos disponibles
              </td>
            </tr>
          </tbody>
        </Table>
        {/* <Paginator
          currentPage={page}
          lastPage={lastPage}
          onPageChange={handlePageChange}
        /> */}
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar matricula</Modal.Title>
        </Modal.Header>
        <Form noValidate>
          <Modal.Body>
            <h6>Datos personales</h6>
            <Row>
              <Form.Group as={Col} md="6" controlId="validate1">
                <Form.Label className="form-label">DNI</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="DNI del estudiante"
                    name="nombre"
                    required
                  />
                  <Button variant="outline-primary">
                    <FeatherIcon icon="search" /> Buscar
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validate2">
                <Form.Label className="form-label">NOMBRES</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nombres"
                    name="nombre"
                    disabled
                    readOnly
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md="6" controlId="validate2">
                <Form.Label className="form-label">APELLIDOS</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="users" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Apellidos"
                    name="nombre"
                    disabled
                    readOnly
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validate2">
                <Form.Label className="form-label">FECHA NACIMIENTO</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="calendar" />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="nombre"
                    disabled
                    readOnly
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <hr className="my-6 mx-n4" />
            <h6>Detalle de matricula</h6>
            <Row>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">NIVEL</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Select name="nombre" required>
                    <option value="">Seleccione...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">GRADO</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Select name="nombre" required>
                    <option value="">Seleccione...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">SECCION</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Select name="nombre" required>
                    <option value="">Seleccione...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">SITUACION</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="home" />
                  </InputGroup.Text>
                  <Form.Select name="nombre" required>
                    <option value="">Seleccione...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">PROCEDENCIA</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="home" />
                  </InputGroup.Text>
                  <Form.Select name="nombre" required>
                    <option value="">Seleccione...</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">
                  I.E. DE PROCEDENCIA
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="home" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nombre de la I.E"
                    name="institucionProcedencia"
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">MATRICULA</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Costo de matricula"
                    name="institucionProcedencia"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validate2">
                <Form.Label className="form-label">MENSUALIDAD</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Mensualidad"
                    name="institucionProcedencia"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validate2">
                <Form.Label className="form-label">DESCUENTO</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="percent" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="0"
                    name="institucionProcedencia"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validate2">
                <Form.Label className="form-label">MENS. FINAL</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="0"
                    name="institucionProcedencia"
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <hr className="my-6 mx-n4" />
            <h6>Datos del apoderado</h6>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">DNI</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Control placeholder="DNI del apoderado" type="text" />
                  <Button variant="outline-primary">
                    <FeatherIcon icon="search" /> Buscar
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label className="form-label">PARENTESCO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Select
                    aria-label="Default select example"
                    name="parentesco"
                  >
                    <option>Seleccione...</option>
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Hermano(a)">Hermano(a)</option>
                    <option value="Tío(a)">Tío(a)</option>
                    <option value="Abuelo(a)">Abuelo(a)</option>
                    <option value="Otros">Otros</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label className="form-label">NOMBRES</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    placeholder="Nombres del apoderado"
                    name="nombresApoderado"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">APELLIDOS</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="users" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    placeholder="Apellidos del apoderado"
                    name="apellidosApoderado"
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              type="button"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button variant="outline-primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showModalDetail}
        onHide={handleCloseModalDetail}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalle de la matricula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table className="table table-bordered">
              <tbody>
                <React.Fragment key={1}>
                  <tr>
                    <td scope="col">Codigo</td>
                    <td scope="col">LP769576806</td>
                  </tr>
                  <tr>
                    <td scope="col">Estudiante</td>
                    <td scope="col">Leodan Perez</td>
                  </tr>
                  <tr>
                    <td scope="col">Genero</td>
                    <td scope="col">Masculino</td>
                  </tr>
                  <tr>
                    <td scope="col">Fecha Nacimiento</td>
                    <td scope="col">27/09/1998</td>
                  </tr>
                  <tr>
                    <td scope="col">Nivel</td>
                    <td scope="col">Secundaria</td>
                  </tr>
                  <tr>
                    <td scope="col">Grado</td>
                    <td scope="col">2 Grado</td>
                  </tr>
                  <tr>
                    <td scope="col">Fecha de matricula</td>
                    <td scope="col">11/11/2024</td>
                  </tr>
                  <tr>
                    <td scope="col">Situacion</td>
                    <td scope="col">Promovido</td>
                  </tr>
                  <tr>
                    <td scope="col">Apoderado</td>
                    <td scope="col">Alberto Otarola</td>
                  </tr>
                  <tr>
                    <td scope="col">Parentesco</td>
                    <td scope="col">Padre</td>
                  </tr>
                  <tr>
                    <td scope="col">Contacto</td>
                    <td scope="col">940484565656</td>
                  </tr>
                </React.Fragment>
                <tr>
                  <td colSpan={5} className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table className="table table-bordered">
              <tbody>
                <React.Fragment key={1}>
                  <tr>
                    <td>Costo de matrícula</td>
                    <td>S/ 120</td>
                  </tr>
                  <tr className="left-cell">
                    <td>Descuento de mensualidad</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>Mensualidad</td>
                    <td>S/ 100</td>
                  </tr>
                  <tr>
                    <td>Total endeudado</td>
                    <td>S/ 1300</td>
                  </tr>
                  <tr>
                    <td>Total pagado</td>
                    <td className="text-success">S/ 0</td>
                  </tr>
                  <tr>
                    <td>Deuda pendiente</td>
                    <td className="text-danger">S/ 1300</td>
                  </tr>
                </React.Fragment>
                <tr>
                  <td colSpan={5} className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-grid gap-2">
              <Button
                variant="secondary-outline"
                className="btn btn-outline-secondary"
                onClick={handleCloseModalDetail}
              >
                Cerrar
              </Button>
              <Button
                variant="warning-outline"
                className="btn btn-outline-warning"
              >
                Imprimir
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalPay}
        onHide={handleCloseModalPay}
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h6>Datos del estudiante</h6>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label className="form-label">
                  CODIGO DE MATRICULA
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Control autoFocus placeholder="Ingrese Codigo" />
                  <Button variant="outline-primary">
                    <FeatherIcon icon="search" /> Buscar
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label className="form-label">ALUMNO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    name="name"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">AULA</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="home" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    name="name"
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="form-label">MATRICULA</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    name="name"
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="form-label">MENSUALIDAD</Form.Label>
                <InputGroup className="mb-1">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    disabled
                    readOnly
                    name="name"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <hr className="my-6 mx-n4" />
            <h6>Detalles del pago</h6>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">CONCEPTO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="user" />
                  </InputGroup.Text>
                  <Form.Select aria-label="Default select example">
                    <option>Seleccione...</option>
                    <option value="1">Mensualidad</option>
                    <option value="2">Matricula</option>
                    <option value="3">Otros</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">CANAL DE PAGO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="credit-card" />
                  </InputGroup.Text>
                  <Form.Select aria-label="Default select example">
                    <option>Seleccione...</option>
                    <option value="1">Caja de la IE</option>
                    <option value="2">BCP</option>
                    <option value="3">INTERBANK</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">MONTO</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">S/</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Monto"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">
                  MENSUALIDAD A PAGAR
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="calendar" />
                  </InputGroup.Text>
                  <Form.Select aria-label="Default select example">
                    <option>Seleccione...</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="form-label">NUMERO DE TICKET</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon1">
                    <FeatherIcon icon="bookmark" />
                  </InputGroup.Text>
                  <Form.Control type="text" name="name" required />
                </InputGroup>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary-outline"
            type="submit"
            className="btn btn-outline-secondary"
          >
            <FeatherIcon icon="x" />
            Cancelar
          </Button>

          <Button
            variant="primary-outline"
            type="submit"
            className="btn btn-outline-primary"
          >
            <FeatherIcon icon="save" size={21} />
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Matricula;
