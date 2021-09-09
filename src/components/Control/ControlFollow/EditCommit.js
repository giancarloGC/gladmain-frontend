import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";

export default function EditCommit(){

    return(
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}}>
                <Col sm={1}></Col>
                <Col sm={10} className="mt-2 mb-4"> 
                <Formik
                initialValues={{ 
                  id: '',
                  idSeguimientoSalud: '',
                  fechaCompromiso: '',
                  nombre: '',
                  nuevoCompromiso: '',
                  fechaCumplimiento: null,
                  nombreAuxiliarEnfermeria: '',
                  tipo: null
                }}
                
                validate={(valores) => {
                  let errores = {};

                  if(!valores.id){
                    errores.id = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.id)){
                    errores.id = 'Solo puedes escribir números';
                  }
                  if(!valores.idSeguimientoSalud){
                    errores.idSeguimientoSalud = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.idSeguimientoSalud)){
                    errores.idSeguimientoSalud = 'Solo puedes escribir números';
                  }
                  const dateCurrently = new Date();
                  if(!valores.fechaCompromiso){
                    errores.fechaCompromiso = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently <= valores.fechaCompromiso){
                    errores.fechaCompromiso = 'Seleccione una fecha valida';
                  }
                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  const dateCurrently2 = new Date();
                  if(!valores.fechaCumplimiento){
                    errores.fechaCumplimiento = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaCumplimiento){
                    errores.fechaCumplimiento = 'Seleccione una fecha valida';
                  }
                  if(!valores.nombreAuxiliarEnfermeria){
                    errores.nombreAuxiliarEnfermeria = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAuxiliarEnfermeria)){
                    errores.nombreAuxiliarEnfermeria = 'Nombre incorrecto, solo puedes escribir letras';
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
                    return (   
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-1 mt-3">
                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>No. Seguimiento</Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimientoSalud" name="idSeguimientoSalud" 
                               value={values.idSeguimientoSalud} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.idSeguimientoSalud && touched.idSeguimientoSalud}
                               isValid={!errors.idSeguimientoSalud && touched.idSeguimientoSalud}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idSeguimientoSalud}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col sm="3"> </Col>

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha Compromiso </Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaCompromiso" name="fechaCompromiso" 
                                 value={values.fechaCompromiso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaCompromiso && touched.fechaCompromiso}
                                 isValid={!errors.fechaCompromiso && touched.fechaCompromiso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaCompromiso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-1 ">
                    <div class="middle">
                      <label>
                      <input type="radio" name="radio" checked/>
                      <div class="front-end box">
                        <span>Compromiso cumplido que no se mantuvo</span>
                      </div>
                      </label>

                      <label>
                      <input type="radio" name="radio"/>
                      <div class="back-end box">
                        <span>Compromiso por nuevo factor de riesgo</span>
                      </div>
                      </label>
                    </div>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mt-3">
                    <Form.Label column sm="0" style={{"font-size": "12px !important"}} className="row justify-content-center">Nombre Compromiso</Form.Label>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Compromiso" size="lg" id="nombre" name="nombre" 
                               value={values.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                               isValid={!errors.nombre && touched.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                     <Col sm={1}></Col>
                     </Form.Group>

                     <Form.Group as={Row} className="mb-3 mt-3">
                    <Form.Label column sm="0" style={{"font-size": "12px !important"}}  className="row justify-content-center">Nuevo Compromiso</Form.Label>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Descripción Compromiso" size="lg" id="nuevoCompromiso" name="nuevoCompromiso" 
                               value={values.nuevoCompromiso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nuevoCompromiso && touched.nuevoCompromiso}
                               isValid={!errors.nuevoCompromiso && touched.nuevoCompromiso}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nuevoCompromiso}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                     <Col sm={1}></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha Cumplimiento </Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaCumplimiento" name="fechaCumplimiento" 
                                 value={values.fechaCumplimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaCumplimiento && touched.fechaCumplimiento}
                                 isValid={!errors.fechaCumplimiento && touched.fechaCumplimiento}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaCumplimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        
                        <Col sm={1}></Col>

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Nombre Aux. Enfermero(a) </Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="nombre Auxiliar enfermero(a)" size="lg" id="nombreAuxiliarEnfermeria" name="nombreAuxiliarEnfermeria" 
                               value={values.nombreAuxiliarEnfermeria} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAuxiliarEnfermeria && touched.nombreAuxiliarEnfermeria}
                               isValid={!errors.nombreAuxiliarEnfermeria && touched.nombreAuxiliarEnfermeria}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAuxiliarEnfermeria}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                               Guardar
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