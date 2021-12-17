import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import UserEditor from "./UserEditor";

function Listar() {
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/usuarios").then((result) => {
      //console.log(result);
      setData(result.data);
    });
  }, []);

  function handleDelete(id) {
    axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}`).then((result) => {
      const newData = data.filter((user) => user.id !== id);
      setData(newData);
    });
  }

  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowEdit(true);
  };

  // function handleCreate(){
  //   axios.post("http://127.0.0.1:8000/api/usuarios/",inputValue)


  // }

 
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#crud">CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="https://es.reactjs.org/" target="_blank">
              React
            </Nav.Link>
            <Nav.Link href="https://laravel.com/" target="_blank">
              Laravel
            </Nav.Link>
            <Nav.Link href="https://www.mysql.com/" target="_blank">
              MySql
            </Nav.Link>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {showEdit && <UserEditor setData={setData} data={data} user={userToEdit} />}
      <br />
      <Button variant="outline-success" onClick={()=>(setShowEdit(true))}>Agregar</Button> <br />
      {""}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem) => (
            <>
              <tr>
                <td>{elem.id}</td>
                <td>{elem.nombre}</td>
                <td>{elem.apellido}</td>
                <td>{elem.edad}</td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(elem)}
                >
                  editar
                </Button>
                {""}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(elem.id)}
                >
                  eliminar
                </Button>
                {""}
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Listar;