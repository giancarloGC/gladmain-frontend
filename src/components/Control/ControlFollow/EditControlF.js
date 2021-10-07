import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import { updateSegApi } from "../../../api/follow-up";
import swal from 'sweetalert';
import moment from 'moment';

export default function EditControlF(props){
  const { infoSeg, userControl, documento } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');

  var documertParse = parseInt( documentoLogin[0]);

  const dateFormat = (date) => {
    if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
    }
  }

    return(
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}}>
                <Col sm={1}></Col>
                <Col sm={10} className="mt-2 mb-4"> 
                <Formik
                
                initialValues={{ 
                    id: infoSeg.id,
                    fecha: infoSeg.fecha,
                    tipoDocAcudiente: infoSeg.tipoDocAcudiente,
                    numeroDocAcudiente: infoSeg.numeroDocAcudiente,
                    nombreAcudiente: infoSeg.nombreAcudiente,
                    tipoDocumento: userControl.tipoDocumento,
                    idUsuario: userControl.documento,
                    nombre: userControl.nombre,
                    celular: userControl.celular,
                    idUsuarioNutricionista: documertParse,
                }}
                
                validate={(valores) => {
                  let errores = {};

                  const dateCurrently2 = new Date();
                  
                  if(!valores.tipoDocAcudiente){
                    errores.tipoDocAcudiente = 'Asegurese de selecionar una opción';
                  }

                  if(!valores.nombreAcudiente){
                    errores.nombreAcudiente = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAcudiente)){
                    errores.nombreAcudiente = 'Nombre incorrecto, solo puedes escribir letras';
                  }

                  let docuemnt3 = valores.numeroDocAcudiente;
                  if(!valores.numeroDocAcudiente){
                    errores.numeroDocAcudiente = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.numeroDocAcudiente)){
                    errores.numeroDocAcudiente = 'Documento incorrecto, solo puedes escribir números';
                  }else if(docuemnt3.length <= 8 || docuemnt3.length > 15){
                    errores.numeroDocAcudiente = 'Documento invalido, intente con otro';
                  }  

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {

                  const formData={
                    id: infoSeg.id,
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    nombreAcudiente: valores.nombreAcudiente,
                    tipoDocAcudiente: valores.tipoDocAcudiente,
                    numeroDocAcudiente: valores.numeroDocAcudiente,
                    fecha: valores.fecha,
                    vigente: true,
                }

                  console.log(formData);
                  //resetForm();
                  formData.token = token;
                  updateSegApi(formData, token).then(response => {
                    console.log(response);
                    if(response === true){
                      swal({
                        title: `¡El Seguimiento fue editado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        window.location.replace(`/admin/ListFollowUp/${userControl.documento}`);
                    }); 
                    }else{
                      swal({
                        title: `¡Opss, ocurrió un error!`,
                        icon: 'danger'
                      }).then((value) => {
                        window.location.replace(`/admin/ListFollowUp/${userControl.documento}`);
                    });    
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
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>No. Seguimiento</Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={infoSeg.id} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.idSeguimiento && touched.idSeguimiento}
                               isValid={!errors.idSeguimiento && touched.idSeguimiento} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idSeguimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        <Col sm="4"> </Col>

                        <Form.Label column sm="1" style={{"fontSize": "12px !important"}}>Fecha </Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fecha" name="fecha" 
                                 value={dateFormat(infoSeg.fecha)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fecha && touched.fecha}
                                 isValid={!errors.fecha && touched.fecha} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fecha}
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
                            <Form.Select  size="lg" id="tipoDocAcudiente" name="tipoDocAcudiente" onChange={handleChange} onBlur={handleBlur}
                                   defaultValue={infoSeg.tipoDocAcudiente} isValid={!errors.tipoDocAcudiente && touched.tipoDocAcudiente} isInvalid={!!errors.tipoDocAcudiente && touched.tipoDocAcudiente}
                            >
                            <option disabled selected >Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
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
                            defaultValue={infoSeg.numeroDocAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.numeroDocAcudiente && touched.numeroDocAcudiente}
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
                               defaultValue={infoSeg.nombreAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAcudiente && touched.nombreAcudiente}
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
                            <Form.Select  size="lg" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                    value={userControl.tipoDocumento} isValid={!errors.tipoDocumento && touched.tipoDocumento} 
                                    isInvalid={!!errors.tipoDocumento && touched.tipoDocumento} disabled
                            >
                            <option disabled >Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
                            <option value="CE">Cédula de extranjería</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.tipoDocumento}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                       
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Número Documento</Form.Label>
                            <Col md={4}>
                            <InputGroup hasValidation>
                            <Form.Control  type="text" placeholder="Número documento" size="lg" id="idUsuario" name="idUsuario" 
                            value={infoSeg.idUsuario} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.idUsuario}
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

                    <Form.Group as={Row} className="mb-1">
                    <Col md={6}>        
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                               Guardar
                            </Button>
                        </div>
                      </Col>
                      <Col md={6}> 
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="primary" size="lg" href={`/admin/editInfantIncome/${infoSeg.id}/${documento}`}>
                               Editar Ingreso
                            </Button>
                        </div>
                        </Col>
                      </Form.Group>  
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