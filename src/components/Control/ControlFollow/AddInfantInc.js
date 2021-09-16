import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
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

export default function AddInfantInc(){
  const [showCommit, setShowCommit] = useState(false);
  const [dataCommit, setDataCommit] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData, setSaveData ] = useState(false);
  
  const [showCommit2, setShowCommit2] = useState(false);
  const [dataCommit2, setDataCommit2] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData2, setSaveData2] = useState(false);
  
  const [showCommit3, setShowCommit3] = useState(false);
  const [dataCommit3, setDataCommit3] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData3, setSaveData3] = useState(false);
  
  const [showCommit4, setShowCommit4] = useState(false);
  const [dataCommit4, setDataCommit4] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData4, setSaveData4] = useState(false);
  
  const [showCommit5, setShowCommit5] = useState(false);
  const [dataCommit5, setDataCommit5] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData5, setSaveData5] = useState(false);
  
  const [showCommit6, setShowCommit6] = useState(false);
  const [dataCommit6, setDataCommit6] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData6, setSaveData6] = useState(false);
  
  const [showCommit7, setShowCommit7] = useState(false);
  const [dataCommit7, setDataCommit7] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData7, setSaveData7] = useState(false);
  
  const [showCommit8, setShowCommit8] = useState(false);
  const [dataCommit8, setDataCommit8] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData8, setSaveData8] = useState(false);
  
  const [showCommit9, setShowCommit9] = useState(false);
  const [dataCommit9, setDataCommit9] = useState({ dateCommit: '', name: "", description: "",  dateEnd: ""});
  const [ saveData9, setSaveData9] = useState(false);

  console.log(dataCommit);

  console.log(showCommit);

  

    return(
        <Container>
          <AddIncomeCommit showCommit={showCommit} setShowCommit={setShowCommit} setDataCommit={setDataCommit} dataCommit={dataCommit} 
            setSaveData={setSaveData}
          />
          <AddIncomeCommit2 showCommit2={showCommit2} setShowCommit2={setShowCommit2} setDataCommit2={setDataCommit2} dataCommit2={dataCommit2} 
            setSaveData2={setSaveData2}
          />
          <AddIncomeCommit3 showCommit3={showCommit3} setShowCommit3={setShowCommit3} setDataCommit3={setDataCommit3} dataCommit3={dataCommit3} 
            setSaveData3={setSaveData3}
          />
          <AddIncomeCommit4 showCommit4={showCommit4} setShowCommit4={setShowCommit4} setDataCommit4={setDataCommit4} dataCommit4={dataCommit4} 
            setSaveData4={setSaveData4}
          />
          <AddIncomeCommit5 showCommit5={showCommit5} setShowCommit5={setShowCommit5} setDataCommit5={setDataCommit5} dataCommit5={dataCommit5} 
            setSaveData5={setSaveData5}
          />
          <AddIncomeCommit6 showCommit6={showCommit6} setShowCommit6={setShowCommit6} setDataCommit6={setDataCommit6} dataCommit6={dataCommit6} 
            setSaveData6={setSaveData6}
          />
          <AddIncomeCommit7 showCommit7={showCommit7} setShowCommit7={setShowCommit7} setDataCommit7={setDataCommit7} dataCommit7={dataCommit7} 
            setSaveData7={setSaveData7}
          />
          <AddIncomeCommit8 showCommit8={showCommit8} setShowCommit8={setShowCommit8} setDataCommit8={setDataCommit8} dataCommit8={dataCommit8} 
            setSaveData8={setSaveData8}
          />
          <AddIncomeCommit9 showCommit9={showCommit9} setShowCommit9={setShowCommit9} setDataCommit9={setDataCommit9} dataCommit9={dataCommit9} 
            setSaveData9={setSaveData9}
          />
              <Row >
              <Col sm={2}> </Col>
                <Col sm={8} className="mt-2 mb-4" style={{backgroundColor: '#f1f1f1'}}> 
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

                  if(!valores.nombrePatologia){
                    errores.nombrePatologia = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombrePatologia)){
                    errores.nombrePatologia = 'Solo puedes escribir letras';
                  }
                  if(!valores.nombreMedFormulada){
                    errores.nombreMedFormulada = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreMedFormulada)){
                    errores.nombreMedFormulada = 'Ssolo puedes escribir letras';
                  }
                  if(!valores.eapb){
                    errores.eapb = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.eapb)){
                    errores.eapb = 'Solo puedes escribir letras';
                  }
                  if(!valores.ips){
                    errores.ips = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.ips)){
                    errores.ips = 'Solo puedes escribir letras';
                  }
                  if(!valores.causa){
                    errores.causa = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.causa)){
                    errores.causa = 'Solo puedes escribir letras';
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
                        
                    <Form.Group as={Row} className="mt-2" style={{ "marginLeft":"6px"}}>
                        <Form.Label column sm="3" >No. Seguimiento</Form.Label>
                          <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control
                            type="number" className="text-center" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={values.idSeguimiento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                          </InputGroup>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-1" style={{ "marginLeft":"35px"}}>
                       <Form.Label column sm="9" className="mt-3">Cuenta con afiliación al SGSSS</Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="afiliacionSgsss" >
                          <input type="checkbox" checked={showCommit || !saveData ? true : false } onChange={(e) => setShowCommit(!e.target.checked)}></input>
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
                        
                        <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                        <Form.Label column sm="9" className="mt-3" style={{"fontSize": "small"}}>Cuenta con valoración y controles en salud oral</Form.Label>
                        <Col  class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="saludOral">
                          <input type="checkbox" checked={showCommit2 || !saveData2 ? true : false } onChange={(e) => setShowCommit2(!e.target.checked)}></input>
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

                    <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                       <Form.Label column sm="9" style={{"fontSize": "12px !important"}}>Conoce la red de salud o a quien acudir en caso de urgencia</Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="conoceUrgencias">
                          <input type="checkbox" checked={showCommit3 || !saveData3 ? true : false } onChange={(e) => setShowCommit3(!e.target.checked)}></input>
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

                        <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                        <Form.Label column sm="9" >Identifican signos de alarmas de enfermedades prevalentes de la primera infancia (que ponen en peligro de muerte a niños y niñas)</Form.Label>
                        <Col class="mid" >
                        <InputGroup hasValidation className="mt-2">
                          <label class="rocker rocker-small" size="lg" name="alarmaPreventiva">
                          <input type="checkbox" checked={showCommit4 || !saveData4 ? true : false } onChange={(e) => setShowCommit4(!e.target.checked)}></input>
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

                    
                    <Form.Group as={Row}  style={{ "marginLeft":"35px"}}>
                       <Form.Label column sm="9" style={{"fontSize": "12px !important"}}>En niñas y menores de un mes se realizó validación médica</Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="valoracionMedica">
                          <input type="checkbox" checked={showCommit5 || !saveData5 ? true : false } onChange={(e) => setShowCommit5(!e.target.checked)}></input>
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

                        <Form.Group as={Row}  style={{ "marginLeft":"35px"}}>
                        <Form.Label column sm="9" style={{"fontSize": "12px !important"}}>Las niñas y niños cuentan con controles de Crecimiento y Desarrollo</Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="controlCyD">
                          <input type="checkbox" checked={showCommit6 || !saveData6 ? true : false } onChange={(e) => setShowCommit6(!e.target.checked)}></input>
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

                    <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                       <Form.Label column sm="9" style={{"fontSize": "12px !important"}}>Presenta una patología asociada identificada por el SGSSS</Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="patologiaIdentificadaSgsss">
                          <input type="checkbox" checked={showCommit7 || !saveData7 ? true : false } onChange={(e) => setShowCommit7(!e.target.checked)}></input>
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

                        <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                        <Form.Label column sm="9" style={{"fontSize": "12px !important"}}>Recibe medicamentos formulados por el SGSSS para alguna patología</Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="recibeMedFormulada">
                          <input type="checkbox" checked={showCommit8 || !saveData8 ? true : false } onChange={(e) => setShowCommit8(!e.target.checked)}></input>
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

                    <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>¿Cuál?</Form.Label>
                    <Col sm="9" class="mid">
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
                
                    <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>¿Cuál?</Form.Label>
                    <Col md="9" class="mid" >
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

                    <Form.Group as={Row} style={{ "marginLeft":"35px"}}>
                     <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>EAPB</Form.Label>
                     <Col md="4" class="mid" >
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

                        <Form.Label column sm="1" style={{"fontSize": "12px !important"}}>IPS</Form.Label>
                        <Col sm="4" >
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


                    <Form.Group as={Row}  style={{ "marginLeft":"35px"}}>
                       <Form.Label column sm="9" style={{"fontSize": "8px"}}> El usuario fue remitido a SGSSS </Form.Label>
                        <Col class="mid">
                        <InputGroup hasValidation>
                          <label class="rocker rocker-small" size="lg" name="usuarioRemitido">
                          <input type="checkbox" checked={showCommit9 || !saveData9 ? true : false } onChange={(e) => setShowCommit9(!e.target.checked)}></input>
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

                    <Form.Group as={Row} className="mb-3" style={{ "marginLeft":"35px"}}>
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>¿Por qué?</Form.Label>
                    <Col sm="9">
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
                <Col sm={2}> </Col>
            </Row>
        </Container>
    )

}