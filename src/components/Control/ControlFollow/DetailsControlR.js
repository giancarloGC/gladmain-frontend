import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import "./Switch.scss";
import moment from 'moment';

export default function DetailsControlR(props){
  const { idSeg, infoRemi, checkeds, setCheckeds } = props;
  const [ showHospitalizacion, setShowHospitalizacion ] = useState(false);
  const [ showFallecimiento, setShowFallecimiento ] = useState(false);

  const dateFormat = (date) => {
    if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
    }
  }

  console.log(checkeds);


  const onChangeChecked = (e) => {
    if(e.target.name === "hospitalizado"){
        setShowHospitalizacion(!showHospitalizacion);
    }else if(e.target.name === "fallecido"){
      setShowFallecimiento(!showFallecimiento);
    }

    setCheckeds({...checkeds, [e.target.name]: e.target.checked});
}

    return(
        <Container>
            <Row >
            <Col sm={2}> </Col>
              <Col sm={8} className="mt-2 mb-4" style={{border:'2px solid #eee', borderRadius:'5px'}}>
                <Formik
                initialValues={{ 
                  idSeguimiento: idSeg,
                  fechaRemision: infoRemi.fechaRemision,
                  entidadRemitida: infoRemi.entidadRemitida,
                  atendido: infoRemi.atendido,
                  fechaAtencion: infoRemi.fechaAtencion,
                  motivo: infoRemi.motivo,
                  hospitalizado: infoRemi.hospitalizado,
                  fechaIngreso: infoRemi.fechaIngreso,
                  fechaSalida: infoRemi.fechaSalida,
                  fallecido: infoRemi.fallecido,
                  razonFallecimiento: infoRemi.razonFallecimiento,
                  seguimiento: infoRemi.seguimiento,
                  nombreAuxEnfermero: infoRemi.nombreAuxEnfermero,
                }}
                >
                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mt-2 " style={{ "marginLeft":"6px"}}>
                        <Form.Label column md="4">
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">No. Seguimiento</h1></Form.Label>
                        <Col md="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={idSeg} onChange={handleChange} onBlur={handleBlur}disabled
                            />
                        </InputGroup>
                        </Col>

                        <Form.Label column md="3" className="mt-2 ">
                        <h1 style={{fontSize: "20px", color:"#0084d2"}} >Fecha Remisión</h1></Form.Label>
                        <Col >
                          <InputGroup hasValidation>
                              <Form.Control type="text" size="lg" id="fechaRemision" name="fechaRemision" 
                                 value={dateFormat(infoRemi.fechaRemision)} onChange={handleChange} onBlur={handleBlur} disabled
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
                               value={infoRemi.motivo} onChange={handleChange} onBlur={handleBlur} disabled
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
                            value={infoRemi.entidadRemitida} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>
                        
                    <Form.Group as={Row} className="mt-4 " style={{ "marginLeft":"6px"}}>
                    <Form.Label column sm="6">
                    <h5 style={{fontSize: "16px"}} className="mt-1">¿Fue Atendido?</h5></Form.Label>
                        <Col>
                        <InputGroup hasValidation style={{ justifyContent :"center"}}>
                        <label class="rocker rocker-small" size="xs" name="atendido" id="atendido" on>
                          <input type="radio" name="radio" checked={checkeds.radio} disabled/>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>     
                        </InputGroup>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                      <Form.Label column sm="5" >
                      <h5 style={{fontSize: "16px"}}> Fecha de atención</h5></Form.Label>
                        <Col >
                        <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaAtencion" name="fechaAtencion" 
                                 value={dateFormat(infoRemi.fechaAtencion)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col> 
                      </Form.Group>

                    <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                     <Form.Label column sm="6" >
                     <h5 style={{fontSize: "16px"}}>¿Requirio Hospitalización?</h5></Form.Label>
                     <Col class="mid">
                        <InputGroup hasValidation style={{ justifyContent :"center"}}>
                        <label class="rocker rocker-small" size="xs" name="hospitalizado" id="hospitalizado">
                          <input type="radio" name="radio1" checked={checkeds.radio1} disabled/>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    {checkeds.radio1 === true && !showHospitalizacion && (
                     <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                     <Form.Label column sm="5">
                     <h5 style={{fontSize: "16px"}}>Fecha Ingreso</h5></Form.Label>
                     <Col >
                       <InputGroup hasValidation style={{ justifyContent :"Right"}}>
                             <Form.Control type="date" size="xs" id="fechaIngreso" name="fechaIngreso" 
                                 value={dateFormat(infoRemi.fechaIngreso)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                           <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                       </InputGroup>
                     </Col>
                     </Form.Group>
                    )}  

                  {checkeds.radio1 === true && !showHospitalizacion && (
                    <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}} >
                    <Form.Label column sm="6">
                    <h5 style={{fontSize: "16px"}} column sm="9">¿Falleció durante el proceso de atención en salud?</h5></Form.Label>
                    <Col >
                      <InputGroup hasValidation style={{ justifyContent :"center"}}>
                          <label class="rocker rocker-small" size="xs" name="fallecido" id="fallecido">
                          <input type="radio" name="radio2" checked={checkeds.radio2} disabled/>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                      </InputGroup>
                    </Col>
                    </Form.Group>                      
                    )}

                  {checkeds.radio2 === true && !showFallecimiento && (
                      <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-4">
                      <Form.Label column sm="5">
                      <h5 style={{fontSize: "16px"}} className="mt-2">Razón del Fallecimiento</h5></Form.Label>
                      <Col >
                        <InputGroup hasValidation>
                                <Form.Control as="textarea" aria-label="With textarea" placeholder="Describir Motivo Fallecimiento" size="xs" id="razonFallecimiento" name="razonFallecimiento" 
                                value={infoRemi.razonFallecimiento} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                      </Col>
                      </Form.Group>
                    )}

                    {checkeds.radio1 === true && checkeds.radio2 === false && !showHospitalizacion && !showFallecimiento && (
                      <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                      <Form.Label column sm="5">
                      <h5 style={{fontSize: "16px"}}>Fecha Egreso</h5></Form.Label>
                      <Col >
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaSalida" name="fechaSalida" 
                                 value={dateFormat(infoRemi.fechaSalida)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                      </Col>
                      </Form.Group>
                        
                      )} 
 
                    <Form.Group as={Row} className="mt-4" style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="5" >
                        <h5 style={{fontSize: "16px"}} className="mt-2">Seguimiento a la atención en salud </h5> </Form.Label>
                        <Col >
                        <InputGroup hasValidation>
                        <Form.Control  as="textarea" aria-label="With textarea" placeholder="Describa el seguimiento" size="xs" id="seguimiento" name="seguimiento" 
                               value={infoRemi.seguimiento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} className="mt-4" style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="5">
                        <h5 style={{fontSize: "16px"}} className="mt-1">Profesional encargado </h5> </Form.Label>
                        <Col >
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Nombre del profesional" size="xs" id="nombreAuxEnfermero" name="nombreAuxEnfermero" 
                               value={infoRemi.nombreAuxEnfermero} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group>  
                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
            </Row>
        </Container>
    )

}