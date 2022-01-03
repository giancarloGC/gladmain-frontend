
import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { updateRemisApi } from "../../../api/remission";
import swal from 'sweetalert';
import moment from 'moment';
import "./Switch.scss";

export default function EditControlR(props){
  const token = localStorage.getItem(TOKEN);
  const { idSeg, infoRemi, documento, checkeds, setCheckeds } = props;
  console.log(infoRemi);
  const [ showHospitalizacion, setShowHospitalizacion ] = useState(infoRemi.hospitalizado ? true : false);
  const [ showFallecimiento, setShowFallecimiento ] = useState(infoRemi.fallecido ? true : false);
  const [ showSpinner, setShowSpinner ] = useState(false);
 
  const dateFormat = (date) => {
    if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
    }
  }

  const onChangeChecked = (e) => {
    if(e.target.name === "radio1"){
      setShowHospitalizacion(!showHospitalizacion);
  }else if(e.target.name === "radio2"){
    setShowFallecimiento(!showFallecimiento);
  }

    setCheckeds({...checkeds, [e.target.name]: e.target.checked});
}
    return(
        <Container>
            <Row >
            <Col sm={2}> </Col>
              <Col sm={8} className="mt-2 mb-4" style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}>
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
                
                validate={(valores) => {
                  let errores = {};
                  const dateCurrently2 = new Date();
                  if(!valores.motivo){
                    errores.motivo = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ.,:; ]+$/g.test(valores.motivo)){
                    errores.motivo = 'Solo puedes escribir letras';
                  }
                  if(!valores.entidadRemitida){
                    errores.entidadRemitida = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.entidadRemitida)){
                    errores.entidadRemitida = 'Solo puedes escribir letras';
                  }
                  const dateCurrently = moment();
                  if(!valores.fechaAtencion){
                    errores.fechaAtencion = 'Asegurese de selecionar una fecha';
                  }else{
                    let atencion = moment(valores.fechaAtencion);
                    if(atencion.diff(dateCurrently, 'hours') > 0){
                        errores.fechaAtencion = 'Seleccione una fecha valida';
                    }
                  }

                  if(showHospitalizacion){
                    if(!valores.fechaIngreso){
                      errores.fechaIngreso = 'Asegurese de selecionar una fecha';
                    }else{
                      let ingreso = moment(valores.fechaIngreso);
                      if(ingreso.diff(dateCurrently, 'hours') > 0){
                          errores.fechaIngreso = 'Seleccione una fecha valida';
                      }
                    }
                  }

                  if(showFallecimiento){
                    if(!valores.razonFallecimiento){
                      errores.razonFallecimiento = 'No se permiten campos vacíos'
                    }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ.,:; ]+$/g.test(valores.razonFallecimiento)){
                      errores.razonFallecimiento = 'Solo puedes escribir letras';
                    }
                  }
                  
                  if(!valores.seguimiento){
                    errores.seguimiento = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ.,;: ]+$/g.test(valores.seguimiento)){
                    errores.seguimiento = 'Solo puedes escribir letras';
                  }
                  if(!valores.nombreAuxEnfermero){
                    errores.nombreAuxEnfermero = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAuxEnfermero)){
                    errores.nombreAuxEnfermero = 'Solo puedes escribir letras';
                  }
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {

                  const formData={
                    id: infoRemi.id,
                    idSeguimiento: parseInt(idSeg),
                    fechaRemision: moment().format("YYYY-MM-DD"),
                    entidadRemitida: valores.entidadRemitida,
                    atendido: checkeds.radio ? 1 : 0,
                    fechaAtencion: valores.fechaAtencion,
                    motivo: valores.motivo,
                    hospitalizado: checkeds.radio1 ? 1 : 0,
                    fechaIngreso: checkeds.radio1 ? valores.fechaIngreso : null,
                    fechaSalida: valores.fechaSalida,
                    fallecido: checkeds.radio2 ? 1 : 0,
                    razonFallecimiento: checkeds.radio2 ? valores.razonFallecimiento : "",
                    seguimiento: valores.seguimiento,
                    nombreAuxEnfermero: valores.nombreAuxEnfermero,
                  }

                  console.log(formData);
                  //resetForm();
                  formData.token = token;
                  setShowSpinner(true);
                  updateRemisApi(formData, token).then(response => {
                    setShowSpinner(false);
                    console.log(response);
                    if(response === true){
                      setShowSpinner(false);
                      swal({
                        title: `¡La remisión fue editada correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        window.location.replace(`/admin/listControlRemission/${idSeg}/${documento}`);
                    }); 
                    }else{
                      setShowSpinner(false);
                      swal({
                        title: `¡Opss, ocurrió un error!`,
                        icon: 'danger'
                      }).then((value) => {
                        window.location.replace(`/admin/listControlRemission/${idSeg}/${documento}`);
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

                    <Form.Group as={Row} className="mt-2 " style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="3">
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">No. Seguimiento</h1></Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={idSeg} onChange={handleChange} onBlur={handleBlur}disabled
                            />
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="3" className="mt-2 ">
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} >Fecha Remisión</h1></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaRemision" name="fechaRemision" 
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
                               defaultValue={infoRemi.motivo} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.motivo && touched.motivo}
                               isValid={!errors.motivo && touched.motivo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.motivo}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                     </Form.Group>
                        
                    <Form.Group as={Row} className="mt-4 " style={{ "marginLeft":"6px"}}>
                    <Form.Label column sm="5">
                    <h5 style={{fontSize: "16px"}} className="mt-1">Entidad a la cual fue remitido</h5></Form.Label>
                        <Col>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Nombre Entidad" size="xs" id="entidadRemitida" name="entidadRemitida" 
                            defaultValue={infoRemi.entidadRemitida} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.entidadRemitida && touched.entidadRemitida}
                            isValid={!errors.entidadRemitida && touched.entidadRemitida}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.entidadRemitida}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Col md={1}></Col>

                    <Form.Group as={Row} className="mt-4 " style={{ "marginLeft":"6px"}}>
                    <Form.Label column sm="6">
                    <h5 style={{fontSize: "16px"}} className="mt-1">¿Fue Atendido?</h5></Form.Label>
                        <Col>
                        <InputGroup hasValidation style={{ justifyContent :"center"}}>
                          <label class="rocker rocker-small" size="xs" name="atendido" id="atendido" on>
                          <input type="checkbox" name="radio" checked={checkeds.radio ? true : false} unchecked={checkeds.radio ? true : false} onChange={e => onChangeChecked(e)}></input>
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
                                 defaultValue={dateFormat(infoRemi.fechaAtencion)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaAtencion && touched.fechaAtencion}
                                 isValid={!errors.fechaAtencion && touched.fechaAtencion}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaAtencion}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col> 
                      </Form.Group>

                      <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                     <Form.Label column sm="6" >
                     <h5 style={{fontSize: "16px"}}>¿Requirio Hospitalización?</h5></Form.Label>
                     <Col class="mid">
                     <InputGroup hasValidation style={{ justifyContent :"center"}}>
                          <label class="rocker rocker-small" size="xs" name="hospitalizado" id="hospitalizado">
                          <input type="checkbox"  name="radio1" checked={checkeds.radio1 ? true : false} unchecked={checkeds.radio1 ? true : false} onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    {showHospitalizacion && (
                     <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                     <Form.Label column sm="5">
                     <h5 style={{fontSize: "16px"}}>Fecha Ingreso</h5></Form.Label>
                     <Col >
                        <InputGroup hasValidation style={{ justifyContent :"Right"}}>
                              <Form.Control type="date" size="xs" id="fechaIngreso" name="fechaIngreso" 
                                 defaultValue={dateFormat(infoRemi.fechaIngreso)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaIngreso && touched.fechaIngreso}
                                 isValid={!errors.fechaIngreso && touched.fechaIngreso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaIngreso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                     </Col>
                     </Form.Group>
                    )}  

                  {showHospitalizacion && (
                    <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}} >
                    <Form.Label column sm="6">
                    <h5 style={{fontSize: "16px"}} column sm="9">¿Falleció durante el proceso de atención en salud?</h5></Form.Label>
                    <Col sm="6" >
                      <InputGroup hasValidation style={{ justifyContent :"center"}}>
                      <label class="rocker rocker-small" size="xs" name="fallecido" id="fallecido">
                          <input type="checkbox" name="radio2" checked={checkeds.radio2 ? true : false} unchecked={checkeds.radio2 ? true : false} onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                      </InputGroup>
                    </Col>
                    </Form.Group>                      
                    )}

                  {showFallecimiento && (
                      <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-4">
                      <Form.Label column sm="5">
                      <h5 style={{fontSize: "16px"}} className="mt-2">Razón del Fallecimiento</h5></Form.Label>
                      <Col >
                        <InputGroup hasValidation>
                                <Form.Control as="textarea" aria-label="With textarea" placeholder="Describir Motivo Fallecimiento" size="xs" id="razonFallecimiento" name="razonFallecimiento" 
                                defaultValue={infoRemi.razonFallecimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.razonFallecimiento && touched.razonFallecimiento}
                                isValid={!errors.razonFallecimiento && touched.razonFallecimiento}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.razonFallecimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                      </Col>
                      </Form.Group>
                    )}      

                  {showHospitalizacion && !showFallecimiento && (
                      <Form.Group as={Row} className="mt-3" style={{ "marginLeft":"6px"}}>
                      <Form.Label column sm="5">
                      <h5 style={{fontSize: "16px"}}>Fecha Egreso</h5></Form.Label>
                      <Col >
                         <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaSalida" name="fechaSalida" 
                                 defaultValue={dateFormat(infoRemi.fechaSalida)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaSalida && touched.fechaSalida}
                                 isValid={!errors.fechaSalida && touched.fechaSalida}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaSalida}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
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
                               defaultValue={infoRemi.seguimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.seguimiento && touched.seguimiento}
                               isValid={!errors.seguimiento && touched.seguimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.seguimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Row} className="mt-4" style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="5">
                        <h5 style={{fontSize: "16px"}} className="mt-1">Nombre Auxiliar de Enfermeria </h5> </Form.Label>
                        <Col >
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Nombre del Enfermero(a)" size="xs" id="nombreAuxEnfermero" name="nombreAuxEnfermero" 
                               defaultValue={infoRemi.nombreAuxEnfermero} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAuxEnfermero && touched.nombreAuxEnfermero}
                               isValid={!errors.nombreAuxEnfermero && touched.nombreAuxEnfermero}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAuxEnfermero}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>  
                    <Row>
                    <Col md="1"> </Col>
                      <Col md="10">
                        <div className="d-grid gap-2 mb-3 mt-3">
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