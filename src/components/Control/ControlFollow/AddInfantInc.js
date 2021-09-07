//import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import "./AddInfantInc.scss";


export default function AddInfantInc(){

    return(
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}}>
              <Col sm={1}> </Col>
                <Col sm={10} className="mt-2 mb-4"> 
                <Formik
                initialValues={{ 
                    idSeguimiento: '',
                    afiliacionSgsss: '',
                    saludOral: '',
                    conoceUrgencias: '',
                    alarmaPreventiva: '',
                    valoracionMedica: '',
                    controlCyD: '',
                    patologiaIdentificadaSgsss: '',
                    nombrePatologia: '',
                    recibeMedFormulada: '',
                    nombreMedFormulada: '',
                    eapb: '',
                    ips: '',
                    usuarioRemitido: '',
                    causa: '',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  const dateCurrently2 = new Date();
                  if(!valores.fechaSeg){
                    errores.fechaSeg = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaSeg){
                    errores.fecha = 'Seleccione una fecha valida';
                  }
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
                        
                    <Form.Group as={Row} className="mb-3 mt-3">
                        <Form.Label column sm="3" style={{"font-size": "8px !important"}}>No. Seguimiento</Form.Label>
                          <Col sm="2" >
                            <InputGroup hasValidation>
                            <Form.Control
                            type="number" className="text-center" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={values.idSeguimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.idSeguimiento && touched.idSeguimiento}
                               isValid={!errors.idSeguimiento && touched.idSeguimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idSeguimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mt-5">
                       <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Cuenta con afiliación al SGSSS</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="afiliacionSgsss">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.afiliacionSgsss}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Cuenta con valoración y controles en salud oral</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="saludOral">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.saludOral}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                       <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Conoce la red de salud o a quien acudir en caso de urgencia</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="conoceUrgencias">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.conoceUrgencias}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                        
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Identifican signos de alarmas de enfermedades prevalentes de la primera infancia (que ponen en peligro de muerte a niños y niñas)</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="alarmaPreventiva">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.alarmaPreventiva}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    
                    <Form.Group as={Row} className="mb-3 mt-5">
                       <Form.Label column sm="4" style={{"font-size": "12px !important"}}>En niñas y menores de un mes se realizó validación médica</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="valoracionMedica">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.valoracionMedica}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Las niñas y niños cuentan con controles de Crecimiento y Desarrollo</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="controlCyD">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.controlCyD}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 mt-5">
                       <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Presenta una patología asociada identificada por el SGSSS</Form.Label>
                        <Col sm="2" class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="patologiaIdentificadaSgsss">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.patologiaIdentificadaSgsss}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Recibe medicamentos formulados por el SGSSS para alguna patología</Form.Label>
                        <Col sm="2">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="recibeMedFormulada">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.recibeMedFormulada}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>¿Cuál?</Form.Label>
                    <Col sm="10" class="mid">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Patología" size="lg" id="nombrePatologia" name="nombrePatologia" 
                               value={values.nombrePatologia} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreMedFormulada && touched.nombreMedFormulada}
                               isValid={!errors.nombrePatologia && touched.nombrePatologia}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombrePatologia}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    </Form.Group>
                
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>¿Cuál?</Form.Label>
                    <Col sm="10">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Medicamento Formulado" size="lg" id="nombreMedFormulada" name="nombreMedFormulada" 
                               value={values.nombreMedFormulada} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreMedFormulada && touched.nombreMedFormulada}
                               isValid={!errors.nombreMedFormulada && touched.nombreMedFormulada}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreMedFormulada}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                     <Form.Label column sm="2" style={{"font-size": "12px !important"}}>EAPB</Form.Label>
                      <Col sm="4">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre EAPB" size="lg" id="eapb" name="eapb" 
                               value={values.eapb} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.eapb && touched.eapb}
                               isValid={!errors.eapb && touched.eapb}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.eapb}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        
                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>IPS</Form.Label>
                        <Col sm="4">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre IPS" size="lg" id="ips" name="ips" 
                               value={values.ips} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.ips && touched.ips}
                               isValid={!errors.ips && touched.ips}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.ips}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3 mt-5">
                    <Col sm="3"> </Col>
                       <Form.Label column sm="4" style={{"font-size": "12px !important"}}> <center>El usuario fue remitido a SGSSS </center></Form.Label>
                        <Col sm="2">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="usuarioRemitido">
                          <input type="checkbox"></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.usuarioRemitido}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                        <Col sm="3"> </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>¿Por qué?</Form.Label>
                    <Col sm="10">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Escriba la causa" size="lg" id="causa" name="causa" 
                               value={values.causa} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.causa && touched.causa}
                               isValid={!errors.causa && touched.causa}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.causa}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    </Form.Group>
                     
                    
                        <div className="d-grid gap-2 mt-5 mb-2">
                            <Button variant="primary" type="submit" size="lg">
                               Guardar
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
                <Col sm={1}> </Col>
            </Row>
        </Container>
    )

}