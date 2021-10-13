import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import swal from 'sweetalert';
import "./Switch.scss";
import AddIncomeCommit7 from "./AddIncomeCommit/AddIncomeCommit7";
import AddIncomeCommit8 from "./AddIncomeCommit/AddIncomeCommit8";

export default function DetailsInfantInc(props){  
  const { segControl, control, checkeds, setCheckeds} = props;
  

    return(
        <Container>
            <Row >
              <Col sm={2}> </Col>
                <Col sm={8} className="mt-2 mb-4" style={{border:'2px solid #eee', borderRadius:'5px'}}> 
                <Formik
                  initialValues={{ 
                    alarmaPreventiva: '',
                    controlCyD: '',
                    recibeSuplementos: '',
                    valoracionMedica: '',

                      idSeguimiento: '',
                      afiliacionSgsss: '',
                      saludOral: '',
                      conoceUrgencias: '',
                      patologiaIdentificadaSgsss: '',
                      nombrePatologia: '',
                      recibeMedFormulada: '',
                      nombreMedFormululada: '',
                      eapb: '',
                      ips: '',
                      usuarioRemitido: '',
                      causa: '',
                  }}
                >

                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>
                    <Row >
                    <Col sm={5}>
                    <Form.Group as={Row} className="mt-2 " style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="8"><h1 style={{"fontSize": "22px", "color":"#0084d2" }} className="mt-2">No. Seguimiento </h1></Form.Label>
                          <Col >
                            <InputGroup hasValidation>
                            <Form.Control
                            type="number" className="text-center" placeholder="01" size="lg" id="id" name="id" 
                               value={segControl.id} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                          </InputGroup>
                      </Col>
                    </Form.Group>
                    </Col>
                  </Row>

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-1">
                       <Form.Label column sm="9"  > 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold"}} className="mt-1">Cuenta con afiliación al SGSSS</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="afiliacionSgsss" name="afiliacionSgsss" 
                            value={control.ingreso.afiliacionSgsss} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                      </InputGroup>
                      </Col>
                      <Col sm="1"></Col>
                    </Form.Group>
                        
                        <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-1">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Cuenta con valoración y controles en salud oral</h5></Form.Label>
                        <Col  class="mid">
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="saludOral" name="saludOral" 
                            value={control.ingreso.saludOral} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                      </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-2 mb-1">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold"}} className="mt-2">Conoce la red de salud o a quien acudir en caso de urgencia</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="conoceUrgencias" name="conoceUrgencias" 
                            value={control.ingreso.conoceUrgencias} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{ "marginLeft":"43px"}}className="mt-0">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>Identifican signos de alarmas de enfermedades prevalentes de la primera infancia (que ponen en peligro de muerte a niños y niñas)</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="alarmaPreventiva" name="alarmaPreventiva" 
                            value={control.ingresoInfante.alarmaPreventiva} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                    </Form.Group>

                    
                    <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-1">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>En niñas y menores de un mes se realizó validación médica</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="valoracionMedica" name="valoracionMedica" 
                            value={control.ingresoInfante.valoracionMedica} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                        </Form.Group>

                        <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Las niñas y niños cuentan con controles de Crecimiento y Desarrollo</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="controlCyD" name="controlCyD" 
                            value={control.ingresoInfante.controlCyD} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Presenta una patología asociada identificada por el SGSSS</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="patologiaIdentificadaSgsss">
                          <input type="radio" name="radio1" checked={checkeds.radio1} disabled/> 
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label> 
                            <Form.Control.Feedback type="invalid">
                                        {errors.patologiaIdentificadaSgsss}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                        </Form.Group>

                    {checkeds.radio1 === true && (
                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-3">
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>
                    <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">¿Cuál?</h5></Form.Label>
                    <Col sm="9" class="mid">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Patología" size="xs" id="nombrePatologia" name="nombrePatologia" 
                               value={control.ingreso.nombrePatologia} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                    </Col>
                    </Form.Group>
                    )}

                        <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-2 mb-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Recibe medicamentos formulados por el SGSSS para alguna patología</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="recibeMedFormulada">
                          <input type="radio" name="radio" checked={checkeds.radio} disabled/>
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
  
                    {checkeds.radio === true && (
                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-3">
                    <Form.Label column sm="2">
                    <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>¿Cuál?</h5></Form.Label>
                    <Col md="9" class="mid" >
                        <InputGroup hasValidation>
                            <Form.Control type="text" size="xs" id="nombreMedFormululada" name="nombreMedFormululada" 
                            value={control.ingreso.nombreMedFormululada} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    )}

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}}  className="mt-2">
                     <Form.Label column sm="2" className="mt-2">
                     <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>EAPB</h5></Form.Label>
                     <Col class="mid" className="mt-2">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre EAPB" size="xs" id="eapb" name="eapb" 
                               value={control.ingreso.eapb} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>

                        <Col md="1"> </Col>

                        <Form.Label column sm="2" className="mt-2">
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>IPS</h5></Form.Label>
                        <Col className="mt-2">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre IPS" size="xs" id="ips" name="ips" 
                               value={control.ingreso.ips} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col md="1"> </Col>
                    </Form.Group>

                    { control.ingreso.usuarioRemitido === "1" && (
                    <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-3">
                       <Form.Label column sm="9"> 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>El usuario fue remitido a SGSSS </h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                               <Form.Control type="text" size="xs" name="showRemitido" id="usuarioRemitido" name="usuarioRemitido" 
                               value={"Si"} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                    </Form.Group>
                    )}
                    { control.ingreso.usuarioRemitido === "0" && (
                    <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-3">
                       <Form.Label column sm="9"> 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>El usuario fue remitido a SGSSS </h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                               <Form.Control type="text" size="xs" name="showRemitido" id="usuarioRemitido" name="usuarioRemitido" 
                               value={"No"} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm="1"></Col>
                    </Form.Group>
                    )}
                    
                    { control.ingreso.usuarioRemitido === "1" && (
                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-3 mb-3">
                    <Form.Label column sm="2">
                    <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>¿Por qué?</h5></Form.Label>
                    <Col sm="9">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Escriba la causa" size="xs" id="causa" name="causa" 
                               value={control.ingreso.causa} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                    </Col>
                    </Form.Group>
                    )}
                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
                <Col sm={2}> </Col>
            </Row>
        </Container>
    )

}