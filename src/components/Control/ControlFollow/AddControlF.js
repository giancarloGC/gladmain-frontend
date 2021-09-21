import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { insertSegApi } from "../../../api/follow-up";
import moment from 'moment';

export default function AddControlF(props){
  const { userControl } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');
  const [ goRedirect, setGoRedirect ] = useState(false);

    return(
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}}>
                <Col sm={1}></Col>
                <Col sm={10} className="mt-2 mb-4"> 
                <Formik
                initialValues={{ 
                    fechaSeg: '',
                    tipoDocAcudiente: '',
                    numeroDocAcudiente: '',
                    nombreAcudiente: '',

                    tipoDocumento: '',
                    idUsuario: '',
                    nombre: '',
                    celular: '',
                    estadoNutricional: '',
                    idUsuarioNutricionista: '',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.tipoDocumento){
                    errores.tipoDocumento = 'Asegurese de selecionar una opción';
                  }
                  if(!valores.idUsuario){
                    errores.idUsuario = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.idUsuario)){
                    errores.idUsuario = 'Documento incorrecto, solo puedes escribir números';
                  }
                  let docuemnt = toString(valores.idUsuario);
                  if(docuemnt.length <= 0 || docuemnt.length > 15){
                    errores.idUsuario = 'Documento invalido, intente con otro';
                  }      
                  if(!valores.celular){
                    errores.celular = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.celular)){
                    errores.celular = 'Teléfono incorrecto, solo puedes escribir números';
                  } 
                  if(!valores.nombreAcudiente){
                    errores.nombreAcudiente = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAcudiente)){
                    errores.nombreAcudiente = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.numeroDocAcudiente){
                    errores.numeroDocAcudiente = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.numeroDocAcudiente)){
                    errores.numeroDocAcudiente = 'Documento incorrecto, solo puedes escribir números';
                  }
                  let docuemnt3 = toString(valores.numeroDocAcudiente);
                  if(docuemnt3.length <= 0 || docuemnt3.length > 15){
                    errores.numeroDocAcudiente = 'Documento invalido, intente con otro';
                  }    
                  if(!valores.estadoNutricional){
                    errores.estadoNutricional = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.estadoNutricional = 'Solo puedes escribir letras';
                  }  
                }}

                onSubmit={(valores, {resetForm}) => {

                  var documertParse = parseInt( documentoLogin[0]);
                  const formData = {
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    nombreAcudiente: valores.nombreAcudiente,
                    tipoDocAcudiente: valores.tipoDocAcudiente,
                    numeroDocAcudiente: valores.numeroDocAcudiente,
                    fecha: moment().format("YYYY-MM-DD")
                }
                console.log(formData);
                //resetForm();
                  valores.token = token;
                  insertSegApi(formData, token).then(response => {
                    console.log(response);
                    if(response === true){
                      console.log("registro Seguimiento");
                      setGoRedirect(true);
                    }else{
                      console.log("No registro Seguimiento");
                      //setGoRedirect(true);
                    }
                  });
                }}
                >

                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-1 mt-3">
                        <Form.Label column sm="1" style={{"fontSize": "12px !important"}}>Fecha </Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaSeg" name="fechaSeg" 
                                 value={moment().format("YYYY-MM-DD")} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaSeg && touched.fechaSeg}
                                 isValid={!errors.fechaSeg && touched.fechaSeg} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaSeg}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <center>
                    <Form.Label column sm="4" style={{"fontSize": "12px !important"}} className="align-self-center justify-content-around mb-4"> <u>INFORMACIÓN DEL ACUDIENTE </u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                     <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Tipo de Documento</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Select  size="lg" name="tipoDocAcudiente" id="tipoDocAcudiente" onChange={handleChange} onBlur={handleBlur}
                                isValid={!errors.tipoDocAcudiente && touched.tipoDocAcudiente} isInvalid={!!errors.tipoDocAcudiente && touched.tipoDocAcudiente}
                            >
                            <option disabled selected>Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="CE">Cédula de extranjería</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.tipoDocAcudiente}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Número Documento</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="documento acudiente" size="lg" id="numeroDocAcudiente" name="numeroDocAcudiente" 
                            value={values.numeroDocAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.numeroDocAcudiente && touched.numeroDocAcudiente}
                            isValid={!errors.numeroDocAcudiente && touched.numeroDocAcudiente}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.numeroDocAcudiente}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3 mt-3">
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Nombre</Form.Label>
                    <Col md={10}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre del Acudiente" size="lg" id="nombreAcudiente" name="nombreAcudiente" 
                               value={values.nombreAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAcudiente && touched.nombreAcudiente}
                               isValid={!errors.nombreAcudiente && touched.nombreAcudiente}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAcudiente}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                    </Form.Group>

                    <center>
                    <Form.Label column sm="4" style={{"fontSize": "12px !important"}} className="align-self-center justify-content-around mb-4 mt-3"> <u>INFORMACIÓN DEL USUARIO </u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Tipo de Documento</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" size="lg" id="nombreAcudiente" name="tipoDocumento" 
                               value={userControl.tipoDocumento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.tipoDocumento && touched.tipoDocumento}
                               isValid={!errors.tipoDocumento && touched.tipoDocumento} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                       
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Número Documento</Form.Label>
                            <Col md={4}>
                            <InputGroup hasValidation>
                            <Form.Control  type="text" placeholder="Número documento" size="lg" id="idUsuario" name="idUsuario" 
                            value={userControl.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.idUsuario}
                            isValid={!errors.idUsuario && touched.idUsuario} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idUsuario}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Nombre </Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="nombre usuario" size="lg" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                               isValid={!errors.nombre && touched.nombre} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Celular</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí Teléfono" size="lg" id="celular" name="celular" 
                            value={userControl.celular} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.celular && touched.celular}
                            isValid={!errors.celular && touched.celular} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.celular}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>           

                    {goRedirect && (
                      <Redirect to={`/admin/addInfantIncome`} />
                    )}            
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg" >
                               Siguiente
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
                <Col sm={1}></Col>
            </Row>
        </Container>
    )

}