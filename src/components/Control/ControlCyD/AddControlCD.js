import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { insertControlApi } from "../../../api/controls";
import { updateUserApi } from "../../../api/user";
import swal from 'sweetalert';
import moment from 'moment';

export default function AddControlCD(props){
  const { userControl } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');
  const [ textFormSend, setTextFormSend ] = useState({});
  const [show, setShow] = useState(false);
  const [ imc, setImc ] = useState(null);

  let dateFechaNaci = moment(userControl.fechaNacimiento);
  let dateCurrent = moment();
  userControl.edad = dateCurrent.diff(dateFechaNaci, 'months');

  const updateAndInsert = async (dataUser, formData) => {
    const responseUser = await updateAgeUser(dataUser);
    const responseControl = await insertcONTROLc(formData);
    let result = {
      user: responseUser,
      control: responseControl
    }
    if(result.user === true && result.control === true){
      swal("¡Excelente, registro exitoso!, El control fue almacenado correctamente", {
        icon: "success",
      })
      .then((value) => {
          window.location.replace(`/admin/listControlCyD/${userControl.documento}`);
        }); 
      setShow(true);
  }else{
    swal("Opss! Ocurrió un error!", {
      icon: "error",
  });
      setShow(true);
  }
  setTimeout(() => {
    setShow(false);
  }, 5000);
  }

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

  const convertMToCm = (cm) => {
    let resultado = cm * 100;
    return resultado;
  }

  const calculateIMC = (kg, metros) => {
    const imc = kg / (metros * metros);
    return imc.toFixed(2);
  }

  const updateAgeUser = async (dataUser) => {
    dataUser.token = token;
    const responUpdateUser = await updateUserApi(dataUser);
    console.log(responUpdateUser);
    if(responUpdateUser === true){
      return true;
    }else{
      return false;
    }
  } 

  const insertcONTROLc = async (formData) => {
    const response = await insertControlApi(formData, token, false);
      console.log(response);
      if(response === true){
        return true;
      }else{
        return false;
      }
  }

    return(
        <Container className="b">
            <Row className="justify-content-center">
              <Col sm={10}>
                <Formik 
                initialValues={{ 
                    documento: '',
                    nombre: '', 
                    fechaNacimiento: '',
                    sexo: '', 
                    fechaControl: '',
                    proximoControl: '',
                    ultimoControl: '',
                    edad: userControl.edad,
                    peso: '',
                    talla: '',
                    imc: '',
                    edadAños: '',
                    meses: ''
                }}
                
                validate={(valores) => {
                  let errores = {};
                  if(!valores.edad){
                    errores.edad = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.edad)){
                    errores.edad = 'Edad incorrecta, solo puedes escribir números';
                  }else if(valores.edad <= 0 || valores.edad > 90){
                    errores.edad = 'Edad invalida, intente con otra';
                  }  
                  const dateCurrently = moment();
                  if(!valores.fechaControl){
                    errores.fechaControl = 'Asegurese de selecionar una fecha';
                  }else{
                    let control = moment(valores.fechaControl);
                    if(control.diff(dateCurrently, 'hours') > 0){
                        errores.fechaControl = 'Seleccione una fecha valida, no mayor a hoy';
                  }
                  }
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
                  if(valores.talla && valores.peso){
                    let tal = calculateIMC(valores.peso, convertCmToM(valores.talla))
                    setImc(tal);
                  }else{
                    setImc(null);
                  }
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  valores.token = token;
                  var documertParse = parseInt( documentoLogin[0]);
                  
                  const formData = {
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    fechaControl: valores.fechaControl,
                    peso: valores.peso,
                    talla: valores.talla,
                    imc: imc,
                    estadoNutricional: "",
                    tension: null,
                    edadGestacional: null,
                    ultimoControl: valores.ultimoControl,
                    proximoControl: 0,
                    vigente: false,
                    meses: valores.edad,
                }
                console.log(formData);

                const dataUser = {
                    documento: userControl.documento,
                    tipoDocumento: userControl.tipoDocumento,
                    nombre: userControl.nombre,
                    sexo: userControl.sexo,
                    fechaNacimiento: userControl.fechaNacimiento,
                    celular: userControl.celular,
                    edad: valores.edad,
                    municipio: userControl.municipio,
                    direccion: userControl.direccion,
                    correoElectronico: userControl.correoElectronico,
                    clave: userControl.clave
                }
                updateAndInsert(dataUser, formData);
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
                 <Col sm={6}>
                <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm={4}><h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">Fecha control</h1></Form.Label>
                        <Col>
                          <InputGroup hasValidation>
                              <Form.Control className="mt-2" type="date" size="lg" id="fechaControl" name="fechaControl" 
                                 value={values.fechaControl} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaControl && touched.fechaControl}
                                 isValid={!errors.fechaControl && touched.fechaControl}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaControl}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                </Form.Group> 
                </Col>
            </Row>

              <Row className="justify-content-center">
              <Col sm={12} className="mt-3 mb-4" style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}> 

                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm={3}> <h5 style={{fontSize: "16px"}}> Número documento</h5></Form.Label>
                        <Col >
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita el documento" size="l" id="documento" name="documento"
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>

                        <Form.Label column sm={2}> <h5 style={{fontSize: "16px"}} className="mt-1">Nombre</h5></Form.Label>
                        <Col sm={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="l" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm={3}> <h5 style={{fontSize: "16px"}}>Fecha nacimiento</h5></Form.Label>
                        <Col>
                          <InputGroup hasValidation>
                              <Form.Control type="text" size="l" id="fechaNacimiento" name="fechaNacimiento" 
                                 value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>

                        <Form.Label column sm={2}> <h5 style={{fontSize: "16px"}} className="mt-1"> Edad </h5> </Form.Label>
                        <Col sm={4}>
                        <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la edad" size="l" id="edad" name="edad" 
                              value={`${userControl.edad} meses`} onChange={handleChange} onBlur={handleBlur}  disabled
                              />
                          </InputGroup>
                      </Col>
                      </Form.Group> 

                      <Form.Group as={Row} className="mt-2 mb-2">
                        <Form.Label column sm={2}> <h5 style={{fontSize: "16px"}} className="mt-1"> Sexo </h5></Form.Label>
                        <Col sm={2}>
                          <InputGroup hasValidation>
                          <Form.Select name="sexo" onChange={handleChange} onBlur={handleBlur} size="l"
                                value={userControl.sexo} disabled
                              >
                              <option disabled>Selecciona el sexo</option>
                              <option value="FEMENINO">FEMENINO</option>
                              <option value="MASCULINO">MASCULINO</option>
                              </Form.Select>
                          </InputGroup>
                          </Col>


                        <Form.Label column sm="2"> <h5 style={{fontSize: "16px"}} className="mt-1"> Peso (kg) </h5></Form.Label>
                        <Col sm="2">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Peso en (Kg)" size="l" id="peso" name="peso" 
                               defaultValue={values.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                               isValid={!errors.peso && touched.peso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.peso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2"><h5 style={{fontSize: "16px"}} className="mt-1">Talla (cm) </h5></Form.Label>
                        <Col sm="2">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Talla en (m)" size="l" id="talla" name="talla" 
                               defaultValue={values.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
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
                    </Row >

                    <Form.Group as={Row} className="justify-content-center">
                        <Alert variant="warning">
                          <Alert.Heading className="text-center" style={{fontSize: "18px"}}>IMC Calculado: {imc ? imc : ''}</Alert.Heading>
                        </Alert>
                    </Form.Group> 

                    <Form.Group as={Row} className="mt-1 justify-content-center">
                            <Button variant="primary" type="submit" size="lg">
                                Guardar
                            </Button>
                    </Form.Group> 
                  </Form>
                            );
                        }}
                      </Formik> 
              </Col>
            </Row>
        </Container>
    )

}