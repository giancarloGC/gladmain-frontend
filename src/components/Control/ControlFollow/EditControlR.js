import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import "./Switch.scss";


export default function EditControlR(){

    return(
        <Container>
            <Row >
                <Col sm={12} className="mt-2 mb-4"> 
                <Formik
                initialValues={{ 
                    
                    idSeguimiento:"",
                    fechaRemision: '',
                    entidadRemitida: '',
                    atendido: '',
                    fechaAtencion: '',
                    motivo: '',
                    hospitalizado: '',
                    fechaIngreso: '',
                    fechaSalida: '',
                    fallecido: '',
                    razonFallecimiento: '',
                    seguimiento: '',
                    nombreAuxEnfermero: '',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  if(!valores.id){
                    errores.id = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.id)){
                    errores.id = 'Solo puedes escribir números';
                  }
                  if(!valores.idSeguimiento){
                    errores.idSeguimiento = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.idSeguimiento)){
                    errores.idSeguimiento = 'Solo puedes escribir números';
                  }
                  const dateCurrently2 = new Date();
                  if(!valores.fechaRemision){
                    errores.fechaRemision = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaRemision){
                    errores.fechaRemision = 'Seleccione una fecha valida';
                  }
                  if(!valores.entidadRemitida){
                    errores.entidadRemitida = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.entidadRemitida)){
                    errores.entidadRemitida = 'Solo puedes escribir letras';
                  }
                  if(!valores.fechaAtencion){
                    errores.fechaAtencion = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaAtencion){
                    errores.fechaAtencion = 'Seleccione una fecha valida';
                  }
                  if(!valores.motivo){
                    errores.motivo = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.motivo)){
                    errores.motivo = 'Solo puedes escribir letras';
                  }
                  if(!valores.fechaIngreso){
                    errores.fechaIngreso = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaIngreso){
                    errores.fechaIngreso = 'Seleccione una fecha valida';
                  }
                  if(!valores.fechaSalida){
                    errores.fechaSalida = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaSalida){
                    errores.fechaSalida = 'Seleccione una fecha valida';
                  }
                  if(!valores.razonFallecimiento){
                    errores.razonFallecimiento = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.razonFallecimiento)){
                    errores.razonFallecimiento = 'Solo puedes escribir letras';
                  }
                  if(!valores.seguimiento){
                    errores.seguimiento = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.seguimiento)){
                    errores.seguimiento = 'Solo puedes escribir letras';
                  }
                  if(!valores.nombreAuxEnfermero){
                    errores.nombreAuxEnfermero = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAuxEnfermero)){
                    errores.nombreAuxEnfermero = 'Solo puedes escribir letras';
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
                    <Form.Group as={Row} className="mb-3 mt-3" >
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>No. Seguimiento</Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={values.idSeguimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.idSeguimiento && touched.idSeguimiento}
                               isValid={!errors.idSeguimiento && touched.idSeguimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idSeguimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        <Col sm="3"> </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Fecha Remisión</Form.Label>
                        <Col sm="3" className="justify-content-center align-self-center">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaRemision" name="fechaRemision" 
                                 value={values.fechaRemision} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaRemision && touched.fechaRemision}
                                 isValid={!errors.fechaRemision && touched.fechaRemision}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaRemision}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <Row style={{backgroundColor: '#f1f1f1'}}>

                    <Form.Group as={Row} className="mb-3 mt-2">
                    <Form.Label column sm="3" style={{"fontSize": "12px !important"}}>Entidad a la cual fue remitido</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Nombre Entidad" size="lg" id="entidadRemitida" name="entidadRemitida" 
                            value={values.entidadRemitida} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.entidadRemitida && touched.entidadRemitida}
                            isValid={!errors.entidadRemitida && touched.entidadRemitida}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.entidadRemitida}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col md={1}></Col>

                     <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>¿Fue Atendido?</Form.Label>
                     <Col md={2} class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="atendido">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>   
                        </InputGroup>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3" style={{"fontSize": "12px !important"}}>Motivo Remisión</Form.Label>
                    <Col md={4}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Motivo de Remisión" size="lg" id="motivo" name="motivo" 
                               value={values.motivo} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.motivo && touched.motivo}
                               isValid={!errors.motivo && touched.motivo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.motivo}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>

                     <Col md={1}></Col>

                     <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>¿Requirio Hospitalización?</Form.Label>
                     <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="hospitalizado">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Fecha Ingreso</Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaIngreso" name="fechaIngreso" 
                                 value={values.fechaIngreso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaIngreso && touched.fechaIngreso}
                                 isValid={!errors.fechaIngreso && touched.fechaIngreso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaIngreso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col sm="2"></Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Fecha Egreso</Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaEgreso" name="fechaEgreso" 
                                 value={values.fechaEgreso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaEgreso && touched.fechaEgreso}
                                 isValid={!errors.fechaEgreso && touched.fechaEgreso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaEgreso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mt-43row justify-content-center align-self-center">
                    <Form.Label column sm="6" style={{"fontSize": "12px !important"}} className="mt-3">
                        <center>¿Falleció durante el proceso de atención en salud?</center></Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="fallecido">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                    
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Razón del Fallecimiento</Form.Label>
                    <Col md={8}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Describir Motivo Fallecimiento" size="lg" id="razonFallecimiento" name="razonFallecimiento" 
                               value={values.razonFallecimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.razonFallecimiento && touched.razonFallecimiento}
                               isValid={!errors.razonFallecimiento && touched.razonFallecimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.razonFallecimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                    </Form.Group>
 
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Seguimiento a la atención en salud </Form.Label>
                        <Col md={8}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Describa el seguimiento" size="lg" id="seguimiento" name="seguimiento" 
                               value={values.seguimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.seguimiento && touched.seguimiento}
                               isValid={!errors.seguimiento && touched.seguimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.seguimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Nombre Auxiliar de Enfermeria </Form.Label>
                        <Col md={8}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Nombre del Enfermero(a)" size="lg" id="nombreAuxEnfermero" name="nombreAuxEnfermero" 
                               value={values.nombreAuxEnfermero} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAuxEnfermero && touched.nombreAuxEnfermero}
                               isValid={!errors.nombreAuxEnfermero && touched.nombreAuxEnfermero}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAuxEnfermero}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>            

                        <div className="d-grid gap-2 mb-3">
                            <Button variant="primary" type="submit" size="lg">
                               Guardar
                            </Button>
                        </div>
                    </Row>

                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
            </Row>
        </Container>
    )

}