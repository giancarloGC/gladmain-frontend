import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import "./GraphicAddNutri.scss";
import moment from 'moment';

export default function DetailControlN(props){
    const { userControl, control, nombreNutricionista } = props;
    const { rolUser } = useParams();
    const { user } = AuthContext();
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const documentoLogin = user.sub.split('-');
    const [ stateNutrition, setStateNutrition ] = useState({ color: "", text: "", animation: null});
    const [ imc, setImc ] = useState(0);
    const [ graphicValues, setGraphicValues] = useState({ x: 0, y: 0, r: 10});
    const [ goRedirect, setGoRedirect ] = useState(false);

    let dateFechaNaci = moment(userControl.fechaNacimiento);
    let dateCurrent = moment();
    userControl.edad = dateCurrent.diff(dateFechaNaci, 'months');

     let idUsuarioNutricionista;   
 
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
                <Row >
                  <Col sm={1}></Col>
                  <Col sm={10}> 

                  <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3"><h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">Fecha control</h1></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaControl" name="fechaControl" 
                                 value={dateFormat(control.fechaControl)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group> 

                  <Container style={{border:'2px solid #eee', borderRadius:'5px'}}>
                  <Form.Group as={Row} className='mt-2'>
                        <Form.Label column sm="3"><h5 style={{fontSize: "16px"}}>Documento Nutricionista</h5></Form.Label>
                        <Col sm="3">
                            <InputGroup hasValidation className="mt-2">
                            <Form.Control type="number" size="xs" id="idUsuarioNutricionista" name="idUsuarioNutricionista" 
                               value={control.idUsuarioNutricionista} onChange={handleChange} onBlur={handleBlur}  disabled
                            />
                        </InputGroup>
                        </Col>
                        <Form.Label column sm="2"><h5 style={{fontSize: "16px"}}>Nombre Nutricionista</h5></Form.Label>
                        <Col sm="4">
                        <InputGroup hasValidation className="mt-2">
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                               defaultValue={nombreNutricionista} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                  </Form.Group>

                  <center>
                  <Form.Label column sm="4" className="align-self-center justify-content-around mb-3 mt-2"> 
                  <u><h1 style={{fontSize: "18.5px", color:"#0084d2" }}>INFORMACIÓN DEL USUARIO </h1></u> </Form.Label>
                  </center>

                  <Form.Group as={Row} >
                        <Form.Label column sm="3"><h5 style={{fontSize: "16px"}}>Número documento</h5></Form.Label>
                        <Col sm="3">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí el documento" size="xs" id="documento" name="documento" 
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    
                      <Form.Label column sm="2"><h5 style={{fontSize: "16px"}}>Nombre</h5></Form.Label>
                        <Col sm="4">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-2">
                      <Form.Label column sm="3"><h5 style={{fontSize: "16px"}}>Fecha nacimiento</h5></Form.Label>
                      <Col sm="3">
                        <InputGroup hasValidation>
                            <Form.Control type="date" size="xs" id="fechaNacimiento" name="fechaNacimiento" 
                                Value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                      </Col>
                      <Form.Label column sm="2"><h5 style={{fontSize: "16px"}}>Edad</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la edad" size="xs" id="edad" name="edad" 
                               value={`${userControl.edad} meses`} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                      </Col>
                  </Form.Group> 

                  <Form.Group as={Row} className="mt-2 mb-3">
                        <Form.Label column sm="1"><h5 style={{fontSize: "16px"}}>Sexo</h5></Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                          <Form.Select size="xs" name="sexo" onChange={handleChange} onBlur={handleBlur}
                                value={userControl.sexo} isValid={!errors.sexo && touched.sexo} disabled
                              >
                              <option disabled>Selecciona el sexo</option>
                              <option value="FEMENINO">FEMENINO</option>
                              <option value="MASCULINO">MASCULINO</option>
                              </Form.Select>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="1"><h5 style={{fontSize: "16px"}}>Peso</h5></Form.Label>
                        <Col md="3">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Peso en Kg" size="xs" id="peso" name="peso" 
                               value={control.peso} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>

                        <Form.Label column md="1"><h5 style={{fontSize: "16px"}}>Talla</h5></Form.Label>
                        <Col md="3">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Talla en cm" size="xs" id="talla" name="talla" 
                               value={control.talla} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                  </Form.Group>
                  </Container>


                  <Form.Group as={Row} className="mt-3">
                  <Col md="4">
                    <Alert variant="warning">
                      <Alert.Heading className="text-center" style={{fontSize: "18px"}}>IMC Calculado: {control.imc}</Alert.Heading>
                    </Alert>
                  </Col>
                  
                  <Col md="8">                    
                    <Alert variant="primary">
                      <Alert.Heading className="text-center" style={{fontSize: "18px"}}>Estado nutricional: {control.estadoNutricional}</Alert.Heading>
                    </Alert>
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="justify-content-center" >
                    <Col md="8"> 
                    <div  className="row justify-content mb-5">
                      <Button variant="primary" type="submit" size="lg" href={`/admin/editControlNutri/${control.id}/${userControl.documento}/${rolUser}`}> Editar Control </Button>
                    </div>
                    </Col>
                  </Form.Group>

                  </Col>
                  <Col sm={1}></Col>
                </Row>

                    </Form>
                            );
                        }}
                      </Formik> 
            </Row>
        </Container>
    )

}