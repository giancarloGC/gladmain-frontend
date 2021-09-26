import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { insertRemisApi } from "../../../api/remission";
import swal from 'sweetalert';
import moment from 'moment';
import "./Switch.scss";

export default function DetailsControlR(props){
 
    return(
        <Container>
            <Row >
            <Col sm={2}> </Col>
              <Col sm={8} className="mt-2 mb-4" style={{border:'2px solid #eee', borderRadius:'5px'}}>
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
                >

                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mt-2 " style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="3">
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">No. Seguimiento</h1></Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={values.idSeguimiento} onChange={handleChange} onBlur={handleBlur}disabled
                            />
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="3" className="mt-2 ">
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} >Fecha Remisión</h1></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaRemision" name="fechaRemision" 
                                 value={values.fechaRemision} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaRemision}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>

                    <Form.Group as={Row} className="mt-4 " style={{ "marginLeft":"6px"}}>
                    <Form.Label column sm="5">
                    <h5 style={{fontSize: "16px"}} className="mt-3">Motivo Remisión</h5></Form.Label>
                    <Col >
                        <InputGroup hasValidation>
                               <Form.Control as="textarea" aria-label="With textarea" placeholder="Motivo de Remisión" size="xs" id="motivo" name="motivo" 
                               value={values.motivo} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                     </Col>
                     </Form.Group>
                        
                    <Form.Group as={Row} className="mt-4 " style={{ "marginLeft":"6px"}}>
                    <Form.Label column sm="5">
                    <h5 style={{fontSize: "16px"}} className="mt-1">Entidad a la cual fue remitido</h5></Form.Label>
                        <Col>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Nombre Entidad" size="xs" id="entidadRemitida" name="entidadRemitida" 
                            value={values.entidadRemitida} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Col md={1}></Col>

                    <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                     <Form.Label column sm="3">
                     <h5 style={{fontSize: "16px"}} className="mt-1">¿Fue Atendido?</h5></Form.Label>
                     <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="atendido" id="atendido" on>
                          <input type="checkbox" name="atendido"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>   
                        </InputGroup>
                      </Col>

                      <Form.Label column sm="3">
                      <h5 style={{fontSize: "16px"}}> Fecha de atención</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaAtencion" name="fechaAtencion" 
                                 value={values.fechaAtencion} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                      </Form.Group>

                     <Col md={1}></Col>

                     <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                     <Form.Label column sm="3">
                     <h5 style={{fontSize: "16px"}}>¿Requirio Hospitalización?</h5></Form.Label>
                     <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="hospitalizado" id="hospitalizado">
                          <input type="checkbox"  name="hospitalizado" ></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>   
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="3">
                        <h5 style={{fontSize: "16px"}}>Fecha Ingreso</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaIngreso" name="fechaIngreso" 
                                 value={values.fechaIngreso} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="3">
                        <h5 style={{fontSize: "16px"}}>¿Falleció durante el proceso de atención en salud?</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="fallecido" id="fallecido">
                          <input type="checkbox" name="fallecido"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                        
                        <Form.Label column sm="3">
                        <h5 style={{fontSize: "16px"}}>Fecha Egreso</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaSalida" name="fechaSalida" 
                                 value={values.fechaSalida} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} style={{ "marginLeft":"6px"}}>
                    <Form.Label column sm="5">
                    <h5 style={{fontSize: "16px"}} className="mt-2">Razón del Fallecimiento</h5></Form.Label>
                    <Col >
                        <InputGroup hasValidation>
                               <Form.Control as="textarea" aria-label="With textarea" placeholder="Describir Motivo Fallecimiento" size="xs" id="razonFallecimiento" name="razonFallecimiento" 
                               value={values.razonFallecimiento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                     </Col>
                    </Form.Group>
 
                    <Form.Group as={Row} className="mt-4" style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="5" >
                        <h5 style={{fontSize: "16px"}} className="mt-2">Seguimiento a la atención en salud </h5> </Form.Label>
                        <Col >
                        <InputGroup hasValidation>
                        <Form.Control  as="textarea" aria-label="With textarea" placeholder="Describa el seguimiento" size="xs" id="seguimiento" name="seguimiento" 
                               value={values.seguimiento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} className="mt-4" style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="5">
                        <h5 style={{fontSize: "16px"}} className="mt-1">Nombre Auxiliar de Enfermeria </h5> </Form.Label>
                        <Col >
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Nombre del Enfermero(a)" size="xs" id="nombreAuxEnfermero" name="nombreAuxEnfermero" 
                               value={values.nombreAuxEnfermero} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group>  
                    <Row>
                    <Col md="1"> </Col>
                      <Col md="10">
                        <div className="d-grid gap-2 mb-3 mt-3">
                            <Button variant="primary" type="submit" size="lg">
                               Guardar
                            </Button>
                        </div>
                      </Col>
                   <Col md="1"> </Col>
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