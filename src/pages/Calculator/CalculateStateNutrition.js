import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import DangerAnimation from "../../assets/animations/control/warning2.json";
import WarningAnimation from "../../assets/animations/control/warning.json";
import SuccessAnimation from "../../assets/animations/control/successNew.json";

import Lottie from 'react-lottie';
import { Line } from "react-chartjs-2";
import { labels, lineasGraphics } from "./../../components/Control/ControlNutri/LabelsAndLineas";
import { labels2_5, lineasGraphics2_5 } from "./../../components/Control/ControlNutri/LabelsAndLineas2-5";
import "./../../components/Control/ControlNutri/GraphicAddNutri.scss";

export default function CalculateStateNutrition(){
    const [show, setShow] = useState(false);
    const { edad, sexo } = useParams();

    const [ textFormSend, setTextFormSend ] = useState({});
    const [ stateNutrition, setStateNutrition ] = useState({ color: "", text: "", animation: null});
    const [ imc, setImc ] = useState(0);
    const [ showButtonAdd, setShowButtonAdd ] = useState(false);
    const [ graphicValues, setGraphicValues] = useState({ x: 0, y: 0, r: 10});

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
      let imcC = parseInt(imca);
      setImc(imcC);
    }

    const calculateStateNutrition = (talla, peso) => {
      //Mirar en que indice esta la talla dijitada para el eje x
      const indexToFind = (element) => element > talla -1;
      let indexEjex = edad > 0 && edad <= 24 ? labels.findIndex(indexToFind) : labels2_5.findIndex(indexToFind);

      //Recorrer cada linea para saber si el numero es mayor o menor a cada linea
      let valueXlineMasTres = edad > 0 && edad <= 24 ? lineasGraphics.lineMasTres[indexEjex] : lineasGraphics2_5.lineMasTres[indexEjex];
      let valueXlineMasDos = edad > 0 && edad <= 24 ? lineasGraphics.lineMasDos[indexEjex] : lineasGraphics2_5.lineMasDos[indexEjex];
      let valueXlineMasUno = edad > 0 && edad <= 24 ? lineasGraphics.lineMasUno[indexEjex] : lineasGraphics2_5.lineMasUno[indexEjex];
      let valueXlineMenosUno = edad > 0 && edad <= 24 ? lineasGraphics.lineMenosUno[indexEjex] : lineasGraphics2_5.lineMenosUno[indexEjex];
      let valueXlineMenosDos = edad > 0 && edad <= 24 ? lineasGraphics.lineMenosDos[indexEjex] : lineasGraphics2_5.lineMenosDos[indexEjex];
      let valueXLineMenosTres = edad > 0 && edad <= 24 ? lineasGraphics.lineMenosTres[indexEjex] : lineasGraphics2_5.lineMenosTres[indexEjex];



      if(peso > valueXlineMasTres){
        setShowButtonAdd(false);
        setStateNutrition({ color: "danger", text: "Obesidad", animation: DangerAnimation});
        console.log("es mayor a +3   ");
      }else if(peso > valueXlineMasDos && peso <= valueXlineMasTres){
        setShowButtonAdd(false);
        setStateNutrition({ color: "danger", text: "Sobrepeso", animation: DangerAnimation});
        console.log("es > a la +2 y < a +3 ");
      }else if(peso > valueXlineMasUno && peso <= valueXlineMasDos){
        console.log("es > a la +1 y < a +2 ");
        setShowButtonAdd(false);
        setStateNutrition({ color: "warning", text: "Riesgo de Sobrepeso", animation: WarningAnimation});
      }else if(peso >= valueXlineMenosUno && peso <= valueXlineMasUno){
        setShowButtonAdd(false);
        console.log("es > a la -1 y < a +1 ");
        setStateNutrition({ color: "success", text: "Peso Adecuado para la Talla", animation: SuccessAnimation});
      }else if(peso >= valueXlineMenosDos && peso < valueXlineMenosUno){
        setShowButtonAdd(true);
        console.log("es > a la -2 y < a -1 ");
        setStateNutrition({ color: "warning", text: "Riesgo de Desnutrición Aguda", animation: WarningAnimation});
      }else if(peso < valueXlineMenosDos && peso >= valueXLineMenosTres){
        setShowButtonAdd(true);
        console.log("es < 2 y > a la -3 ");
        setStateNutrition({ color: "danger", text: "Desnutrición Aguda Moderada", animation: DangerAnimation});
      }else if(peso < valueXLineMenosTres){
        setShowButtonAdd(true);
        console.log("es < a la -3 ");
        setStateNutrition({ color: "danger", text: "Desnutrición Aguda Severa", animation: DangerAnimation});
      }
    }

    const data = {
      labels: edad > 0 && edad <= 24 ? labels : labels2_5,
      datasets: [{
          label: '- 3',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineMenosTres : lineasGraphics2_5.lineMenosTres,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1,
        },
        {
          label: '- 2',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineMenosDos : lineasGraphics2_5.lineMenosDos,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '- 1',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineMenosUno : lineasGraphics2_5.lineMenosUno,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
          tension: 0.1
        },
        {
          label: '0',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineCero : lineasGraphics2_5.lineCero,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
          tension: 0.1
        },
        {
          label: '+ 1',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineMasUno : lineasGraphics2_5.lineMasUno,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
          tension: 0.1
        },
        {
          label: '+ 2',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineMasDos : lineasGraphics2_5.lineMasDos,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '+ 3',
          data: edad > 0 && edad <= 24 ? lineasGraphics.lineMasTres : lineasGraphics2_5.lineMasTres,
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
          tension: 0.1
        },
        {
          label: 'Nuevo Control',
          data: [graphicValues],
          borderColor: sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
          backgroundColor: sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
          type: "bubble",
          pointStyle: "bubble",        
        },
      ]
    };


    return(
        <Container>
            <h1 className="text-center">Calcular estado nutricional <FontAwesomeIcon data-tip data-for="boton1" icon={faCalculator} size="lg" color="#2D61A4" /> </h1>
            <Row>

              <Formik
                initialValues={{ 
                    peso: '',
                    talla: '',
                    imc: '',
                    estadoNutricional: '',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  /*if(!valores.documento){
                    errores.documento = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.documento)){
                    errores.documento = 'Documento incorrecto, solo puedes escribir números';
                  }
                  let docuemnt = toString(valores.documento);
                  if(docuemnt.length <= 0 || docuemnt.length > 15){
                    errores.documento = 'Documento invalido, intente con otro';
                  }      

                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  const dateCurrently = new Date();
                  if(!valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently <= valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Seleccione una fecha valida';
                  }
                  if(!valores.sexo){
                    errores.sexo = 'Asegurese de selecionar una opción';
                  }   

                  if(!valores.edad){
                    errores.edad = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.edad)){
                    errores.edad = 'Edad incorrecta, solo puedes escribir números enteros';
                  }else if(valores.edad < 0 && valores.edad > 72){
                    errores.edad = 'Edad invalida, solo edad entre 0 y 72 meses';
                  } */ 

                  const dateCurrently2 = new Date();
                  
                  if(!valores.peso){
                    errores.peso = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9-.])*$/.test(valores.peso)){
                    errores.peso = 'Solo puedes escribir números';
                  }else if(edad > 0 && edad <= 24){
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
                  }else if(edad > 0 && edad <= 24){
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

                  if(edad > 0 && edad <= 24){
                    if(valores.peso && valores.talla >= 45 && valores.talla <= 110){
                      let tallaM = convertCmToM(valores.talla);
                      calculateIMC(valores.peso, tallaM);
                      calculateStateNutrition(valores.talla, valores.peso);
                      setGraphicValues({x: valores.talla, y: valores.peso , r: 3});
                    }else{
                      setImc(0);
                      setGraphicValues({x: 0, y: 0, r: 3});
                    }
                  }else{
                    if(valores.peso && valores.talla >= 65 && valores.talla <= 120){
                      let tallaM = convertCmToM(valores.talla);
                      calculateIMC(valores.peso, tallaM);
                      calculateStateNutrition(valores.talla, valores.peso);
                      setGraphicValues({x: valores.talla, y: valores.peso , r: 3});
                    }else{
                      setImc(0);
                      setGraphicValues({x: 0, y: 0, r: 3});
                    }
                  }
                  /*if(!valores.imc){
                    errores.imc = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9])*$/.test(valores.imc)){
                    errores.imc = 'Solo puedes escribir números';
                  }
                  if(!valores.estadoNutricional){
                    errores.estadoNutricional = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.estadoNutricional)){
                    errores.estadoNutricional = 'Solo puedes escribir letras';
                  }*/
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  var tension = null;
                  var edadGestacional = null;
                  /*if(parametro === "mamita"){
                    tension = valores.tension;
                    edadGestacional = valores.edadGestacional;
                  }*/

                  //var documertParse = parseInt( documentoLogin[0]);
                  /*const formData = {
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    fechaControl: valores.fechaControl,
                    peso: valores.peso,
                    talla: valores.talla,

                    imc: 54,
                    estadoNutricional: "tagoldo",

                    tension: null,
                    edadGestacional: null,
                    proximoControl: null,
                    ultimoControl: null,
                    vigente: false,
                    meses: userControl.edad
                }

                  console.log(formData);
                  valores.token = token;
                  insertControlApi(formData, token).then(response => {
                      if(response === true){
                          setTextFormSend({
                            variant: "success", heading: "¡Excelente, registro exitoso!",
                            message: `El control ${valores.name} fue almacenado correctamente`
                          });
                          setShow(true);
                      }else{
                          setTextFormSend({
                              variant: "danger", heading: "¡Opss, ocurrió un error!",
                              message: "Revisaremos lo ocurrido, inténtalo nuevamente"
                          });
                          setShow(true);
                      }
                });*/
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

                        <Row>
                          <Col md={6}>
                          <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Peso</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Peso en Kg" size="lg" id="peso" name="peso" 
                               value={values.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
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
                              <Form.Control type="number" placeholder="Talla en cm" size="lg" id="talla" name="talla" 
                               value={values.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
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
                        </Row>

                  </Col>
                  <Col sm={3}></Col>

                  
                </Row>

                {imc !== 0 && (
                <Row className="mt-3">
                  <Col md={8}>
                  <center>
             <Form.Label column sm="12" style={{"font-size": "12px !important" }}>Puntuación Z ({edad > 0 && edad <= 24 ? "0 a 2 años" : "2 a 5 años"})</Form.Label>
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
                            min: edad > 0 && edad <= 24 ? 45 : 65 //45 = 0-2 años    65 = 2-5 años
                          }
                        }
                      }}
                  />
                </div>
                  {edad > 24 ? (
                    <p className="ejex">Talla(cm)</p>
                  )
                  :(
                    <p className="ejex">Longitud(cm)</p>
                  )}
                  </Col>

                  <Col md={4} className="mt-5">
                  {showButtonAdd && (
                  <div className="d-grid gap-2">
                            <Button variant="warning" type="submit" size="lg" className="text-white mb-3">
                              <Link to="/admin/addUser">
                                Añadir nuevo usuario <FontAwesomeIcon data-tip data-for="boton1" icon={faUserPlus} size="lg" color="#FFF" /> 
                              </Link>
                            </Button>
                        </div>
                  )}
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