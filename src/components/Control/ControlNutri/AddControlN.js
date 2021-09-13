import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import swal from 'sweetalert';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import DangerAnimation from "../../../assets/animations/control/warning2.json";
import WarningAnimation from "../../../assets/animations/control/warning.json";
import SuccessAnimation from "../../../assets/animations/control/successNew.json";

import Lottie from 'react-lottie';
import { Line } from "react-chartjs-2";
import { insertControlApi } from "../../../api/controls";
import { labels, lineasGraphics } from "./LabelsAndLineas";
import "./GraphicAddNutri.scss";
import moment from 'moment';
import { faAddressCard }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddControlN(props){
    const { userControl } = props;
    const { user } = AuthContext();
    const token = localStorage.getItem(TOKEN);
    const [ userApi, setUserByIdApi ] = useState({});
    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const documentoLogin = user.sub.split('-');
    const [ stateNutrition, setStateNutrition ] = useState({ color: "", text: "", animation: null});
    const [ imc, setImc ] = useState(0);
    const [ graphicValues, setGraphicValues] = useState({ x: 0, y: 0, r: 10});
    const rolUser = "madre";
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
      let imcC = parseInt(imca);
      setImc(imcC);
    }

    const calculateStateNutrition = (talla, peso) => {
      //Mirar en que indice esta la talla dijitada para el eje x
      const indexToFind = (element) => element > talla -1;
      let indexEjex = labels.findIndex(indexToFind);

      //Recorrer cada linea para saber si el numero es mayor o menor a cada linea
      let valueXlineMasTres = lineasGraphics.lineMasTres[indexEjex];
      let valueXlineMasDos = lineasGraphics.lineMasDos[indexEjex];
      let valueXlineMasUno = lineasGraphics.lineMasUno[indexEjex];
      let valueXlineMenosUno = lineasGraphics.lineMenosUno[indexEjex];
      let valueXlineMenosDos = lineasGraphics.lineMenosDos[indexEjex];
      let valueXLineMenosTres = lineasGraphics.lineMenosTres[indexEjex];



      if(peso > valueXlineMasTres){
        setStateNutrition({ color: "danger", text: "Obesidad", animation: DangerAnimation});
        console.log("es mayor a +3   ");
      }else if(peso > valueXlineMasDos && peso <= valueXlineMasTres){
        setStateNutrition({ color: "danger", text: "Sobrepeso", animation: DangerAnimation});
        console.log("es > a la +2 y < a +3 ");
      }else if(peso > valueXlineMasUno && peso <= valueXlineMasDos){
        console.log("es > a la +1 y < a +2 ");
        setStateNutrition({ color: "warning", text: "Riesgo de Sobrepeso", animation: WarningAnimation});
      }else if(peso >= valueXlineMenosUno && peso <= valueXlineMasUno){
        console.log("es > a la -1 y < a +1 ");
        setStateNutrition({ color: "success", text: "Peso Adecuado para la Talla", animation: SuccessAnimation});
      }else if(peso >= valueXlineMenosDos && peso < valueXlineMenosUno){
        console.log("es > a la -2 y < a -1 ");
        setStateNutrition({ color: "warning", text: "Riesgo de Desnutrición Aguda", animation: WarningAnimation});
      }else if(peso < valueXlineMenosDos && peso >= valueXLineMenosTres){
        console.log("es < 2 y > a la -3 ");
        setStateNutrition({ color: "danger", text: "Desnutrición Aguda Moderada", animation: DangerAnimation});
      }else if(peso < valueXLineMenosTres){
        console.log("es < a la -3 ");
        setStateNutrition({ color: "danger", text: "Desnutrición Aguda Severa", animation: DangerAnimation});
      }
    }

    const data = {
 
      labels: labels,
      datasets: [{
          label: '- 3',
          data: lineasGraphics.lineMenosTres,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1,
        },
        {
          label: '- 2',
          data: lineasGraphics.lineMenosDos,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '- 1',
          data: lineasGraphics.lineMenosUno,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
          tension: 0.1
        },
        {
          label: '0',
          data: lineasGraphics.lineCero,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
          tension: 0.1
        },
        {
          label: '+ 1',
          data: lineasGraphics.lineMasUno,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
          tension: 0.1
        },
        {
          label: '+ 2',
          data: lineasGraphics.lineMasDos,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '+ 3',
          data: lineasGraphics.lineMasTres,
          fill: false,
          borderColor: userControl.sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1
        },
        {
          label: 'Nuevo Control',
          data: [graphicValues],
          borderColor: userControl.sexo !== "FEMENINO" ? '#4884FC' : '#A80B42',
          backgroundColor: userControl.sexo !== "FEMENINO" ? '#5746D4' : 'rgba(212, 70, 130, 0.52)',//#D44682',
          type: "bubble",
          pointStyle: "bubble",        
        },
      ]
    };


    return(
        <Container>
            <Row>
              {goRedirect && (
                   <Redirect to={`/admin/graphics/${userControl.edad}/${userControl.sexo}/${userControl.documento}`} />
              )}
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
                    errores.edad = 'Edad incorrecta, solo puedes escribir números';
                  }else if(valores.edad <= 0 || valores.edad > 90){
                    errores.edad = 'Edad invalida, intente con otra';
                  }*/      
                  const dateCurrently2 = new Date();
                  /*if(!valores.fechaControl){
                    errores.fechaControl = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaControl){
                    errores.fechaControl = 'Seleccione una fecha valida';
                  }*/
                  if(!valores.peso){
                    errores.peso = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9-.])*$/.test(valores.peso)){
                    errores.peso = 'Solo puedes escribir números';
                  }
                  if(!valores.talla){
                    errores.talla = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9])*$/.test(valores.talla)){
                    errores.talla = 'Solo puedes escribir números';
                  }else if(valores.talla < 45){
                    errores.talla = 'La talla debe ser mayor a 45 cm';
                  }else if(valores.talla > 110){
                    errores.talla = 'La talla debe ser menor ó igual a 110 cm';
                  }

                  if(valores.peso && valores.talla >= 45 && valores.talla <= 110){
                    let tallaM = convertCmToM(valores.talla);
                    calculateIMC(valores.peso, tallaM);
                    calculateStateNutrition(valores.talla, valores.peso);
                    setGraphicValues({x: valores.talla, y: valores.peso , r: 15});
                  }else{
                    setImc(0);
                    setGraphicValues({x: 0, y: 0, r: 15});
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

                  var documertParse = parseInt( documentoLogin[0]);
                  const formData = {
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
                  insertControlApi(formData, token, true).then(response => {
                      if(response === true){
                        swal({
                          title: `¡El control fue almacenado correctamente!`,
                          icon: 'success'
                        }).then((value) => {
                          setGoRedirect(true);
                        });
                          /*setTextFormSend({
                            variant: "success", heading: "¡Excelente, registro exitoso!",
                            message: `El control ${valores.name} fue almacenado correctamente`
                          });
                          setShow(true);*/
                      }else{
                        swal({
                          title: `¡Opss, ocurrió un error!`,
                          icon: 'danger'
                        }).then((value) => {
                          setGoRedirect(true);
                        });
                          /*setTextFormSend({
                              variant: "danger", heading: "¡Opss, ocurrió un error!",
                              message: "Revisaremos lo ocurrido, inténtalo nuevamente"
                          });
                          setShow(true);*/
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
                    <Form.Group as={Row} className="mb-3">

                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Número documento</Form.Label>
                        <Col sm="8">
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

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Nombre</Form.Label>
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
                      
                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="8">
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
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Sexo</Form.Label>
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
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Edad</Form.Label>
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
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha control</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaControl" name="fechaControl" 
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

                        <Row>
                          <Col md={6}>
                          <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Peso</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Peso en Kg" size="lg" id="peso" name="peso" 
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
                              <Form.Control type="text" placeholder="Talla en cm" size="lg" id="talla" name="talla" 
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
             <Form.Label column sm="12" style={{"font-size": "12px !important" }}>Puntuación Z (0 a 2 años)</Form.Label>
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
                            min: 45,
                          }
                        }
                      }}
                  />
                </div>
                <p className="ejex">Longitud(cm)</p>
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
                                Añadir control   <FontAwesomeIcon data-tip data-for="boton1" icon={faAddressCard} size="lg" color="#FFF" />
                            </Button>
                        </div>
                  </Col>
                </Row>

              )}


                        {rolUser === "madre" && ( 
                          <p>Campo de mamita TENSION</p>
                        )}   
                
                    </Form>
                            );
                        }}
                      </Formik> 
            </Row>
        </Container>
    )

}