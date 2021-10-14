
import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { insertCompApi } from "../../../api/commitment";
import swal from 'sweetalert';
import moment from 'moment';
import "./Switch.scss";

export default function AddCommit(props){
  const { controlSeguimiento, documento } = props;
  const token = localStorage.getItem(TOKEN);
  const [ checkeds, setCheckeds ] = useState({ radio1: true, radio: false });
  const [ showSpinner, setShowSpinner ] = useState(false);
  console.log(checkeds);

  const onChangeChecked = (e) => {
    if(e.target.name === "radio1"){
      setCheckeds({ radio1: true, radio: false });
    }else{
      setCheckeds({ radio1: false, radio: true });
    }
  }

    return(
        <Container>
            <Row className='justify-content-center'>
                <Col sm={10} className="mt-2 mb-4"> 
                
                <Formik
                initialValues={{ 
                  idSeguimientoSalud: '',
                  fechaCompromiso: '',
                  nombre: '',
                  nuevoCompromiso: '',
                  fechaCumplimiento: '',
                  nombreAuxiliarEnfermeria: '',
                  tipo: '',
                }}
                
                validate={(valores) => {
                  let errores = {};
                 
                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }
                  if(!valores.nuevoCompromiso){
                    errores.nuevoCompromiso = 'No se permiten campos vacíos'
                  }
                  const dateCurrently2 = new Date();
                 
                  if(!valores.nombreAuxiliarEnfermeria){
                    errores.nombreAuxiliarEnfermeria = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAuxiliarEnfermeria)){
                    errores.nombreAuxiliarEnfermeria = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {

                  const formData={
                    idSeguimientoSalud: controlSeguimiento.id,
                    fechaCompromiso: moment().format("YYYY-MM-DD"),
                    nombre: valores.nombre,
                    nuevoCompromiso: valores.nuevoCompromiso,
                    fechaCumplimiento: valores.fechaCumplimiento,
                    nombreAuxiliarEnfermeria: valores.nombreAuxiliarEnfermeria,
                    tipo: checkeds.radio ? "Compromiso por nuevo factor de riesgo" : "Compromiso cumplido que no se mantuvo",
                  }

                  console.log(formData);
                  //resetForm();
                  formData.token = token;
                  setShowSpinner(true);
                  insertCompApi(formData, token).then(response => {
                    setShowSpinner(false);
                    if(response === true){
                      setShowSpinner(false);
                      swal({
                        title: `¡El compromiso fue almacenado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        window.location.replace(`/admin/commitments/${controlSeguimiento.id}/${documento}`);
                    }); 
                    }else{
                      setShowSpinner(false);
                      console.log("no resgistro remi");
                      swal({
                        title: `¡Opss, ocurrió un error!`,
                        icon: 'danger'
                      }).then((value) => {
                        window.location.replace(`/admin/commitments/${controlSeguimiento.id}/${documento}`);
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
                        <Form.Label column sm="2"><h1 style={{fontSize: "20px", color:"#0084d2" }} >No. Seguimiento</h1></Form.Label>
                        <Col>
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="xs" id="idSeguimientoSalud" name="idSeguimientoSalud" 
                               value={controlSeguimiento.id} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="3"></Col>
                        <Form.Label column sm="2"><h1 style={{fontSize: "20px", color:"#0084d2" }} >Fecha Compromiso</h1></Form.Label>
                        <Col>
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaCompromiso" name="fechaCompromiso" 
                                 value={moment().format("YYYY-MM-DD")} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group>
                    
                    <Container style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}><br/>
                    <Form.Group as={Row} className="mb-1 ">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Seleccione una opción</b></Form.Label>
                    </center>
                    <div class="middle">
                      <label>
                      <input type="radio" name="radio1" checked={checkeds.radio1} onChange={e => onChangeChecked(e)}/>
                      <div class="box">
                        <span>Compromiso cumplido que no se mantuvo</span>
                      </div>
                      </label>

                      <label>
                      <input type="radio" name="radio" checked={checkeds.radio} onChange={e => onChangeChecked(e)} />
                      <div class="box">
                        <span>Compromiso por nuevo factor de riesgo</span>
                      </div>
                      </label>
                    </div>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-2">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Nombre Compromiso</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Compromiso" size="xs" id="nombre" name="nombre" 
                               value={values.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                               isValid={!errors.nombre && touched.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                     </Form.Group>

                     <Form.Group as={Row} className="mt-1">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Nuevo Compromiso</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                               <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Descripción Compromiso" size="xs" id="nuevoCompromiso" name="nuevoCompromiso" 
                               value={values.nuevoCompromiso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nuevoCompromiso && touched.nuevoCompromiso}
                               isValid={!errors.nuevoCompromiso && touched.nuevoCompromiso}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nuevoCompromiso}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                    </Form.Group>

                    <Form.Group className="mt-4">
                      <Row>
                    <Form.Label column md="3"><h5 style={{fontSize: "16px"}}>Fecha Cumplimiento </h5></Form.Label>
                        <Col md="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaCumplimiento" name="fechaCumplimiento" 
                                 value={values.fechaCumplimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaCumplimiento && touched.fechaCumplimiento}
                                 isValid={!errors.fechaCumplimiento && touched.fechaCumplimiento} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaCumplimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2"><h5 style={{fontSize: "16px"}}>Nombre Aux. Enfermero(a)</h5></Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="nombre Auxiliar enfermero(a)" size="xs" id="nombreAuxiliarEnfermeria" name="nombreAuxiliarEnfermeria" 
                               value={values.nombreAuxiliarEnfermeria} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAuxiliarEnfermeria && touched.nombreAuxiliarEnfermeria}
                               isValid={!errors.nombreAuxiliarEnfermeria && touched.nombreAuxiliarEnfermeria}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAuxiliarEnfermeria}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Row>
                    </Form.Group>

                    <div className="d-grid gap-2">
                       <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                          {showSpinner ? (
                                <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                                {"  " + `  Cargando...`}  
                                </>
                                ):(
                                " Guardar" 
                            )}
                        </Button>
                        </div><br/>
                      </Container>
                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
            </Row>
        </Container>
    )

}