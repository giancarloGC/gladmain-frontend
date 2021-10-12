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
  const { infoSeg, userControl, documento, rolUser } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');
  const [ showSpinner, setShowSpinner ] = useState(false);

  var documertParse = parseInt( documentoLogin[0]);

  const dateFormat = (date) => {
    if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
    }
  }

    return(
        <Container>
            <Row>
                <Col sm={1}></Col>
                <Col sm={10} className="mt-2 mb-4" style={{backgroundColor: '#f1f1f1', borderRadius: '5px'}}> 
                <Row className='justify-content-center'>
                <Col sm={11}> 
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
                  setShowSpinner(true);
                  updateSegApi(formData, token).then(response => {
                    console.log(response);
                    setShowSpinner(false);
                    if(response === true){
                      setShowSpinner(false);
                      swal({
                        title: `¡El Seguimiento fue editado correctamente!`,
                        icon: 'success'
                      });
                    }else{
                      setShowSpinner(false);
                      swal({
                        title: `¡Opss, ocurrió un error!`,
                        icon: 'danger'
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
                      <Row> 
                      <Col sm={6}>
                      <Form.Group as={Row} className="mt-2 mb-2">
                              <Form.Label column md="6"> <h1 style={{fontSize: "20px", color:"#0084d2" }}> No.Seguimiento </h1></Form.Label>
                                  <Col style={{display:"inline-table"}} >
                                      <InputGroup hasValidation>
                                      <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                                        value={infoSeg.id} onChange={handleChange} onBlur={handleBlur} disabled
                                      />
                                  </InputGroup>
                                  </Col>
                            <Col md={3}> </Col>
                      </Form.Group> 
                      </Col>
                      <Col sm={6}>
                      <Form.Group as={Row} className="mt-2 mb-2">
                      <Col md={4}> </Col>
                        <Form.Label column md="3"> <h1 style={{fontSize: "20px", color:"#0084d2" }}> 
                          Fecha 
                          </h1></Form.Label>
                              <Col style={{display:"inline-table"}} className="row justify-content-center">
                                <InputGroup hasValidation>
                                    <Form.Control type="text" size="lg" id="fecha" name="fecha" 
                                      value={dateFormat(infoSeg.fecha)} onChange={handleChange} onBlur={handleBlur} disabled
                                    />
                              </InputGroup>
                          </Col>
                      </Form.Group> 
                      </Col>
                      </Row>
                      
                      
          

                    <center>
                    <Form.Label column sm="10" style={{"fontSize": "12px !important"}} className="align-self-center justify-content-around mb-4 mt-2">
                    <u><h1 style={{fontSize: "20px", color:"#0084d2" }}>INFORMACIÓN DEL ACUDIENTE </h1></u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                     <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                     <h5 style={{fontSize:"17px"}}>Tipo de Documento</h5></Form.Label>
                        <Col >
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

                        <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                        <h5 style={{fontSize:"17px"}}>Número Documento</h5></Form.Label>
                        <Col >
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
                    <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                    <h5 style={{fontSize:"17px"}}>Nombre</h5></Form.Label>
                    <Col>
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
                    <Form.Label column sm="10" style={{"fontSize": "12px !important"}} className="align-self-center justify-content-around mb-4 mt-3"> 
                    <u><h1 style={{fontSize: "20px", color:"#0084d2" }}>INFORMACIÓN DEL USUARIO </h1></u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                        <h5 style={{fontSize:"17px"}}>Tipo de Documento</h5></Form.Label>
                        <Col>
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
                       
                        <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                        <h5 style={{fontSize:"17px"}}>Número Documento</h5></Form.Label>
                            <Col>
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
                        <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                        <h5 style={{fontSize:"17px"}}>Nombre </h5></Form.Label>
                        <Col>
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

                        
                        <Form.Label column sm={3} style={{"fontSize": "12px !important"}}>
                        <h5 style={{fontSize:"17px"}}>Celular</h5></Form.Label>
                        <Col>
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
                        <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                            {showSpinner ? (
                              <>
                              <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                              {"  " + `  Cargando...`}  
                              </>
                              ):(
                              "Guardar" 
                           )}
                        </Button>
                        </div>
                        </div>
                      </Col>
                      <Col md={6}> 
                        <div className="d-grid gap-2 mt-3">
                          {rolUser === "INFANTE" ? (
                            <Button variant="primary" size="lg" href={`/admin/editInfantIncome/${infoSeg.id}/${documento}/${rolUser}`}>
                               Editar Ingreso
                            </Button>
                          )
                        :
                          (
                            <Button variant="primary" size="lg" href={`/admin/editMotherIncome/${infoSeg.id}/${documento}`}>
                               Editar Ingreso
                            </Button>
                          )}
                        </div>
                        </Col>
                      </Form.Group>  
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