import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import swal from 'sweetalert';
import Lottie from 'react-lottie';
import { getUserByIdApi } from "../../../api/user";

import "./GraphicAddNutri.scss";
import moment from 'moment';

export default function DetailControlN(props){
    const { userControl, control } = props;
    const { user } = AuthContext();
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const documentoLogin = user.sub.split('-');
    const [ stateNutrition, setStateNutrition ] = useState({ color: "", text: "", animation: null});
    const [ imc, setImc ] = useState(0);
    const [ graphicValues, setGraphicValues] = useState({ x: 0, y: 0, r: 10});
    const rolUser = "madre";
    const [ goRedirect, setGoRedirect ] = useState(false);
    const [ nombreNutricionista, setNombreNutricionista ] = useState("");

    let dateFechaNaci = moment(userControl.fechaNacimiento);
    let dateCurrent = moment();
    userControl.edad = dateCurrent.diff(dateFechaNaci, 'months');

     let idUsuarioNutricionista;
     useEffect(() => {
        getUserByIdApi(idUsuarioNutricionista, token).then(response => {
            console.log(response);
            setNombreNutricionista(response.nombre);
        })
    }, []);

    
 
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

    return(
        <Container>
            <Row>
              <Formik
                onSubmit={(valores, {resetForm}) => {
                  var tension = null;
                  var edadGestacional = null;
                  /*if(parametro === "mamita"){
                    tension = valores.tension;
                    edadGestacional = valores.edadGestacional;
                  }*/
                  var documertParse = parseInt( documentoLogin[0]);
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

                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Documento Nutricionista</Form.Label>
                        <Col sm="8">
                            <InputGroup hasValidation>
                            <Form.Control type="number" size="lg" id="idUsuarioNutricionista" name="idUsuarioNutricionista" 
                               value={control.idUsuarioNutricionista} onChange={handleChange} onBlur={handleBlur}  disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Nombre Nutricionista</Form.Label>
                        <Col sm="8">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="nombre" name="nombre" 
                               defaultValue={nombreNutricionista} onChange={handleChange} onBlur={handleBlur} disabled
                            
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>

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
                      
                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha nacimiento</Form.Label>
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
                                 value={dateFormat(control.fechaControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaControl && touched.fechaControl}
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
                               value={control.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
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
                               value={control.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
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
                
                <center>
                  <Col md={4} className="mt-5">
                            <Form.Group as={Row}>
                                <Alert variant="secondary">
                                  <Alert.Heading className="text-center">IMC Calculado: {control.imc}</Alert.Heading>
                                </Alert>
                            </Form.Group> 

                            <Form.Group as={Row}>
                            <Alert variant={stateNutrition.color}>
                              <Alert.Heading className="text-center">Estado nutricional: {control.estadoNutricional} </Alert.Heading>
                              <Lottie height={80} width={80}
                                  options={{ loop: true, autoplay: true, animationData: stateNutrition.animation, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                              />
                            </Alert>
                            </Form.Group> 
                  </Col>
                  </center>
              
              {rolUser === "MADRE_GESTANTE" && ( 
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