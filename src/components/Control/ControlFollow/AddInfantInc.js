import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { TOKEN } from "../../../utils/constans";
import { insertInfantIncomeApi } from "../../../api/infant_income";
import swal from 'sweetalert';
import "./Switch.scss";
import AddIncomeCommit from "./AddIncomeCommit/AddIncomeCommit";
import AddIncomeCommit2 from "./AddIncomeCommit/AddIncomeCommit2";
import AddIncomeCommit3 from "./AddIncomeCommit/AddIncomeCommit3";
import AddIncomeCommit4 from "./AddIncomeCommit/AddIncomeCommit4";
import AddIncomeCommit5 from "./AddIncomeCommit/AddIncomeCommit5";
import AddIncomeCommit6 from "./AddIncomeCommit/AddIncomeCommit6";
import AddIncomeCommit7 from "./AddIncomeCommit/AddIncomeCommit7";
import AddIncomeCommit8 from "./AddIncomeCommit/AddIncomeCommit8";
import AddIncomeCommit9 from "./AddIncomeCommit/AddIncomeCommit9";
import AddIncomeCommit10 from "./AddIncomeCommit/AddIncomeCommit10";

export default function AddInfantInc(props){
  const { idSeg, documento, showValidationM, controlSeguimiento } = props;
  const token = localStorage.getItem(TOKEN);
  const [ goRedirect, setGoRedirect ] = useState();

  const [ showPatologia, setShowPatologia ] = useState(true);
  const [ showMedicamentos, setShowMedicamentos ] = useState(true);
  const [ showRemitido, setRemitido ] = useState(true);
  const [ showSuplemento, setShowSuplemento ] = useState(true);
  const [ showSpinner, setShowSpinner ] = useState(false);

  /*const [ checkeds, setCheckeds ] = useState({ atendido: false, hospitalizado: false, fallecido: false });
  console.log(checkeds);

  const onChangeChecked = (e) => {
      setCheckeds({...checkeds, [e.target.name]: e.target.checked});
  }*/

  const onChangeChecked = (e) => {
    if(e.target.name === "showPatologia"){
      setShowPatologia(!showPatologia);
      setDataCommit7({name: "titulooo", description: "ejemplo description"});
      setSaveData7(!saveData7); 
      //setShowCommit7(!e.target.checked);
    }else if(e.target.name === "showMedicamentos"){
      setShowMedicamentos(!showMedicamentos);
      setDataCommit8({name: "titulooo", description: "ejemplo description"});
      setSaveData8(!saveData8);
      //setShowCommit8(!e.target.checked);
    }else if(e.target.name === "showRemitido"){
      setRemitido(!showRemitido);
      setDataCommit9({name: "titulooo", description: "ejemplo description"});
      setSaveData9(!saveData9);
      //setShowCommit9(!e.target.checked);
    }else if(e.target.name === "showSuplemento"){
      setShowSuplemento(!showSuplemento);
      setDataCommit10({name: "titulooo", description: "ejemplo description"});
      setSaveData10(!saveData10);
      //setShowCommit8(!e.target.checked);
    }
}

  const [showCommit, setShowCommit] = useState(false);
  const [dataCommit, setDataCommit] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData, setSaveData ] = useState(true); //Pasar el estado a true
  
  const [showCommit2, setShowCommit2] = useState(false);
  const [dataCommit2, setDataCommit2] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData2, setSaveData2] = useState(true);
  
  const [showCommit3, setShowCommit3] = useState(false);
  const [dataCommit3, setDataCommit3] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData3, setSaveData3] = useState(true);
  
  const [showCommit4, setShowCommit4] = useState(false);
  const [dataCommit4, setDataCommit4] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData4, setSaveData4] = useState(true);
  
  const [showCommit5, setShowCommit5] = useState(false);
  const [dataCommit5, setDataCommit5] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData5, setSaveData5] = useState(true);
  
  const [showCommit6, setShowCommit6] = useState(false);
  const [dataCommit6, setDataCommit6] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData6, setSaveData6] = useState(true);
  
  const [showCommit7, setShowCommit7] = useState(false);
  const [dataCommit7, setDataCommit7] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData7, setSaveData7] = useState(true);
  
  const [showCommit8, setShowCommit8] = useState(false);
  const [dataCommit8, setDataCommit8] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData8, setSaveData8] = useState(true);
  
  const [showCommit9, setShowCommit9] = useState(false);
  const [dataCommit9, setDataCommit9] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData9, setSaveData9] = useState(true);

  const [showCommit10, setShowCommit10] = useState(false);
  const [dataCommit10, setDataCommit10] = useState({ dateCommit: '', name: "", description: "",  dateEnd: "", idSeg: idSeg});
  const [ saveData10, setSaveData10] = useState(true);

  /*if(!showCommit7){
    setShowPatologia(true);
  }*/

    return(
        <Container>
          {goRedirect && (
              <Redirect to={`/admin/ListFollowUp/${documento}/INFANTE`} />
          )} 

          <AddIncomeCommit edit={false} showCommit={showCommit} setShowCommit={setShowCommit} setDataCommit={setDataCommit} dataCommit={dataCommit} 
            setSaveData={setSaveData} //Entrar al componente
          />
          <AddIncomeCommit2 edit={false} showCommit2={showCommit2} setShowCommit2={setShowCommit2} setDataCommit2={setDataCommit2} dataCommit2={dataCommit2} 
            setSaveData2={setSaveData2}
          />
          <AddIncomeCommit3 edit={false} showCommit3={showCommit3} setShowCommit3={setShowCommit3} setDataCommit3={setDataCommit3} dataCommit3={dataCommit3} 
            setSaveData3={setSaveData3}
          />
          <AddIncomeCommit4 edit={false} showCommit4={showCommit4} setShowCommit4={setShowCommit4} setDataCommit4={setDataCommit4} dataCommit4={dataCommit4} 
            setSaveData4={setSaveData4}
          />
          <AddIncomeCommit5 edit={false} showCommit5={showCommit5} setShowCommit5={setShowCommit5} setDataCommit5={setDataCommit5} dataCommit5={dataCommit5} 
            setSaveData5={setSaveData5}
          />
          <AddIncomeCommit6 edit={false} showCommit6={showCommit6} setShowCommit6={setShowCommit6} setDataCommit6={setDataCommit6} dataCommit6={dataCommit6} 
            setSaveData6={setSaveData6}
          />
          <AddIncomeCommit7 edit={false} setShowPatologia={setShowPatologia} showCommit7={showCommit7} setShowCommit7={setShowCommit7} setDataCommit7={setDataCommit7} dataCommit7={dataCommit7} 
            setSaveData7={setSaveData7}
          />
          <AddIncomeCommit8 edit={false} setShowMedicamentos={setShowMedicamentos} showCommit8={showCommit8} setShowCommit8={setShowCommit8} setDataCommit8={setDataCommit8} dataCommit8={dataCommit8} 
            setSaveData8={setSaveData8}
          />
          <AddIncomeCommit9 edit={false} setRemitido={setRemitido} showCommit9={showCommit9} setShowCommit9={setShowCommit9} setDataCommit9={setDataCommit9} dataCommit9={dataCommit9} 
            setSaveData9={setSaveData9}
          />
           <AddIncomeCommit10 edit={false} setShowSuplemento={setShowSuplemento} showCommit10={showCommit10} setShowCommit10={setShowCommit10} setDataCommit10={setDataCommit10} dataCommit10={dataCommit10} 
            setSaveData10={setSaveData10}
          />
          
              <Row >
              <Col sm={2}> </Col>
                <Col sm={8} className="mt-2 mb-4" style={{backgroundColor: '#f1f1f1', "border-radius":'10px'}}> 
                <Formik
                initialValues={{ 
                  idIngreso: '',
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
                
                validate={(valores) => {
                  let errores = {};
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
                    ingresoInfante: {
                      id: 1,
                      idIngreso: 1,
                      alarmaPreventiva: saveData4 ? "SI" : "NO",
                      controlCyD: saveData6 ? "SI" : "NO",
                      recibeSuplementos: saveData10 ? "SI" : "NO",
                      valoracionMedica: showValidationM ? saveData5 ? "SI" : "NO" : null,
                    },
                    ingresoMadre: null,
                    ingreso: {
                      id: 1,
                      idSeguimiento: parseInt(idSeg),
                      afiliacionSgsss: saveData ? "SI" : "NO",
                      saludOral: saveData2 ? "SI" : "NO",
                      conoceUrgencias: saveData3 ? "SI" : "NO",
                      patologiaIdentificadaSgsss: saveData7 ? 1 : 0,
                      nombrePatologia: showPatologia ? valores.nombrePatologia : "",
                      recibeMedFormulada: saveData8 ? 1 : 0,
                      nombreMedFormululada: showMedicamentos ? valores.nombreMedFormululada : "",
                      eapb: valores.eapb,
                      ips: valores.ips,
                      usuarioRemitido: saveData9 ? 1 : 0,
                      causa: showRemitido ? valores.causa : "",
                    }
                  }
                  console.log(formData);
                  setShowSpinner(true);
                  insertInfantIncomeApi(formData, token).then(response => {
                    setShowSpinner(false);
                    console.log(response);
                    if(response === true){
                      setShowSpinner(false);
                      swal({
                        title: `??El ingreso fue almacenado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        setGoRedirect(1);
                      });
                    }else if(response.status === 403){
                      setShowSpinner(false);
                      swal("??No tienes autorizaci??n para realizar esta acci??n, comun??cate con el Admin!", {
                        icon: "warning",
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
                      <Row>
                      <Form.Label column sm="4"><h1 style={{"fontSize": "22px", "color":"#0084d2" }} className="mt-2">No. Seguimiento </h1></Form.Label>
                        <Col md="2">
                        <InputGroup hasValidation>
                            <Form.Control
                            type="number" className="text-center" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={controlSeguimiento.id} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                          </InputGroup>
                        </Col>
                      <Col md="6"> </Col>
                      </Row>
                    </Form.Group>


                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-1">
                       <Form.Label column sm="9"  > 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold"}} className="mt-1">Cuenta con afiliaci??n al SGSSS</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="afiliacionSgsss" >
                            {/* invertir el save data */}
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
                        
                        <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-1">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Cuenta con valoraci??n y controles en salud oral</h5></Form.Label>
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

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-2 mb-1">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold"}} className="mt-2">Conoce la red de salud o a quien acudir en caso de urgencia</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-1">
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

                        <Form.Group as={Row} style={{ "marginLeft":"43px"}}className="mt-0">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>Identifican signos de alarmas de enfermedades prevalentes de la primera infancia (que ponen en peligro de muerte a ni??os y ni??as)</h5></Form.Label>
                        <Col class="mid" >
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="alarmaPreventiva">
                          <input type="checkbox" checked={showCommit4 || !saveData4 ? false : true } onChange={(e) => setSaveData4(e.target.checked)}></input>
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

                        {showValidationM && (
                        <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-1">
                          <Form.Label column sm="9" >
                          <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>En ni??as y menores de un mes se realiz?? validaci??n m??dica</h5></Form.Label>
                            <Col class="mid">
                            <InputGroup hasValidation >
                              <label class="rocker rocker-small" size="xs" name="valoracionMedica">
                              <input type="checkbox" checked={showCommit5 || !saveData5 ? false : true } onChange={(e) => setShowCommit5(!e.target.checked)}></input>
                              <span class="switch-left">Si</span>
                              <span class="switch-right">No</span>
                              </label>
                                <Form.Control.Feedback type="invalid">
                                            {errors.valoracionMedica}
                                            </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>   
                            </InputGroup>
                            </Col>
                        </Form.Group>
                        )}


                        <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Las ni??as y ni??os cuentan con controles de Crecimiento y Desarrollo</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="controlCyD">
                          <input type="checkbox" checked={showCommit6 || !saveData6 ? false : true } onChange={(e) => setShowCommit6(!e.target.checked)}></input>
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

                    <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2"> La ni??a o ni??os recibe suplementaci??n (vitamina A, Zinc, Hierro)</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="recibeSuplementos">
                          <input type="checkbox" name="showSuplemento" checked={showCommit10 || !saveData10 ? false : true } onChange={(e) => setSaveData10(e.target.checked)}></input>
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

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-2">
                       <Form.Label column sm="9" >
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Presenta una patolog??a asociada identificada??por el SGSSS</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="patologiaIdentificadaSgsss">
                          <input type="checkbox" name="showPatologia" checked={showCommit7 || !saveData7 ? false : true } onChange={(e) => onChangeChecked(e)}></input>
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
                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-3">
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>
                    <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">??Cu??l?</h5></Form.Label>
                    <Col sm="9" class="mid">
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Patolog??a" size="xs" id="nombrePatologia" name="nombrePatologia" 
                               value={values.nombrePatologia} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreMedFormululada && touched.nombreMedFormululada}
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

                        <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-2 mb-2">
                        <Form.Label column sm="9" >
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }} className="mt-2">Recibe medicamentos formulados por el SGSSS para alguna patolog??a</h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="xs" name="recibeMedFormulada">
                          <input type="checkbox" name="showMedicamentos" checked={showCommit8 || !saveData8 ? false : true } onChange={(e) => onChangeChecked(e)}></input>
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
                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-3">
                    <Form.Label column sm="2">
                    <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>??Cu??l?</h5></Form.Label>
                    <Col md="9" class="mid" >
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

                    <Form.Group as={Row} style={{ "marginLeft":"43px"}}  className="mt-3">
                     <Form.Label column sm="2">
                     <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>EAPB</h5></Form.Label>
                     <Col md="4" class="mid" >
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

                        <Form.Label column sm="1">
                        <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>IPS</h5></Form.Label>
                        <Col sm="4" >
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


                    <Form.Group as={Row}  style={{ "marginLeft":"43px"}} className="mt-3">
                       <Form.Label column sm="9"> 
                       <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>El usuario fue remitido a SGSSS </h5></Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="xs" name="usuarioRemitido">
                          <input type="checkbox" name="showRemitido" checked={showCommit9 || !saveData9 ? false : true } onChange={(e) => onChangeChecked(e)}></input>
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
                    <Form.Group as={Row} style={{ "marginLeft":"43px"}} className="mt-3 mb-3">
                    <Form.Label column sm="2">
                    <h5 style={{"fontSize": "16px", "fontWeight":"bold" }}>??Por qu???</h5></Form.Label>
                    <Col sm="9">
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
                                "Guardar" 
                            )}
                          </Button>
                        </div>
                        </Col>
                      </center>
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