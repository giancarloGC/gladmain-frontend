import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { updateMotIncomeApi } from "../../../api/mother_income";
import swal from 'sweetalert';
import "./Switch.scss";
import AddMotherCommit from "./AddMotherComit/AddMotherCommit";
import AddMotherCommit2 from "./AddMotherComit/AddMotherCommit2";
import AddMotherCommit3 from "./AddMotherComit/AddMotherCommit3";
import AddMotherCommit4 from "./AddMotherComit/AddMotherCommit4";
import AddMotherCommit5 from "./AddMotherComit/AddMotherCommit5";
import AddMotherCommit6 from "./AddMotherComit/AddMotherCommit6";
import AddMotherCommit7 from "./AddMotherComit/AddMotherCommit7";
import AddMotherCommit8 from "./AddMotherComit/AddMotherCommit8";
import AddMotherCommit9 from "./AddMotherComit/AddMotherCommit9";
import AddMotherCommit10 from "./AddMotherComit/AddMotherCommit10";
import AddMotherCommit11 from "./AddMotherComit/AddMotherCommit11";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";

export default function EditMotherInc(props){
  const { idSeg, documento, ingreso } = props;
  const token = localStorage.getItem(TOKEN);
  const [ showSpinner, setShowSpinner ] = useState(false);
  const [ checkeds, setCheckeds ] = useState({ 
      vomitoControlado: ingreso.ingresoMadre.vomitoControlado,
      dolorCabeza: ingreso.ingresoMadre.dolorCabeza,
      fiebre: ingreso.ingresoMadre.fiebre,
      ardorOrinar: ingreso.ingresoMadre.ardorOrinar,
      hinchamiento: ingreso.ingresoMadre.hinchamiento,
      dolorBocaEstomago: ingreso.ingresoMadre.dolorBocaEstomago,
      sangrado: ingreso.ingresoMadre.sangrado,
      movimientoFetal: ingreso.ingresoMadre.movimientoFetal
    //atendido: false, hospitalizado: false, fallecido: false 
  });
  const [ goRedirect, setGoRedirect ] = useState();
  console.log(ingreso);
  const [ showPatologia, setShowPatologia ] = useState(ingreso.ingreso.patologiaIdentificadaSgsss);
  const [ showMedicamentos, setShowMedicamentos ] = useState(ingreso.ingreso.recibeMedFormulada);
  const [ showRemitido, setRemitido ] = useState(ingreso.ingreso.usuarioRemitido === "1" ? true : false);


  const onChangeChecked = (e) => {
    if(e.target.name === "showPatologia"){
      setShowPatologia(!showPatologia);
      setDataCommit9({name: "titulooo", description: "ejemplo description"});
      setSaveData9(!saveData9); 
      //setShowCommit7(!e.target.checked);
    }else if(e.target.name === "showMedicamentos"){
      setShowMedicamentos(!showMedicamentos);
      setDataCommit10({name: "titulooo", description: "ejemplo description"});
      setSaveData10(!saveData10);
      //setShowCommit8(!e.target.checked);
    }else if(e.target.name === "showRemitido"){
      setRemitido(!showRemitido);
      setDataCommit11({name: "titulooo", description: "ejemplo description"});
      setSaveData11(!saveData11);
      //setShowCommit9(!e.target.checked);
    }else{
        setCheckeds({...checkeds, [e.target.name]: e.target.checked ? "SI" : "NO"});
    }
  } 
  /*const [ checkeds, setCheckeds ] = useState({ atendido: false, hospitalizado: false, fallecido: false });
  console.log(checkeds);
*/

  const [showCommit, setShowCommit] = useState(false);
  const [dataCommit, setDataCommit] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData, setSaveData ] = useState(ingreso.ingreso.afiliacionSgsss === "SI" ? true : false); //Pasar el estado a true
  
  const [showCommit2, setShowCommit2] = useState(false);
  const [dataCommit2, setDataCommit2] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData2, setSaveData2] = useState(ingreso.ingreso.saludOral === "SI" ? true : false);
  
  const [showCommit3, setShowCommit3] = useState(false);
  const [dataCommit3, setDataCommit3] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData3, setSaveData3] = useState(ingreso.ingreso.conoceUrgencias === "SI" ? true : false);
  
  const [showCommit4, setShowCommit4] = useState(false);
  const [dataCommit4, setDataCommit4] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData4, setSaveData4] = useState(ingreso.ingresoMadre.controlPrenatal === "SI" ? true : false);
  
  const [showCommit5, setShowCommit5] = useState(false);
  const [dataCommit5, setDataCommit5] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData5, setSaveData5] = useState(ingreso.ingresoMadre.cuentaMicro === "SI" ? true : false);
  
  const [showCommit6, setShowCommit6] = useState(false);
  const [dataCommit6, setDataCommit6] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData6, setSaveData6] = useState(ingreso.ingresoMadre.examenMedico === "SI" ? true : false);
  
  const [showCommit7, setShowCommit7] = useState(false);
  const [dataCommit7, setDataCommit7] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData7, setSaveData7] = useState(ingreso.ingresoMadre.senalPeligro === "SI" ? true : false);
  
  const [showCommit8, setShowCommit8] = useState(false);
  const [dataCommit8, setDataCommit8] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData8, setSaveData8] = useState(ingreso.ingresoMadre.metodoPlanificacion === "SI" ? true : false);
  
  const [showCommit9, setShowCommit9] = useState(false);
  const [dataCommit9, setDataCommit9] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData9, setSaveData9] = useState(ingreso.ingreso.patologiaIdentificadaSgsss);

  const [showCommit10, setShowCommit10] = useState(false);
  const [dataCommit10, setDataCommit10] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData10, setSaveData10] = useState(ingreso.ingreso.recibeMedFormulada);

  const [showCommit11, setShowCommit11] = useState(false);
  const [dataCommit11, setDataCommit11] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData11, setSaveData11] = useState(ingreso.ingreso.usuarioRemitido === "1" ? true : false);

    return(
        <Container>
          {goRedirect && (
              <Redirect to={`/admin/ListFollowUp/${documento}/MADRE_GESTANTE`} />
          )} 
          <AddMotherCommit edit={false} showCommit={showCommit} setShowCommit={setShowCommit} setDataCommit={setDataCommit} dataCommit={dataCommit} 
            setSaveData={setSaveData} //Entrar al componente
          />
          <AddMotherCommit2 edit={false} showCommit2={showCommit2} setShowCommit2={setShowCommit2} setDataCommit2={setDataCommit2} dataCommit2={dataCommit2} 
            setSaveData2={setSaveData2}
          />
          <AddMotherCommit3 edit={false} showCommit3={showCommit3} setShowCommit3={setShowCommit3} setDataCommit3={setDataCommit3} dataCommit3={dataCommit3} 
            setSaveData3={setSaveData3}
          />
          <AddMotherCommit4 edit={false} showCommit4={showCommit4} setShowCommit4={setShowCommit4} setDataCommit4={setDataCommit4} dataCommit4={dataCommit4} 
            setSaveData4={setSaveData4}
          />
          <AddMotherCommit5 edit={false} showCommit5={showCommit5} setShowCommit5={setShowCommit5} setDataCommit5={setDataCommit5} dataCommit5={dataCommit5} 
            setSaveData5={setSaveData5}
          />
          <AddMotherCommit6 edit={false} showCommit6={showCommit6} setShowCommit6={setShowCommit6} setDataCommit6={setDataCommit6} dataCommit6={dataCommit6} 
            setSaveData6={setSaveData6}
          />
          <AddMotherCommit7 edit={false} showCommit7={showCommit7} setShowCommit7={setShowCommit7} setDataCommit7={setDataCommit7} dataCommit7={dataCommit7} 
            setSaveData7={setSaveData7}
          />
          <AddMotherCommit8 edit={false} showCommit8={showCommit8} setShowCommit8={setShowCommit8} setDataCommit8={setDataCommit8} dataCommit8={dataCommit8} 
            setSaveData8={setSaveData8}
          />
          <AddMotherCommit9 edit={false} showCommit9={showCommit9} setShowCommit9={setShowCommit9} setDataCommit9={setDataCommit9} dataCommit9={dataCommit9} 
            setSaveData9={setSaveData9}
          />
           <AddMotherCommit10 edit={false} showCommit10={showCommit10} setShowCommit10={setShowCommit10} setDataCommit10={setDataCommit10} dataCommit10={dataCommit10} 
            setSaveData10={setSaveData10}
          />
          <AddMotherCommit11 edit={false} showCommit11={showCommit11} setShowCommit11={setShowCommit11} setDataCommit11={setDataCommit11} dataCommit11={dataCommit11} 
            setSaveData11={setSaveData11}
          />
              <Row >
              <Col sm={2}> </Col>
                <Formik
                initialValues={{ 
                  controlPrenatal: "asd",
                      cantidadSemanas: ingreso.ingresoMadre.cantidadSemanas,
                      cuentaMicro: "",
                      examenMedico: "",
                      senalPeligro: "",
                      metodoPlanificacion: "",
                      vomitoControlado: "",
                      dolorCabeza: "",
                      fiebre: "",
                      ardorOrinar: "",
                      hinchamiento: "",
                      dolorBocaEstomago: "",
                      sangrado: "",
                      movimientoFetal: "",
                      

                    idSeguimiento: '',
                    afiliacionSgsss: '',
                    saludOral: '',
                    conoceUrgencias: '',
                    patologiaIdentificadaSgsss: '',
                    nombrePatologia: ingreso.ingreso.nombrePatologia,
                    recibeMedFormulada: '',
                    nombreMedFormululada: ingreso.ingreso.nombreMedFormululada,
                    eapb: ingreso.ingreso.eapb,
                    ips: ingreso.ingreso.ips,
                    usuarioRemitido: '',
                    causa: ingreso.ingreso.causa,
                }}
                
                validate={(valores) => {
                  let errores = {};
                  if(!valores.cantidadSemanas){
                    errores.cantidadSemanas = 'Por favor, ingresa n??meros';
                  }else if(!/^([0-9])*$/.test(valores.cantidadSemanas)){
                    errores.cantidadSemanas = 'solo puedes escribir n??meros';
                  }
                  
                  if(showPatologia){
                    if(!valores.nombrePatologia){
                      errores.nombrePatologia = 'No se permiten campos vac??os'
                    }
                  }
                  if(showMedicamentos){
                    if(!valores.nombreMedFormululada){
                      errores.nombreMedFormululada = 'No se permiten campos vac??os'
                    }
                  }

                  if(!valores.eapb){
                    errores.eapb = 'No se permiten campos vac??os'
                  }else if(!/^[A-Za-z???????????????????????? ]+$/g.test(valores.eapb)){
                    errores.eapb = 'Solo puedes escribir letras';
                  }
                  if(!valores.ips){
                    errores.ips = 'No se permiten campos vac??os'
                  }else if(!/^[A-Za-z???????????????????????? ]+$/g.test(valores.ips)){
                    errores.ips = 'Solo puedes escribir letras';
                  }

                  if(showRemitido){
                    if(!valores.causa){
                      errores.causa = 'No se permiten campos vac??os'
                    }else if(!/^[A-Za-z???????????????????????? ]+$/g.test(valores.causa)){
                      errores.causa = 'Solo puedes escribir letras';
                    }
                  }
                  
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  const formData = {
                    ingresoInfante: null,
                    ingresoMadre: {
                      id: ingreso.ingresoMadre.id,
                      idIngreso:ingreso.ingresoMadre.idIngreso,
                      controlPrenatal: saveData4 ? "SI" : "NO",
                      cantidadSemanas: valores.cantidadSemanas,
                      cuentaMicro: saveData5 ? "SI" : "NO",
                      examenMedico: saveData6 ? "SI" : "NO",
                      senalPeligro: saveData7 ? "SI" : "NO",
                      metodoPlanificacion: saveData8 ? "SI" : "NO",

                      vomitoControlado: checkeds.vomitoControlado,
                      dolorCabeza: checkeds.dolorCabeza,
                      fiebre: checkeds.fiebre,
                      ardorOrinar: checkeds.ardorOrinar,
                      hinchamiento: checkeds.hinchamiento,
                      dolorBocaEstomago: checkeds.dolorBocaEstomago,
                      sangrado: checkeds.sangrado,
                      movimientoFetal: checkeds.movimientoFetal
                    },
                    ingreso: {
                      id: ingreso.ingreso.id,
                      idSeguimiento: parseInt(idSeg),
                      afiliacionSgsss: saveData ? "SI" : "NO",
                      saludOral: saveData2 ? "SI" : "NO",
                      conoceUrgencias: saveData3 ? "SI" : "NO",
                      patologiaIdentificadaSgsss: saveData9 ? true : false,
                      nombrePatologia: showPatologia ? valores.nombrePatologia : "",
                      recibeMedFormulada: saveData10 ? true : false,
                      nombreMedFormululada: valores.nombreMedFormululada,
                      eapb: valores.eapb,
                      ips: valores.ips,
                      usuarioRemitido: saveData11 ? "1" : "0",
                      causa: showRemitido ? valores.causa : "",
                    }
                  }
                  console.log(formData);
                  setShowSpinner(true);
                  updateMotIncomeApi(formData, token).then(response => {
                    setShowSpinner(false);
                    console.log(response);
                    if(response === true){
                      setShowSpinner(false);
                      swal({
                        title: `??El ingreso fue actualizado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        setGoRedirect(1);
                      });
                    }else if(response.status === 403){
                      setShowSpinner(false);
                      swal("??No tienes autorizaci??n para realizar esta acci??n, comun??cate con el Admin!", {
                        icon: "warning",
                      }).then((value) => {
                        localStorage.removeItem(TOKEN);
                        window.location.replace("/");
                      });
                    }else{
                      setShowSpinner(false);
                      swal({
                        title: `??Opss, ocurri?? un error!`,
                        icon: 'danger'
                      }).then((value) => {
                        setGoRedirect(1);
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
                        <Form.Label column sm="3"><h1 style={{"fontSize": "22px", "color":"#0084d2" }} className="mt-1">No. Seguimiento </h1></Form.Label>
                          <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control
                            type="number" className="text-center" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={ingreso.ingreso.idSeguimiento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                          </InputGroup>
                        </Col>

                        <Col sm="2"> </Col>

                        <Form.Label column sm="3"><h1 style={{"fontSize": "22px", "color":"#0084d2" }} className="mt-1">Semana de Gestaci??n</h1></Form.Label>
                          <Col sm="2">
                          <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="# de semanas" size="lg" id="cantidadSemanas" name="cantidadSemanas" 
                               value={values.cantidadSemanas} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.cantidadSemanas && touched.cantidadSemanas}
                               isValid={!errors.cantidadSemanas && touched.cantidadSemanas}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cantidadSemanas}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                    <Col sm={6} className="mt-2 mb-2" style={{backgroundColor: '#f1f1f1', "border-radius":'10px'}}>

                    <Col style={{backgroundColor:"white", "border-radius":'5px'}} className="mt-2 mb-2">
                    <center>
                    <Form.Label column sm="10" className="align-self-center justify-content-around"> 
                    <h1 style={{fontSize: "20px"}}>Ingreso Madre Gestante</h1></Form.Label>
                    </center>
                    </Col>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}}>
                       <Form.Label column sm="9"  > 
                       <h5 style={{"fontSize": "16px"}} className="mt-1">Cuenta con afiliaci??n al SGSSS</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="afiliacionSgsss" >
                          <input type="checkbox" checked={showCommit || !saveData ? false : true } onChange={(e) => setShowCommit(!e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.afiliacionSgsss}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px"}} className="mt-2">Cuenta con valoraci??n y controles en salud oral</h5></Form.Label>
                        <Col  class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="saludOral">
                          <input type="checkbox" checked={showCommit2 || !saveData2 ? false : true } onChange={(e) => setShowCommit2(!e.target.checked)}></input>
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

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px"}}>Conoce la red de salud o a quien acudir en caso de urgencia</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="conoceUrgencias">
                          <input type="checkbox" checked={showCommit3 || !saveData3 ? false : true } onChange={(e) => setSaveData3(e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.conoceUrgencias}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px"}} className="mt-1">Asiste a controles prenatales</h5></Form.Label>
                        <Col class="mid" >
                        <InputGroup hasValidation className="mt-1">
                          <label class="rocker rocker-small" size="lg" name="controlPrenatal">
                          <input type="checkbox" checked={showCommit4 || !saveData4 ? false : true } onChange={(e) => setShowCommit4(!e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.controlPrenatal}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    
                    <Form.Group as={Row}  style={{ "marginLeft":"6px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px"}}>Cuenta con suministro de micronutrientes Hierro, ??cido f??lico y calcio y los consume</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="cuentaMicro">
                          <input type="checkbox" checked={showCommit5 || !saveData5 ? false : true } onChange={(e) => setShowCommit5(!e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.cuentaMicro}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                        <Form.Group as={Row}  style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px"}}>Se ha realizado ex??menes m??dicos recomendados para mujeres gestantes</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="examenMedico">
                          <input type="checkbox" checked={showCommit6 || !saveData6 ? false : true } onChange={(e) => setShowCommit6(!e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.examenMedico}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}  style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-1">Reconoce las se??ales de peligro durante el embarazo</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-1">
                          <label class="rocker rocker-small" size="xs" name="senalPeligro">
                          <input type="checkbox" checked={showCommit7 || !saveData7 ? false : true } onChange={(e) => setSaveData7(e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.senalPeligro}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}  style={{ "marginLeft":"6px"}} className="mt-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-1">Con su pareja tienen acordado m??todo de planificaci??n para despu??s de que nazca la ni??a o ni??o</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="metodoPlanificacion">
                          <input type="checkbox" checked={showCommit8 || !saveData8 ? false : true } onChange={(e) => setShowCommit8(!e.target.checked)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.metodoPlanificacion}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}}>
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>Presenta una patolog??a asociada identificada??por el SGSSS</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="patologiaIdentificadaSgsss">
                          <input type="checkbox" name="showPatologia" checked={showCommit9 || !saveData9 ? false : true } onChange={(e) => onChangeChecked(e)}></input>
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
                    
                    {showPatologia && (
                      <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                      <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>
                      <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-1">??Cu??l?</h5></Form.Label>
                      <Col sm="9" class="mid" style={{marginLeft:"7px"}}>
                          <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Nombre Patolog??a" size="xs" id="nombrePatologia" name="nombrePatologia" 
                                value={values.nombrePatologia} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombrePatologia && touched.nombrePatologia}
                                isValid={!errors.nombrePatologia && touched.nombrePatologia}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.nombrePatologia}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                      </Col>
                      </Form.Group>
                    )}

                        <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-1">Recibe medicamentos formulados por el SGSSS para alguna patolog??a</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="recibeMedFormulada">
                          <input type="checkbox" name="showMedicamentos" checked={showCommit10 || !saveData10 ? false : true } onChange={(e) => onChangeChecked(e)}></input>
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
                    
                    {showMedicamentos && (
                      <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                      <Form.Label column sm="2">
                      <h5 style={{"fontSize": "16px"}}>??Cu??l?</h5></Form.Label>
                      <Col md="9" class="mid" style={{marginLeft:"7px"}}>
                          <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Nombre Medicamento Formulado" size="xs" id="nombreMedFormululada" name="nombreMedFormululada" 
                                value={values.nombreMedFormululada} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreMedFormululada && touched.nombreMedFormululada}
                                isValid={!errors.nombreMedFormululada && touched.nombreMedFormululada}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.nombreMedFormululada}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      </Form.Group> 
                    )}                  
                    </Col>

                    <Col sm={6} className="mt-2 mb-2" style={{backgroundColor: '#f1f1f1', "border-radius":'10px'}}>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}}  className="mt-3">
                     <Form.Label column sm="2">
                     <h5 style={{"fontSize": "16px"}}>EAPB</h5></Form.Label>
                     <Col md="9" class="mid" style={{marginLeft:"7px"}}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre EAPB" size="xs" id="eapb" name="eapb" 
                               value={values.eapb} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.eapb && touched.eapb}
                               isValid={!errors.eapb && touched.eapb}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.eapb}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{ "marginLeft":"6px"}}  className="mt-3">
                        <Form.Label column sm="2">
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>IPS</h5></Form.Label>
                        <Col sm="9" style={{marginLeft:"7px"}}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre IPS" size="xs" id="ips" name="ips" 
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


                    <Form.Group as={Row}  style={{ "marginLeft":"6px"}} className="mt-3">
                       <Form.Label column sm="9"> 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>El usuario fue remitido a SGSSS </h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="usuarioRemitido">
                          <input type="checkbox" name="showRemitido" checked={showCommit11 || !saveData11 ? false : true } onChange={(e) => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>
                            <Form.Control.Feedback type="invalid">
                                        {errors.usuarioRemitido}
                                        </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    {showRemitido && (
                      <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-2">
                      <Form.Label column sm="2">
                      <h5 style={{"fontSize": "16px"}}>??Por qu???</h5></Form.Label>
                      <Col sm="9" style={{marginLeft:"7px"}} className="mt-2">                        
                          <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Escriba la causa" size="xs" id="causa" name="causa" 
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
                    )}

                    <Col style={{backgroundColor:"white", "border-radius":'5px'}}>
                    <center>
                    <Form.Label column sm="10" className="align-self-center justify-content-around"> 
                    <h1 style={{fontSize: "20px"}}> Se??ales de peligro en la gestaci??n (AIEPI) </h1></Form.Label>
                    </center>
                    </Col>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                       <Form.Label column sm="9"  > 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold"}} className="mt-1">V??mito continuo</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="vomitoControlado" id="vomitoControlado">
                          <input type="checkbox" name="vomitoControlado" checked={checkeds.vomitoControlado === "SI" ? true : false} onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-1">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Dolor de cabeza</h5></Form.Label>
                        <Col  class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="dolorCabeza" id="dolorCabeza">
                          <input type="checkbox" name="dolorCabeza" checked={checkeds.dolorCabeza === "SI" ? true : false} onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold"}} className="mt-2">Fiebre</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="fiebre" id="fiebre">
                          <input type="checkbox" name="fiebre" checked={checkeds.fiebre === "SI" ? true : false}  onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}  style={{ "marginLeft":"6px"}} className="mt-3">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px"}} className="mt-1">Dolor en la boca del est??mago</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="dolorBocaEstomago" id="dolorBocaEstomago">
                          <input type="checkbox" name="dolorBocaEstomago" checked={checkeds.dolorBocaEstomago === "SI" ? true : false}   onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                        </Form.Group>
                    
                    <Form.Group as={Row}  style={{ "marginLeft":"6px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px"}} className="mt-1">Ardor al orinar</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                         <label class="rocker rocker-small" size="xs" name="ardorOrinar" id="ardorOrinar">
                          <input type="checkbox" name="ardorOrinar" checked={checkeds.ardorOrinar === "SI" ? true : false}  onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}  style={{ "marginLeft":"6px"}} className="mt-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px"}} className="mt-3">Sangrado</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                         <label class="rocker rocker-small" size="xs" name="sangrado" id="sangrado">
                          <input type="checkbox" name="sangrado" checked={checkeds.sangrado === "SI" ? true : false} onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label> 
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Cara, manos o pies hinchados</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="hinchamiento" id="hinchamiento">
                          <input type="checkbox" name="hinchamiento" checked={checkeds.hinchamiento === "SI" ? true : false} onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{ "marginLeft":"6px"}} className="mt-2 mb-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Disminuci??n de los movimientos fetales</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="movimientoFetal" id="movimientoFetal">
                          <input type="checkbox" name="movimientoFetal" checked={checkeds.movimientoFetal === "SI" ? true : false}  onChange={e => onChangeChecked(e)}></input>
                          <span class="switch-left">Si</span>
                          <span class="switch-right">No</span>
                          </label>  
                        </InputGroup>
                        </Col>
                    </Form.Group>
                    </Col>
                    </Form.Group>
                    <center>
                        <Col sm={10}> 
                        <div className="d-grid gap-2 mb-3">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                          {showSpinner ? (
                                <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                                {"  " + `  Cargando...`}  
                                </>
                                ):(
                                "Actualizar" 
                            )}
                        </Button>
                        </div>
                        </Col>
                      </center>
                    </Form>
                            );
                        }}
                      </Formik> 
                <Col sm={2}> </Col>
            </Row>
        </Container>
    )

}