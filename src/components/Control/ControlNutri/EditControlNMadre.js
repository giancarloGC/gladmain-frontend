import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert } from "react-bootstrap";
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
import { labelsMadre, lineasGraphicsMadre } from "./LabelsAndLineasMadre";
import "./GraphicAddNutri.scss";
import moment from 'moment';
import { faAddressCard }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditControlNMadre(props){
    const { userControl, infoControl, rolUser } = props;
    const { user } = AuthContext();
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const documentoLogin = user.sub.split('-');
    const [ stateNutrition, setStateNutrition ] = useState({ color: "", text: "", animation: null});
    const [ imc, setImc ] = useState(0);
    const [ showButtonAdd, setShowButtonAdd ] = useState(false);
    const [ graphicValues, setGraphicValues] = useState({ x: 0, y: 0, r: 3});
    const [ goRedirect, setGoRedirect ] = useState(false);

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
      let imcC = imca;
      setImc(imcC.toFixed(2));
    }

    const calculateStateNutrition = (edadGestacional) => {
      //Mirar en que indice esta la edad gestacional dijitada para el eje x
      const indexToFind = (element) => element > edadGestacional -1;
      let indexEjex = labelsMadre.findIndex(indexToFind)
      
      //Recorrer cada linea para saber si el numero es mayor o menor a cada linea
      let valueXObesidad= lineasGraphicsMadre.Obesidad[indexEjex];
      let valueXSobrepeso = lineasGraphicsMadre.Sobrepeso[indexEjex];
      let valueXIMCAdecuado = lineasGraphicsMadre.IMCAdecuado[indexEjex];
      let valueXBajoPeso = lineasGraphicsMadre.BajoPeso[indexEjex];
      
      
      if(imc > valueXSobrepeso && imc <= valueXObesidad){
        setShowButtonAdd(false);
        setStateNutrition({ color: "danger", text: "Obesidad para la Edad Gestacional", animation: DangerAnimation});
      }else if(imc > valueXIMCAdecuado && imc <= valueXSobrepeso){
        setShowButtonAdd(false);
        setStateNutrition({ color: "danger", text: "Sobrepeso para la Edad Gestacional", animation: DangerAnimation});
      }else if(imc > valueXBajoPeso && imc <= valueXIMCAdecuado){
        setShowButtonAdd(false);
        setStateNutrition({ color: "success", text: "IMC adecuado para la Edad Gestacional", animation: SuccessAnimation});
      }else if(imc < valueXBajoPeso){
        setShowButtonAdd(true);
        setStateNutrition({ color: "danger", text: "Bajo peso para la Edad Gestacional", animation: DangerAnimation});
      }
    }

    const data = {
      labels: labelsMadre,
      datasets: [{
        label: 'Nuevo Control',
        type: "bubble",
        pointStyle: "bubble",
        data: [graphicValues],
        borderColor: '#0559B7',
        backgroundColor: '#0559B7',
      },
          {
            data: lineasGraphicsMadre.LineaAbajo,
            fill: true,
            borderColor: '#FA2E7F',
            tension: 0.1
        },
        {
            label: 'Bajo peso para la Edad Gestacional',
            data: lineasGraphicsMadre.BajoPeso,
            fill: true,
            borderColor: '#FA2E7F',
            backgroundColor: 'rgba(254, 17, 150 , 0.6)',
            tension: 0.1,
            borderDash: [10,5]
        },
        {
            label: 'IMC adecuado para la Edad Gestacional',
            data: lineasGraphicsMadre.IMCAdecuado,
            fill: true,
            borderColor: '#67C16B',
            backgroundColor: 'rgba(66, 214, 177, 0.3)',
            tension: 0.1,
            borderDash: [10,5]
        },
        {
            label: 'Sobrepeso para la Edad Gestacional',
            data: lineasGraphicsMadre.Sobrepeso,
            fill: true,
            borderColor: '#FBED32',
            backgroundColor: 'rgba(251, 237, 50, 0.3)',
            tension: 0.1,
            borderDash: [10,5]
        },
        {
            label: 'Obesidad para la Edad Gestacional',
            data: lineasGraphicsMadre.Obesidad,
            fill: true,
            borderColor: '#f28f35',
            backgroundColor: 'rgba(242, 143, 53, 0.5)',
            tension: 0.1,
            borderDash: [10,5]
        },
      ]
    };

    return(
        <Container>
            <Row>
              {goRedirect && (
                   <Redirect to={`/admin/statisticHomeMadre/${userControl.documento}/${rolUser}`} />
              )}
              <Formik
                initialValues={{ 
                    tension: infoControl.tension,
                    edadGestacional: infoControl.edadGestacional,
                    peso: infoControl.peso,
                    talla: infoControl.talla,
                    imc: '',
                    estadoNutricional: '',
                }}
                
                validate={(valores) => {
                  let errores = {};   
                  const dateCurrently2 = new Date();

                  if(!valores.tension){
                    errores.tension = 'No se permiten campos vacíos';
                  }else if(!/^([0-9-.])*$/.test(valores.tension)){
                    errores.tension = 'Tensión incorrecta, solo puedes escribir números';
                  }else if(valores.tension < 50 || valores.tension > 190 ){
                    errores.talla = 'La tensión debe ser mayor a 50 mmHg y menor a 190 mmHg';
                  }

                  if(!valores.peso){
                    errores.peso = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9-.])*$/.test(valores.peso)){
                    errores.peso = 'Solo puedes escribir números';
                  }else if(valores.peso < 1){
                      errores.peso = 'el peso debe ser debe ser mayor a 1 kg';
                    }else if(valores.peso > 130){
                      errores.peso = 'el peso debe ser menor ó igual a 130 kg';
                    }
                  

                  if(!valores.talla){
                    errores.talla = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9-.])*$/.test(valores.talla)){
                    errores.talla = 'Solo puedes escribir números';
                  }else if(valores.talla < 120){
                      errores.talla = 'La talla debe ser mayor a 120 cm';
                    }else if(valores.talla > 210){
                      errores.talla = 'La talla debe ser menor ó igual a 210 cm';
                    }
                
                    if(!valores.edadGestacional){
                      errores.edadGestacional = 'Por favor, ingresa solo números';
                    }else if(!/^([0-9])*$/.test(valores.edadGestacional)){
                      errores.talla = 'Solo puedes escribir números';
                    }else if(valores.edadGestacional < 10 || valores.edadGestacional > 42 ){
                        errores.talla = 'La edad gestacional debe ser mayor a 10 semanas y menos a 42 semanas';
                      }

                if(valores.edadGestacional >= 10 && valores.edadGestacional <= 42){
                    let tallaM = convertCmToM(valores.talla);
                    calculateIMC(valores.peso, tallaM);
                    calculateStateNutrition(valores.edadGestacional);
                    if(imc !== 0){
                        setGraphicValues({x: valores.edadGestacional, y: imc , r: 3});
                    }
                }else{
                    setImc(0);
                    setGraphicValues({x: 0, y: 0, r: 3});
                }

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  
                  var documertParse = parseInt( documentoLogin[0]);
                  const formData = {
                    id: infoControl.id,
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    fechaControl: infoControl.fechaControl,
                    peso: valores.peso,
                    talla: valores.talla,

                    imc: imc,
                    estadoNutricional: stateNutrition.text,

                    tension: valores.tension,
                    edadGestacional: valores.edadGestacional,
                    proximoControl: null,
                    ultimoControl: null,
                    vigente: false,
                    meses: userControl.edad
                }

                  console.log(formData);
                  formData.token = token;
                  updateControlApi(formData, token).then(response => {
                      if(response === true){
                        swal({
                          title: `¡El control fue actualizado correctamente!`,
                          icon: 'success'
                        }).then((value) => {
                          setGoRedirect(true);
                        });
                      }else{
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
                  <Col sm={3}></Col>
                  <Col sm={6}> 
                    <Form.Group as={Row} >
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Número documento</Form.Label>
                        <Col sm="8" className="mt-2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí el documento" size="lg" id="documento" name="documento" 
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
                               isValid={!errors.documento && touched.documento} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.documento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Nombre</Form.Label>
                        <Col sm="8">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="nombre" name="nombre" 
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
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="8" className="mt-2">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
                                 Value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                 isValid={!errors.fechaNacimiento && touched.fechaNacimiento} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Sexo</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                          <Form.Select size="lg" name="sexo" onChange={handleChange} onBlur={handleBlur}
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
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Edad</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la edad" size="lg" id="edad" name="edad" 
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

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha control</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaControl" name="fechaControl" 
                                 value={dateFormat(infoControl.fechaControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaControl && touched.fechaControl}
                                 isValid={!errors.fechaControl && touched.fechaControl} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaControl}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 
                        
                        <Row>
                          <Col md={6}>
                          <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Peso</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Peso en Kg" size="lg" id="peso" name="peso" 
                               defaultValue={infoControl.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                               isValid={!errors.peso && touched.peso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.peso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>
                          </Col>

                          <Col md={6}>
                          <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Talla</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Talla en cm" size="lg" id="talla" name="talla" 
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
                          </Col>
                          {rolUser === "MADRE_GESTANTE" && ( 
                              <Col md={12}>
                              <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Tensión (mmHg)</Form.Label>
                              <Col sm="8">
                                  <InputGroup hasValidation>
                                  <Form.Control type="number" placeholder="Dígita aquí la tensión" size="lg" id="tension" name="tension" 
                                     defaultValue={infoControl.tension} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.tension && touched.tension}
                                     isValid={!errors.tension && touched.tension} 
                                  />
                                  <Form.Control.Feedback type="invalid">
                                      {errors.tension}
                                  </Form.Control.Feedback>
                                  <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                              </InputGroup>
                              </Col>
                              
                              <Form.Label column sm="4" className="mt-3" style={{"font-size": "12px !important"}}>Edad Gestacional</Form.Label>
                              <Col sm="8" className="mt-3">
                                  <InputGroup hasValidation>
                                  <Form.Control type="number" placeholder="Edad Gestacional en semanas" size="lg" id="edadGestacional" name="edadGestacional" 
                                     defaultValue={infoControl.edadGestacional} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edadGestacional && touched.edadGestacional}
                                     isValid={!errors.edadGestacional && touched.edadGestacional} 
                                  />
                                  <Form.Control.Feedback type="invalid">
                                      {errors.edadGestacional}
                                  </Form.Control.Feedback>
                                  <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                              </InputGroup>
                              </Col>
                              </Form.Group>
                              </Col>
                            )} 

                        </Row>


                  </Col>
                  <Col sm={3}></Col>
                </Row>

                {imc !== 0 && (
                <Row className="mt-3">
                 <Col md={8}>
                  <center>
                  <Form.Label column sm="12" style={{"font-size": "12px !important" }}>Estado Nutricional Madre Gestante</Form.Label>
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
                                min: 10,
                                max: 42
                            }
                            }
                        }}
                        />
                      </div>
                        <p className="ejex">Semanas de Gestación</p>
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
                            <Button variant="primary" type="submit" size="lg">
                                Actualizar control   <FontAwesomeIcon data-tip data-for="boton1" icon={faAddressCard} size="lg" color="#FFF" />
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