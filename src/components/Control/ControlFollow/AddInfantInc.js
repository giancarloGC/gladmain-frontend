import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";


export default function AddInfantInc(){

    return(
        <Container>
            <Row>
                <Col sm={12} className="mt-2 mb-4"> 
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
                        <Form.Label column sm="3" style={{"font-size": "12px !important"}}>No. Seguimiento</Form.Label>
                        <Col sm="1">
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
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="7" style={{"font-size": "12px !important"}}>Cuenta con afiliación al SGSSS</Form.Label>
                            <Form.Select sm="5" size="lg" name="afiliacionSgsss" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.afiliacionSgsss && touched.afiliacionSgsss} isInvalid={!!errors.afiliacionSgsss && touched.afiliacionSgsss}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.afiliacionSgsss}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="7" style={{"font-size": "12px !important"}}>Cuenta con valoración y controles en salud oral</Form.Label>
                            <Form.Select sm="5" size="lg" name="saludOral" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.saludOral && touched.saludOral} isInvalid={!!errors.saludOral && touched.saludOral}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.saludOral}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="7" style={{"font-size": "12px !important"}}>Conoce la red de salud o a quien acudir en caso de urgencia</Form.Label>
                            <Form.Select sm="5" size="lg" name="conoceUrgencias" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.conoceUrgencias && touched.conoceUrgencias} isInvalid={!!errors.conoceUrgencias && touched.conoceUrgencias}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.conoceUrgencias}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="7" style={{"font-size": "12px !important"}}>Identifican signos de alarmas de enfermedades prevalentes de la primera infancia (que ponen en peligro de muerte a niños y niñas)</Form.Label>
                            <Form.Select sm="5" size="lg" name="alarmaPreventiva" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.alarmaPreventiva && touched.alarmaPreventiva} isInvalid={!!errors.alarmaPreventiva && touched.alarmaPreventiva}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.conoceUrgencias}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>En niñas y menores de un mes se realizó validación médica</Form.Label>
                            <Form.Select sm="7" size="lg" name="valoracionMedica" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.valoracionMedica && touched.valoracionMedica} isInvalid={!!errors.valoracionMedica && touched.valoracionMedica}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.valoracionMedica}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>Las niñas y niños cuentan con controles de Crecimiento y Desarrollo</Form.Label>
                            <Form.Select sm="7" size="lg" name="controlCyD" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.controlCyD && touched.controlCyD} isInvalid={!!errors.controlCyD && touched.controlCyD}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.controlCyD}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>Presenta una patología asociada identificada por el SGSSS</Form.Label>
                            <Form.Select sm="7" size="lg" name="patologiaIdentificadaSgsss" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.patologiaIdentificadaSgsss && touched.patologiaIdentificadaSgsss} isInvalid={!!errors.patologiaIdentificadaSgsss && touched.patologiaIdentificadaSgsss}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.patologiaIdentificadaSgsss}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>¿Cuál?</Form.Label>
                               <Form.Control type="text" placeholder="Nombre Patología" size="lg" id="nombrePatologia" name="nombrePatologia" 
                               value={values.nombrePatologia} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombrePatologia && touched.nombrePatologia}
                               isValid={!errors.nombrePatologia && touched.nombrePatologia}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombrePatologia}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>                        
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>Recibe medicamentos formulados por el SGSSS para alguna patología</Form.Label>
                            <Form.Select sm="7" size="lg" name="recibeMedFormulada" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.recibeMedFormulada && touched.recibeMedFormulada} isInvalid={!!errors.recibeMedFormulada && touched.recibeMedFormulada}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.recibeMedFormulada}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group> 
                    <Form.Group as={Row} className="mb-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>¿Cuál?</Form.Label>
                               <Form.Control type="text" placeholder="Nombre Medicamento" size="lg" id="nombreMedFormulada" name="nombreMedFormulada" 
                               value={values.nombreMedFormulada} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreMedFormulada && touched.nombreMedFormulada}
                               isValid={!errors.nombreMedFormulada && touched.nombreMedFormulada}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreMedFormulada}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>EAPB</Form.Label>
                               <Form.Control type="text" placeholder="Nombre EAPB" size="lg" id="eapb" name="eapb" 
                               value={values.eapb} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.eapb && touched.eapb}
                               isValid={!errors.eapb && touched.eapb}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.eapb}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>IPS</Form.Label>
                               <Form.Control type="text" placeholder="Nombre IPS" size="lg" id="ips" name="ips" 
                               value={values.ips} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.ips && touched.ips}
                               isValid={!errors.ips && touched.ips}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.ips}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>El usuario fue remitido a SGSSS</Form.Label>
                            <Form.Select sm="7" size="lg" name="usuarioRemitido" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.usuarioRemitido && touched.usuarioRemitido} isInvalid={!!errors.usuarioRemitido && touched.usuarioRemitido}
                            >
                            <option disabled selected>Selecciona una opción</option>
                            <option value="SI">Si</option>
                            <option value="NO">No</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.usuarioRemitido}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group> 
                    <Form.Group as={Row} className="mb-3">
                        <InputGroup hasValidation>
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>¿Por qué?</Form.Label>
                               <Form.Control type="text" placeholder="Escriba la causa" size="lg" id="causa" name="causa" 
                               value={values.causa} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.causa && touched.causa}
                               isValid={!errors.causa && touched.causa}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.causa}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
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
            </Row>
        </Container>
    )

}