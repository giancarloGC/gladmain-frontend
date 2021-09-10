import React, {useState, useEffect} from 'react';
import { Container, Button, Form, InputGroup, Card, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import ImageMen from "../../../assets/img/men.png";
import { Formik, Field, ErrorMessage } from "formik";
import { getUserByIdApi } from "../../../api/user";

export default function DetailsUser(){
  const [user, setUser] = useState({});
  const [ loaded, setLoaded ] = useState(false);
  /*useEffect(() => {
    getUserByIdApi(documento, token).then(response => {
        setUser(response);
        setLoaded(true);
    })
  }, []);*/

  return(
    <Container>
        <Row >
        <Col sm={2}></Col>
        <Col sm={1} ></Col>
        <Col sm={6} background="background-color:#A42D55"> 
          <Formik
                initialValues={{ 
                  documento: '',
                  tipoDocumento: '',
                  nombre: '',
                  sexo: '',
                  fechaNacimiento: '',
                  celular: '',
                  edad: '',
                  municipio: '',
                  direccion: '',
                  correoElectronico: '',
                  clave: '',
                  meses: false
                }}
                
                validate={(valores) => {
                  let errores = {};

                  if(!valores.documento){
                    errores.documento = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.documento)){
                    errores.documento = 'Solo puedes escribir números';
                  }
                  if(!valores.tipoDocumento){
                    errores.tipoDocumento = 'Asegurese de selecionar una opción';
                  }
                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.sexo){
                    errores.sexo = 'Asegurese de selecionar una opción';
                  }
                  const dateCurrently = new Date();
                  if(!valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently <= valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Seleccione una fecha valida';
                  }
                  if(!valores.celular){
                    errores.celular = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.celular)){
                    errores.celular = 'Teléfono incorrecto, solo puedes escribir números';
                  }  
                  if(!valores.edad){
                    errores.edad = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.edad)){
                    errores.edad = 'Edad incorrecta, solo puedes escribir números';
                  }else if(valores.edad <= 0 || valores.edad > 90){
                    errores.edad = 'Edad invalida, intente con otra';
                  }   
                  if(!valores.municipio){
                    errores.municipio = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.municipio)){
                    errores.municipio = 'Municipio incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.direccion){
                    errores.direccion = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.direccion)){
                    errores.direccion = 'Municipio incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.correoElectronico){
                    errores.correoElectronico = 'Por favor, ingresa números'
                  }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valores.correoElectronico)){
                    errores.correoElectronico = 'Email incorrecto, intente con otro';
                  }

                }}

                onSubmit={(valores, {resetForm}) => {
                  /*  resetForm();
                    valores.token = token;
                    insertUserApi(valores).then(response => {
                        console.log(repsonse);
                  });*/
                }}
                >
                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
           return(

            <Form onSubmit={handleSubmit}>
            <Card style={{ width: '600px' }} >
            <Card.Img variant="top" src={ImageMen} style={{"max-width": "200px"}} roundedCircle className="row justify-content-center align-self-center mt-3"/>
            <Card.Body>
            <Card.Title className="text-center">Harold Moreno</Card.Title>
              <Card.Text style={{"color": "#134B8B"}}>
               Administrador
              </Card.Text>
            </Card.Body>
            </Card>

            <Row>
            <Col md={6}>
            <ListGroup className="list-group-flush ">
              <ListGroupItem>Tipo Documento:</ListGroupItem>
              <ListGroupItem>Documento:</ListGroupItem>
              <ListGroupItem>Sexo:</ListGroupItem>
              <ListGroupItem>Fecha de Nacimiento:</ListGroupItem>
              <ListGroupItem>Edad:</ListGroupItem>
              <ListGroupItem>Celular:</ListGroupItem>
              <ListGroupItem>Municipio:</ListGroupItem>
              <ListGroupItem>Dirección:</ListGroupItem>
              <ListGroupItem>Correo Electronico:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={6}>
            <ListGroup className="list-group-flush">
            <ListGroupItem>Cedula de Ciudadania</ListGroupItem>
              <ListGroupItem>10923452378</ListGroupItem>
              <ListGroupItem>MASCULINO</ListGroupItem>
              <ListGroupItem>14/septiembre/1996</ListGroupItem>
              <ListGroupItem>24</ListGroupItem>
              <ListGroupItem>324 567 4567</ListGroupItem>
              <ListGroupItem>Cúcuta</ListGroupItem>
              <ListGroupItem>Av. 0 # 0 - 0 Bario jdhb</ListGroupItem>
              <ListGroupItem>hsms.2020@mail.com</ListGroupItem>
            </ListGroup>
            </Col>
            </Row>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
                  
            </Form>
            );
          }}
            </Formik> 
            </Col>
            <Col sm={3}></Col>
        </Row>
        </Container>
    )
    
}