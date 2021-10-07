import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { insertSegApi, getSegApi } from "../../../api/follow-up";
import moment from 'moment';
import swal from 'sweetalert';

export default function AddControlF(props){
  const { userControl, rolUser } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');
  const [ goRedirect, setGoRedirect ] = useState(0);

    return(
        <Container>
            <Row>
                <Col sm={1}></Col>
                <Col sm={10} className="mt-2 mb-4" style={{backgroundColor: '#f1f1f1', borderRadius: '5px'}}> 
                <Row className='justify-content-center'>
                <Col sm={11}> 
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
                  if(!valores.tipoDocAcudiente){
                    errores.tipoDocAcudiente = 'Asegurese de selecionar una opción';
                  }
                  if(!valores.numeroDocAcudiente){
                    errores.numeroDocAcudiente = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.numeroDocAcudiente)){
                    errores.numeroDocAcudiente = 'Documento incorrecto, solo puedes escribir números';
                  }
                  if(!valores.nombreAcudiente){
                    errores.nombreAcudiente = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAcudiente)){
                    errores.nombreAcudiente = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {

                  var documertParse = parseInt( documentoLogin[0]);
                  const formData = {
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    nombreAcudiente: valores.nombreAcudiente,
                    tipoDocAcudiente: valores.tipoDocAcudiente,
                    numeroDocAcudiente: parseInt(valores.numeroDocAcudiente),
                    fecha: moment().format("YYYY-MM-DD")
                }
                //resetForm();
                  valores.token = token;
                  insertSegApi(formData, token).then(response => {
                    console.log(response);

                    if(response === true){
                      getSegApi(userControl.documento, token).then(responseSegs => {
                        if(response.status === 403){
                          swal("¡No tienes autorización para realizar esta acción, comunícate con el Admin!", {
                            icon: "warning",
                          });
                        }else{
                          var positionLastSeg = responseSegs.length - 1;
                          var lastSeg = responseSegs[positionLastSeg];
                          setGoRedirect(lastSeg.id);
                        }      
                      });
                    }else if(response.status === 403){
                      swal("¡No tienes autorización para realizar esta acción, comunícate con el Admin!", {
                        icon: "warning",
                      });
                    }else{
                      swal("Opss! Ocurrió un error!", {
                        icon: "error",
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
                        <Form.Label column sm="1" className="mt-1"> <h1 style={{fontSize: "20px", color:"#0084d2" }}> Fecha </h1></Form.Label>
                        <Col md="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaSeg" name="fechaSeg" 
                                 value={moment().format("YYYY-MM-DD")} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <center>
                    <Form.Label column sm="4" className="align-self-center justify-content-around mb-4 mt-2"> 
                    <u><h1 style={{fontSize: "20px", color:"#0084d2" }}>INFORMACIÓN DEL ACUDIENTE</h1></u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                     <Form.Label column sm="2"> <h5 style={{fontSize:"17px"}}>Tipo de Documento</h5></Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Select  size="xs" name="tipoDocAcudiente" id="tipoDocAcudiente" onChange={handleChange} onBlur={handleBlur}
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

                        <Form.Label column sm="2"><h5 style={{fontSize:"17px"}}>Número Documento</h5></Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="documento acudiente" size="xs" id="numeroDocAcudiente" name="numeroDocAcudiente" 
                            defaultValue={values.numeroDocAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.numeroDocAcudiente && touched.numeroDocAcudiente}
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
                    <Form.Label column sm="2"><h5 style={{fontSize:"17px"}}>Nombre</h5></Form.Label>
                    <Col md={10}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre del Acudiente" size="xs" id="nombreAcudiente" name="nombreAcudiente" 
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
                    <Form.Label column sm="4" className="align-self-center justify-content-around mb-4"> 
                    <u><h1 style={{fontSize: "20px", color:"#0084d2" }}>INFORMACIÓN DEL USUARIO </h1></u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"><h5 style={{fontSize:"17px"}}> Tipo de Documento </h5></Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" size="xs" id="nombreAcudiente" name="tipoDocumento" 
                               value={userControl.tipoDocumento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                     </Col>
                       
                        <Form.Label column sm="2"> <h5 style={{fontSize:"17px"}}> Número Documento </h5></Form.Label>
                            <Col md={4}>
                            <InputGroup hasValidation>
                            <Form.Control  type="text" placeholder="Número documento" size="xs" id="idUsuario" name="idUsuario" 
                            value={userControl.documento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                            </InputGroup>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"><h5 style={{fontSize:"17px"}}> Nombre </h5></Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="nombre usuario" size="xs" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>

                        
                        <Form.Label column sm="2"> <h5 style={{fontSize:"17px"}}> Celular </h5></Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí Teléfono" size="xs" id="celular" name="celular" 
                            value={userControl.celular} onChange={handleChange} onBlur={handleBlur}disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group>           

                    {goRedirect && (
                      <Redirect to={`/admin/addInfantIncome/${goRedirect}`} />
                    )}            
                        <div className="d-grid gap-2 mb-3">
                            <Button variant="primary" type="submit" size="lg" >
                               Siguiente
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 
                      </Col>
                      </Row>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </Container>
    )

}