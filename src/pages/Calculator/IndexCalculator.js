import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { faPrint, faArrowCircleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import swal from 'sweetalert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, ErrorMessage } from "formik";
import Calculator from "../../assets/animations/control/calculate.json";

export default function IndexCalculator(){
    const [ goCalculate, setGoCalculate ] = useState({ edad: null, sexo: ''});
    const [ viewMessage, setViewMessage ] = useState(true);

    useEffect(() => {
      swal({
        title: "¡Asegúrate de Indicar tu edad en MESES y sexo para conocer tu estado de nutrición!",
        icon: 'info'
      });
    }, []);

    const goCalculateView = () => {
        return <Redirect to={`/admin/calculatorState/${goCalculate.edad}/${goCalculate.sexo}`} />;
    }

    return(
            <Container>
            <Row>          
                <Col>

                {goCalculate.edad && (
                    goCalculateView()
                )}

                <Formik
                
                validate={(valores) => {
                  let errores = {};
                  
                  if(!valores.edad){
                    errores.edad = 'Por favor, no dejar campos vacios';
                  }else if(!/^([0-9])*$/.test(valores.edad)){
                    errores.edad = 'Edad incorrecta, solo puedes escribir números';
                  }else if(valores.edad < 0 || valores.edad > 72){
                    errores.edad = 'Edad invalida, solo edad entre 0 y 72 meses (6 años)';
                  } 

                    if(!valores.sexo){
                        errores.sexo = 'Asegurese de selecionar una opción';
                    }
                  
                  return errores;
                }}
                
                initialValues={{ edad: '', sexo: '' }}
                onSubmit={(valores, {resetForm}) => {
                    setGoCalculate({edad: valores.edad, sexo: valores.sexo});
                }}
                >
                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>
                        <Row>
                        <Col md={3}> 
                        </Col>
                        <Col md={6}>

                        <Row>
                          <Col md={5} className="mt-3">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Edad en meses" size="lg" id="edad" name="edad" 
                                onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                               isValid={!errors.edad && touched.edad}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                          </Col>


                          <Col md={5} className="mt-3">
                          <InputGroup hasValidation>
                        <Form.Select size="lg" name="sexo" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.sexo && touched.sexo} isInvalid={!!errors.sexo && touched.sexo}
                            >
                            <option disabled selected>Selecciona el sexo</option>
                            <option value="FEMENINO">Femenino</option>
                            <option value="MASCULINO">Masculino</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.sexo}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>     
                          </Col>
                          <Col md={2}>
                            <Button variant="primary" type="submit" size="lg">
                                <FontAwesomeIcon icon={faChevronRight} className="icon" size="1x"/>
                            </Button>
                          </Col>
                        </Row>

                        </Col>
                        <Col md={3}> 
                        </Col>
                        </Row>
                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
            </Row>
            <Lottie height={500} width={500}
                options={{ loop: true, autoplay: true, animationData: Calculator, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
            />
            </Container>
        )
    }