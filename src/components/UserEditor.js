import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function UserEditor(props) {
  
  const [user, setUser] = useState(props.data.filter((element) => element.id === props.user.id)[0]);
  /* const user = props.data.filter((element) => element.id === props.user.id)[0]; */
  const [inputValue, setInputValue] = useState({
    nombre: user ? user.nombre : "",
    apellido: user ? user.apellido : "",
    edad: user ? user.edad : "",
  });
  useEffect(() => {
    const filterUser = props.data.filter((element) => element.id === props.user.id)[0];
    setInputValue(filterUser);
  },[props.user]);

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  }

  function handleUpdate(){
    axios.put(`http://127.0.0.1:8000/api/usuarios/${props.user.id}`,inputValue)
    .then(() => alert("Cambios actualizados exitosamente"))
    .then(()=>{
      // Actualizacion del hook data [{}, {}]
      const list = props.data.map((e) =>
        e.id === props.user.id ? { ...e, ...inputValue} : e
      )
      props.setData(list)
      // cambiar el objeto que se actualizo.
    })
    

    
  }


  console.log(inputValue);
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modificar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Nombre</InputGroup.Text>
          <FormControl
            name="nombre"
            value={inputValue.nombre}
            onChange={handleChange}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Apellido</InputGroup.Text>
          <FormControl
            name="apellido"
            value={inputValue.apellido}
            onChange={handleChange}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Edad</InputGroup.Text>
          <FormControl
            name="edad"
            value={inputValue.edad}
            onChange={handleChange}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Cerrar</Button>
        <Button variant="primary" onClick={handleUpdate}>Grabar</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default UserEditor;
