import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function UserCreate(props) {
  const [user, setUser] = useState(false);
  useEffect(() => {}, [props.user]);

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    props.setUserToCreate({ ...props.userToCreate, [name]: value });
  }

  function handleCreateUser() {
    const list = [...props.data];
    axios
      .post("http://127.0.0.1:8000/api/usuarios/", props.userToCreate)
      .then((result) => {
        list.push(props.userToCreate);
        console.log(list);
        props.setData(list);
        props.showFunction(false);
      });
  }

  function handleClose() {
    props.showFunction(false);
  }
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Nombre</InputGroup.Text>
          <FormControl
            name="nombre"
            value={props.userToCreate.nombre}
            onChange={handleChange}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Apellido</InputGroup.Text>
          <FormControl
            name="apellido"
            value={props.userToCreate.apellido}
            onChange={handleChange}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Edad</InputGroup.Text>
          <FormControl
            name="edad"
            value={props.userToCreate.edad}
            onChange={handleChange}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Grabar
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default UserCreate;
