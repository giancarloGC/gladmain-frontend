import React, {useState, useEffect} from 'react';
import { Container, Button, Form, InputGroup, Card, ListGroup, ListGroupItem, Col, Row, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { getUserByIdApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import { useParams } from "react-router-dom";

import ImageMen from "./../../../assets/img/men.png";
import ImageWomen from "./../../../assets/img/women.png";
import ImageNino from "./../../../assets/img/nino.png";
import ImageNina from "./../../../assets/img/nina.png";

export default function DetailsUser(){
  const { documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [user, setUser] = useState({});
  const [ loaded, setLoaded ] = useState(false);
  const [ userLoaded, setUserLoaded ] = useState(false);

  const formatedDate = (date) => {
    let newDate = date.split("T");
   return newDate[0];
};
  
  useEffect(() => {
    getUserByIdApi(documento, token).then(response => {
        setUser(response);
        setUserLoaded(true);
        setLoaded(true);
    })
  }, []);

  return(
    <Container>
        {!userLoaded ? (
          <Row className="justify-content-md-center text-center">
              <Col md={1} className="justify-content-center">
              <Spinner animation="border" >
              </Spinner> 
              </Col>
          </Row>
        )
        :
        (
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
            {user.edad > 216 ? 
                            <Card.Img variant="top" src={user.sexo === "FEMENINO" ? ImageWomen : ImageMen} style={{"max-width": "200px"}} roundedCircle className="row justify-content-center align-self-center mt-3"/>
                        :
                        <Card.Img variant="top" src={user.sexo === "FEMENINO" ? ImageNina : ImageNino} style={{"max-width": "200px"}} roundedCircle className="row justify-content-center align-self-center mt-3"/>
                            
                    }            

            <Card.Body>
            <Card.Title className="text-center"> {user.nombre}</Card.Title>
            </Card.Body>
            </Card>

            <Row>
            <Col md={6}>
            <ListGroup className="list-group-flush ">
              <ListGroupItem>{user.tipoDocumento}:</ListGroupItem>
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
            <ListGroupItem>{user.documento}</ListGroupItem>
              <ListGroupItem>{user.sexo}</ListGroupItem>
              <ListGroupItem>{formatedDate(user.fechaNacimiento)}</ListGroupItem>
              <ListGroupItem>{user.edad}</ListGroupItem>
              <ListGroupItem>{user.celular}</ListGroupItem>
              <ListGroupItem>{user.municipio}</ListGroupItem>
              <ListGroupItem>{user.direccion}</ListGroupItem>
              <ListGroupItem>{user.correoElectronico}</ListGroupItem>
            </ListGroup>
            </Col>
            </Row>
            </Form>
              );
          }}
            </Formik> 
            </Col>
            <Col sm={3}></Col>
        </Row>
        )}
        </Container>
    )
    
}