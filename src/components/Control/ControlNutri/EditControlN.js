import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import DangerAnimation from "../../../assets/animations/control/warning2.json";
import WarningAnimation from "../../../assets/animations/control/warning.json";
import SuccessAnimation from "../../../assets/animations/control/successNew.json";
import swal from 'sweetalert';
import Lottie from 'react-lottie';
import { Line } from "react-chartjs-2";
import { updateControlApi } from "../../../api/controls";
import { labels, lineasGraphics } from "./LabelsAndLineas";
import { labels2_5, lineasGraphics2_5 } from "./LabelsAndLineas2-5";
import "./GraphicAddNutri.scss";
import moment from 'moment';
import { faAddressCard }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditControlN(props){
    const { userControl, infoControl, rolUser } = props;
    const { user } = AuthContext();
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const documentoLogin = user.sub.split('-');
    const [ stateNutrition, setStateNutrition ] = useState({ color: "", text: "", animation: null});
    const [ imc, setImc ] = useState(0);
    const [ showButtonAdd, setShowButtonAdd ] = useState(false);
    const [ graphicValues, setGraphicValues] = useState({ r: 3, x: 0, y: 0 });
    const [ goRedirect, setGoRedirect ] = useState(false);
    const [ showSpinner, setShowSpinner ] = useState(false);

    let dateFechaNaci = moment(userControl.fechaNacimiento);
    let dateCurrent = moment();
    userControl.edad = dateCurrent.diff(dateFechaNaci, 'months');
 
    const dateFormat = (date) => {
      if(date){
      let dateFormated = date.split('T');
      return dateFormated[0];
      }
    }

    const convertKgToG = (kg) => {
      let resultado = kg * 1000;
      return resultado;
    }

    const convertCmToM = (cm) => {
      let resultado = cm / 100;
      return resultado;
    }

    const calculateIMC = (kg, metros) => {
      const imca = kg / (metros * metros);
      let imcC = imca.toFixed(2);
      setImc(imcC);
    }

    const calculateStateNutrition = (talla, peso) => {
      //Mirar en que indice esta la talla dijitada para el eje x

      // de 0 A 2 AÑOS
      const indexToFind = (element) => element > talla -1;
      let indexEjex = userControl.edad >= 0 && userControl.edad <= 24 ? labels.findIndex(indexToFind) : labels2_5.findIndex(indexToFind)
      
      //Recorrer cada linea para saber si el numero es mayor o menor a cada linea
      // de 0 A 2 AÑOS
      //Recorrer cada linea para saber si el numero es mayor o menor a cada linea
      let valueXlineMasTres = userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMasTres[indexEjex] : lineasGraphics2_5.lineMasTres[indexEjex];
      let valueXlineMasDos = userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMasDos[indexEjex] : lineasGraphics2_5.lineMasDos[indexEjex];
      let valueXlineMasUno = userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMasUno[indexEjex] : lineasGraphics2_5.lineMasUno[indexEjex];
      let valueXlineMenosUno = userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMenosUno[indexEjex] : lineasGraphics2_5.lineMenosUno[indexEjex];
      let valueXlineMenosDos = userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMenosDos[indexEjex] : lineasGraphics2_5.lineMenosDos[indexEjex];
      let valueXLineMenosTres = userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMenosTres[indexEjex] : lineasGraphics2_5.lineMenosTres[indexEjex];

      
      //Validaciones grafica Peso para la Talla

      if(peso > valueXlineMasTres){
        setShowButtonAdd(false);
        setStateNutrition({ color: "danger", text: "Obesidad", animation: DangerAnimation});
      }else if(peso > valueXlineMasDos && peso <= valueXlineMasTres){
        setShowButtonAdd(false);
        setStateNutrition({ color: "danger", text: "Sobrepeso", animation: DangerAnimation});
      }else if(peso > valueXlineMasUno && peso <= valueXlineMasDos){
        setShowButtonAdd(false);
        setStateNutrition({ color: "warning", text: "Riesgo de Sobrepeso", animation: WarningAnimation});
      }else if(peso >= valueXlineMenosUno && peso <= valueXlineMasUno){
        setShowButtonAdd(false);
        setStateNutrition({ color: "success", text: "Peso Adecuado para la Talla", animation: SuccessAnimation});
      }else if(peso >= valueXlineMenosDos && peso < valueXlineMenosUno){
        setShowButtonAdd(true);
        setStateNutrition({ color: "warning", text: "Riesgo de Desnutrición Aguda", animation: WarningAnimation});
      }else if(peso < valueXlineMenosDos && peso >= valueXLineMenosTres){
        setShowButtonAdd(true);
        setStateNutrition({ color: "danger", text: "Desnutrición Aguda Moderada", animation: DangerAnimation});
      }else if(peso < valueXLineMenosTres){
        setShowButtonAdd(true);
        setStateNutrition({ color: "danger", text: "Desnutrición Aguda Severa", animation: DangerAnimation});
      }
    }

    const data = {
      labels: userControl.edad >= 0 && userControl.edad <= 24 ? labels : labels2_5,
      datasets: [{
        label: 'Nuevo Control',
        type: "bubble",
        pointStyle: "bubble",
        data: [graphicValues],
        borderColor: userControl.sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
        backgroundColor: userControl.sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',       
      },
        {
          label: '- 3',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMenosTres : lineasGraphics2_5.lineMenosTres,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1,
        },
        {
          label: '- 2',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMenosDos : lineasGraphics2_5.lineMenosDos,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '- 1',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMenosUno : lineasGraphics2_5.lineMenosUno,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
          tension: 0.1
        },
        {
          label: '0',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineCero : lineasGraphics2_5.lineCero,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#127D30' : '#127D30',
          tension: 0.1
        },
        {
          label: '+ 1',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMasUno : lineasGraphics2_5.lineMasUno,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
          tension: 0.1
        },
        {
          label: '+ 2',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMasDos : lineasGraphics2_5.lineMasDos,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '+ 3',
          data: userControl.edad >= 0 && userControl.edad <= 24 ? lineasGraphics.lineMasTres : lineasGraphics2_5.lineMasTres,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1
        },
      ]
    };

    return(
        <Container>
            <Row>
              {goRedirect && (
                   <Redirect to={`/admin/graphics/${userControl.edad}/${userControl.sexo}/${userControl.documento}/${rolUser}`} />
              )}
              <Formik
                initialValues={{ 
                    peso: infoControl.peso,
                    talla: infoControl.talla,
                    imc: '',
                    estadoNutricional: '',
                }}
                
                validate={(valores) => {
                  let errores = {};   
                  const dateCurrently2 = new Date();

                  if(!valores.peso){
                    errores.peso = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9-.])*$/.test(valores.peso)){
                    errores.peso = 'Solo puedes escribir números';
                  }else if(userControl.edad >= 0 && userControl.edad <= 24){
                    if(valores.peso < 1){
                      errores.peso = 'el peso debe ser debe ser mayor a 1 kg';
                    }else if(valores.peso > 26){
                      errores.peso = 'el peso debe ser menor ó igual a 26 kg';
                    }
                  }else{
                    if(valores.peso < 5){
                      errores.peso = 'el peso debe ser debe ser mayor a 5 kg';
                    }else if(valores.peso > 32){
                      errores.peso = 'el peso debe ser menor ó igual a 32 kg';
                    }
                  }

                  if(!valores.talla){
                    errores.talla = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9-.])*$/.test(valores.talla)){
                    errores.talla = 'Solo puedes escribir números';
                  }else if(userControl.edad >= 0 && userControl.edad <= 24){
                    if(valores.talla < 45){
                      errores.talla = 'La talla debe ser mayor a 45 cm';
                    }else if(valores.talla > 110){
                      errores.talla = 'La talla debe ser menor ó igual a 110 cm';
                    }
                  }else{
                    if(valores.talla < 65){
                      errores.talla = 'La talla debe ser mayor a 65 cm';
                    }else if(valores.talla > 120){
                      errores.talla = 'La talla debe ser menor ó igual a 120 cm';
                    }
                  }

                  if(userControl.edad >= 0 && userControl.edad <= 24){
                    if(valores.peso && valores.talla >= 45 && valores.talla <= 110){
                      let tallaM = convertCmToM(valores.talla);
                      calculateIMC(valores.peso, tallaM);
                      calculateStateNutrition(valores.talla, valores.peso);
                      setGraphicValues({ r: 3, x: valores.talla, y: valores.peso });
                    }else{
                      setImc(0);
                      setGraphicValues({ r: 3, x: 0, y: 0 });
                    }
                  }else{
                    if(valores.peso && valores.talla >= 65 && valores.talla <= 120){
                      let tallaM = convertCmToM(valores.talla);
                      calculateIMC(valores.peso, tallaM);
                      calculateStateNutrition(valores.talla, valores.peso);
                      setGraphicValues({ r: 3, x: valores.talla, y: valores.peso });
                    }else{
                      setImc(0);
                      setGraphicValues({r: 3, x: 0, y: 0 });
                    }
                  }
                  
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  
                  var documertParse = parseInt( documentoLogin[0]);
                  const formData = {
                    id: infoControl.id,
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    fechaControl: moment().format("YYYY-MM-DD"),
                    peso: valores.peso,
                    talla: valores.talla,

                    imc: imc,
                    estadoNutricional: stateNutrition.text,

                    tension: null,
                    edadGestacional: null,
                    proximoControl: null,
                    ultimoControl: null,
                    vigente: false,
                    meses: userControl.edad
                }

                  console.log(formData);

                  formData.token = token;
                  setShowSpinner(true);
                  updateControlApi(formData).then(response => {
                    setShowSpinner(false);
                      if(response === true){
                        setShowSpinner(false);
                        swal({
                          title: `¡El control fue almacenado correctamente!`,
                          icon: 'success'
                        }).then((value) => {
                          setGoRedirect(true);
                        });
                      }else{
                        setShowSpinner(false);
                        swal({
                          title: `¡Opss, ocurrió un error!`,
                          icon: 'danger'
                        }).then((value) => {
                          setGoRedirect(true);
                        });
                      }
                });
                setTimeout(() => {
                  setShow(false);
                }, 5000);
              }}
            >
                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>
                      {show && (
                        <Alert variant={textFormSend.variant} onClose={() => setShow(false)} dismissible className="mt-5">
                            <Alert.Heading>{textFormSend.heading}</Alert.Heading>
                            <p style={{"color": textFormSend.variant === "success" ? "#2DA45C" : "#A42D55", "fontSize": 18}}>
                            {textFormSend.message}
                            </p>
                        </Alert>
                    )}
                <Row>
                  <Col sm={1}></Col>
                  <Col sm={10}> 
                  
                  <Form.Group as={Row} className="mt-4">
                  <Form.Label column sm="3"><h1 style={{fontSize: "20px", color:"#0084d2" }}>Fecha control</h1></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaControl" name="fechaControl" 
                                 value={moment().format("YYYY-MM-DD")} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaControl && touched.fechaControl}
                                 isValid={!errors.fechaControl && touched.fechaControl} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaControl}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 
                    
                    <Container style={{border:'2px solid #eee', borderRadius:'5px'}}>                  
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"><h5 style={{fontSize: "16px"}} className="mt-1">Número documento</h5></Form.Label>
                        <Col sm="3">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí el documento" size="xs" id="documento" name="documento" 
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
                               isValid={!errors.documento && touched.documento} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.documento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="2"> <h5 style={{fontSize: "16px"}} className="mt-1"> Nombre </h5></Form.Label>
                        <Col sm="4">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                               isValid={!errors.nombre && touched.nombre} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm="3">
                        <h5 style={{fontSize: "16px"}}>Fecha Nacimiento</h5></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaNacimiento" name="fechaNacimiento" 
                                 Value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                 isValid={!errors.fechaNacimiento && touched.fechaNacimiento} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2"><h5 style={{fontSize: "16px"}}>Edad</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la edad" size="xs" id="edad" name="edad" 
                               value={`${userControl.edad} meses`} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                               isValid={!errors.edad && touched.edad} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>
                       
                        <Form.Group as={Row} className="mb-3 mt-4">
                        <Form.Label column sm="1"><h5 style={{fontSize: "16px"}}>Sexo</h5></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                          <Form.Select size="xs" name="sexo" onChange={handleChange} onBlur={handleBlur}
                                value={userControl.sexo} isValid={!errors.sexo && touched.sexo} isInvalid={!!errors.sexo && touched.sexo} disabled
                              >
                              <option disabled>Selecciona el sexo</option>
                              <option value="FEMENINO">FEMENINO</option>
                              <option value="MASCULINO">MASCULINO</option>

                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                          {errors.sexo}
                                          </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                          </Col>

                        <Form.Label column sm="1"><h5 style={{fontSize: "16px"}}>Peso</h5></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Peso en Kg" size="xs" id="peso" name="peso" 
                               defaultValue={infoControl.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                               isValid={!errors.peso && touched.peso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.peso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="1"><h5 style={{fontSize: "16px"}}>Talla</h5></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Talla en cm" size="xs" id="talla" name="talla" 
                               defaultValue={infoControl.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
                              isValid={!errors.talla && touched.talla}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.talla}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>
                    </Container>

                  </Col>
                  <Col sm={1}></Col>

                  
                </Row>

                {imc !== 0 && (
                <Row className="mt-3">
                 <Col md={8}>
                  <center>
                  <Form.Label column sm="12" style={{"font-size": "12px !important" }}>Puntuación Z ({userControl.edad >= 0 && userControl.edad <= 24 ? "0 a 2 años" : "2 a 5 años"})</Form.Label>
                  </center>
                      <div >
                        <Line 
                            data={data}
                            height={350}
                            width={600}
                            options={{
                              pointStyle: "line",
                              responsive: true,
                              scales: {
                                x: {
                                  type: 'linear',
                                  position: 'bottom',
                                  min: userControl.edad >= 0 && userControl.edad <= 24 ? 45 : 65 //45 = 0-2 años    65 = 2-5 años
                                }
                              }
                            }}
                        />
                      </div>
                      {userControl.edad > 24 ? (
                        <p className="ejex">Talla(cm)</p>
                      )
                      :(
                        <p className="ejex">Longitud(cm)</p>
                      )}
                        </Col>
                      
                  <Col md={4} className="mt-5">
                            <Form.Group as={Row}>
                                <Alert variant="secondary">
                                  <Alert.Heading className="text-center">IMC Calculado: {imc}</Alert.Heading>
                                </Alert>
                            </Form.Group> 

                            <Form.Group as={Row}>
                            <Alert variant={stateNutrition.color}>
                              <Alert.Heading className="text-center">Estado nutricional: {stateNutrition.text} </Alert.Heading>
                              <Lottie height={80} width={80}
                                  options={{ loop: true, autoplay: true, animationData: stateNutrition.animation, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                              />
                            </Alert>
                            </Form.Group> 

                            <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                              {showSpinner ? (
                                <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                                {"  " + `  Cargando...`}  
                                </>
                                ):(
                                "Actualizar control " 
                            )}
                           </Button>
                        </div>
                  </Col>
                </Row>
              )}
                    </Form>
                            );
                        }}
                      </Formik> 
            </Row>
        </Container>
    )
}