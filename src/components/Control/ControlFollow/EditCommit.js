
import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { updateCompApi } from "../../../api/commitment";
import swal from 'sweetalert';
import moment from 'moment';
import "./Switch.scss";
import { getInfantIncomeApi, updateInfantIncomeApi } from "../../../api/infant_income";
import { listUsersByRol, getUserByIdApi } from "../../../api/user";
import { getMotIncomeByUserApi, updateMotIncomeApi } from "../../../api/mother_income";

export default function EditCommit(props){
  const { segControl, control, documento, checkeds, setCheckeds} = props;
  const token = localStorage.getItem(TOKEN);
  const [ showSpinner, setShowSpinner ] = useState(false);
 
  console.log(control);
  console.log(checkeds);
  

  const onChangeChecked = (e) => {
    if(e.target.name === "radio1"){
      setCheckeds({ radio1: true, radio: false });
    }else{
      setCheckeds({ radio1: false, radio: true });
    }
  }

  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');
    return dateFormated[0];
    }
  }

    return(
        <Container>
            <Row className='justify-content-center'>
                <Col sm={10} className="mt-2 mb-4"> 
                
                <Formik
                initialValues={{ 
                  idSeguimientoSalud: '',
                  fechaCompromiso: control.fechaCompromiso,
                  nombre: control.nombre,
                  nuevoCompromiso: control.nuevoCompromiso,
                  fechaCumplimiento: control.fechaCumplimiento,
                  nombreAuxiliarEnfermeria: control.nombreAuxiliarEnfermeria,
                  tipo: control.tipo,
                  fechaTentativaCump: control.fechaTentativaCump ? control.fechaTentativaCump : '' 
                }}
                
                validate={(valores) => {
                  let errores = {};
                  let dateCurrent = moment();
                  let dateFechaCompromiso = moment(valores.fechaCompromiso);
                  let dateFechaCumplimiento = moment(valores.fechaCumplimiento);
                  if(dateFechaCumplimiento.diff(dateCurrent, 'hours') > 0 || dateFechaCumplimiento.diff(dateFechaCompromiso, 'hours') < 0){
                    errores.fechaCumplimiento = 'Seleccione una fecha valida';
                  }

                  const dateCurrently2 = new Date();
                 if(dateCurrently2 <= valores.fechaCumplimiento){
                    errores.fechaCumplimiento = 'Seleccione una fecha valida';
                  }
                 if(!/^[A-Za-z???????????????????????? ]+$/g.test(valores.nombreAuxiliarEnfermeria)){
                    errores.nombreAuxiliarEnfermeria = 'Nombre incorrecto, solo puedes escribir letras';
                  }

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {

                  const formData={
                    id: control.id,
                    idSeguimientoSalud: segControl.id,
                    fechaCompromiso: valores.fechaCompromiso,
                    nombre: valores.nombre,
                    nuevoCompromiso: valores.nuevoCompromiso,
                    fechaCumplimiento: valores.fechaCumplimiento,
                    nombreAuxiliarEnfermeria: valores.nombreAuxiliarEnfermeria,
                    tipo: checkeds.radio ? "Compromiso por nuevo factor de riesgo" : "Compromiso cumplido que no se mantuvo",
                    fechaTentativaCump: valores.fechaTentativaCump
                  }
                  console.log(formData);
                  //resetForm();
                  valores.token = token;
                  setShowSpinner(true);
                  updateCompApi(formData, token).then(response => {
                    setShowSpinner(false);
                    if(response === true){
                      if(formData.fechaCumplimiento !== null){
                            (async () => {
                              const responseInfants = await listUsersByRol("INFANTE", token);
                              let docParseado = parseInt(documento);                     
                              let usersInfants = responseInfants.filter(usuarioInf => usuarioInf.documento === docParseado); 
                              if(usersInfants.length > 0){
                                console.log("es ni??o");
                                 let listIngresos = await getInfantIncomeApi(documento, token);
                                 let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(segControl.id));
                                 console.log(ingresoBySeg[0]);
                                 if(control.nombre === "Cuenta con afiliaci??n al SGSSS"){
                                   ingresoBySeg[0].ingreso.afiliacionSgsss = "SI";
                                 }
                                 if(control.nombre === "Cuenta con valoraci??n y controles en salud oral"){
                                   ingresoBySeg[0].ingreso.saludOral = "SI";
                                 }
                                 if(control.nombre === "En ni??as y menores de un mes se realiz?? validaci??n m??dica"){
                                   ingresoBySeg[0].ingresoInfante.valoracionMedica = "SI";
                                 }
                                 if(control.nombre === "Las ni??as y ni??os cuentan con controles de Crecimiento y Desarrollo"){
                                   ingresoBySeg[0].ingresoInfante.controlCyD = "SI";
                                 }
   
                                 updateInfantIncomeApi(ingresoBySeg[0], token).then(response => {
                                   if(response === true){
                                     setShowSpinner(false);
                                     swal({
                                       title: `??El compromiso fue actualizado correctamente!`,
                                       icon: 'success'
                                     }).then((value) => {
                                       window.location.replace(`/admin/commitments/${segControl.id}/${documento}`);
                                     }); 
                                   }else{
                                     setShowSpinner(false);
                                     swal({
                                       title: `??Opss, ocurri?? un error!`,
                                       icon: 'danger'
                                     }).then((value) => {
                                       window.location.replace(`/admin/commitments/${segControl.id}/${documento}`);
                                     }); 
                                   }
                                 });

                              }else{
                                  let listIngresos = await getMotIncomeByUserApi(documento, token);
                                 let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(segControl.id));
                                 console.log(ingresoBySeg[0]);
                                 if(control.nombre === "Cuenta con afiliaci??n al SGSSS"){
                                   ingresoBySeg[0].ingreso.afiliacionSgsss = "SI";
                                 }
                                 if(control.nombre === "Cuenta con valoraci??n y controles en salud oral"){
                                   ingresoBySeg[0].ingreso.saludOral = "SI";
                                 }
                                 if(control.nombre === "Asiste a controles prenatales"){
                                   ingresoBySeg[0].ingresoMadre.controlPrenatal = "SI";
                                 }
                                 if(control.nombre === "Cuenta con suministro de micronutrientes Hierro, ??cido f??lico y calcio y los consume"){
                                   ingresoBySeg[0].ingresoMadre.cuentaMicro = "SI";
                                 }
                                 if(control.nombre === "Se ha realizado ex??menes m??dicos recomendados para mujeres gestantes"){
                                  ingresoBySeg[0].ingresoMadre.examenMedico = "SI";
                                }
                                if(control.nombre === "Con su pareja tienen acordado m??todo de planificaci??n para despu??s de que nazca la ni??a o ni??o"){
                                  ingresoBySeg[0].ingresoMadre.metodoPlanificacion = "SI";
                                }
   
                                updateMotIncomeApi(ingresoBySeg[0], token).then(response => {
                                   if(response === true){
                                     setShowSpinner(false);
                                     swal({
                                       title: `??El compromiso fue actualizado correctamente!`,
                                       icon: 'success'
                                     }).then((value) => {
                                       window.location.replace(`/admin/commitments/${segControl.id}/${documento}`);
                                     }); 
                                   }else{
                                     setShowSpinner(false);
                                     swal({
                                       title: `??Opss, ocurri?? un error!`,
                                       icon: 'danger'
                                     }).then((value) => {
                                       window.location.replace(`/admin/commitments/${segControl.id}/${documento}`);
                                     }); 
                                   }
                                 });
                              }
                            })();
                          }
                      /*setShowSpinner(false);
                      swal({
                        title: `??El compromiso fue actualizado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        window.location.replace(`/admin/commitments/${segControl.id}/${documento}`);
                      }); */
                    }else{
                      setShowSpinner(false);
                      console.log("no resgistro compromiso");
                      swal({
                        title: `??Opss, ocurri?? un error!`,
                        icon: 'danger'
                      }).then((value) => {
                        window.location.replace(`/admin/commitments/${segControl.id}/${documento}`);
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
                        <Form.Label column sm="3"><h1 style={{fontSize: "20px", color:"#0084d2" }} >No. Seguimiento</h1></Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="xs" id="idSeguimientoSalud" name="idSeguimientoSalud" 
                               defaultValue={segControl.id} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm=""></Col>
                        <Form.Label column sm="3"><h1 style={{fontSize: "20px", color:"#0084d2" }} >Fecha Compromiso</h1></Form.Label>
                        <Col >
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaCompromiso" name="fechaCompromiso" 
                                 defaultValue={dateFormat(control.fechaCompromiso)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group>
                    
                    <Container style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}><br/>

                    {control.tipo !== null && (
                      control && (
                        <Form.Group as={Row} className="mb-1 ">
                        <center>
                        <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Seleccione una opci??n</b></Form.Label>
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
                        )
                    )}
                    

                    <Form.Group as={Row} className="mt-2">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Nombre Compromiso</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Compromiso" size="xs" id="nombre" name="nombre" 
                               defaultValue={control.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
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
                               <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Descripci??n Compromiso" size="xs" id="nuevoCompromiso" name="nuevoCompromiso" 
                               defaultValue={control.nuevoCompromiso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nuevoCompromiso && touched.nuevoCompromiso}
                               isValid={!errors.nuevoCompromiso && touched.nuevoCompromiso}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nuevoCompromiso}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column sm="4"><h5 style={{fontSize: "16px"}}>Fecha Cumplimiento </h5></Form.Label>
                        <Col>
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaCumplimiento" name="fechaCumplimiento" 
                                 defaultValue={dateFormat(control.fechaCumplimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaCumplimiento && touched.fechaCumplimiento}
                                 isValid={!errors.fechaCumplimiento && touched.fechaCumplimiento}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaCumplimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-4">
                        <Form.Label column sm="4"><h5 style={{fontSize: "16px"}}>Profesional encargado</h5></Form.Label>
                        <Col>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Nombre profesional" size="xs" id="nombreAuxiliarEnfermeria" name="nombreAuxiliarEnfermeria" 
                               defaultValue={control.nombreAuxiliarEnfermeria} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAuxiliarEnfermeria && touched.nombreAuxiliarEnfermeria}
                               isValid={!errors.nombreAuxiliarEnfermeria && touched.nombreAuxiliarEnfermeria}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAuxiliarEnfermeria}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-1">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Fecha tentativa cumplimiento</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                        <Form.Control type="date" size="xs" id="fechaTentativaCump" name="fechaTentativaCump" 
                                 defaultValue={dateFormat(control.fechaTentativaCump)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaTentativaCump && touched.fechaTentativaCump}
                                 isValid={!errors.fechaTentativaCump && touched.fechaTentativaCump}
                              />
                            <Form.Control.Feedback type="invalid">
                                {errors.fechaTentativaCump}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
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