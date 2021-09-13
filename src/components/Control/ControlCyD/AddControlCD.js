import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { insertControlApi } from "../../../api/controls";
import { updateUserApi } from "../../../api/user";

export default function AddControlCD(props){
  const { userControl } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');
  const [ textFormSend, setTextFormSend ] = useState({});
  const [show, setShow] = useState(false);

  const updateAndInsert = async (dataUser, formData) => {
    const responseUser = await updateAgeUser(dataUser);
    const responseControl = await insertcONTROLc(formData);
    let result = {
      user: responseUser,
      control: responseControl
    }
    if(result.user === true && result.control === true){
      console.log("entro");
      setTextFormSend({
        variant: "success", heading: "¡Excelente, registro exitoso!",
        message: `El control fue almacenado correctamente`
      });
      setShow(true);
  }else{
    console.log("rarisimo");
      setTextFormSend({
          variant: "danger", heading: "¡Opss, ocurrió un error!",
          message: "Revisaremos lo ocurrido, inténtalo nuevamente"
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
    return imc;
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
            <Row  style={{backgroundColor: '#f1f1f1'}}>
              <Col sm={1}> </Col>
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
                  
                  if(!valores.meses){
                    errores.meses = 'Asegurese de seleccionar una opción';
                  }

                  const dateCurrently2 = new Date();
                  if(!valores.fechaControl){
                    errores.fechaControl = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaControl){
                    errores.fechaControl = 'Seleccione una fecha valida';
                  }

                  if(!valores.peso){
                    errores.peso = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.peso)){
                    errores.peso = 'Solo puedes escribir números';
                  }

                  if(!valores.talla){
                    errores.talla = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.talla)){
                    errores.talla = 'Solo puedes escribir números';
                  }
                  
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {

                  if(valores.meses !== 'meses'){
                    valores.edad = valores.edad * 12;
                  };


                  valores.token = token;
                  var documertParse = parseInt( documentoLogin[0]);
                  
                  const formData = {
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documertParse,
                    fechaControl: valores.fechaControl,
                    peso: convertKgToG(valores.peso),
                    talla: valores.talla,
                    imc: parseInt(calculateIMC(valores.peso, convertCmToM(valores.talla))),
                    estadoNutricional: "",
                    tension: null,
                    edadGestacional: null,
                    ultimoControl: valores.ultimoControl,
                    proximoControl: valores.proximoControl,
                    vigente: false,
                    meses: valores.edad,
                }

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

                    <Form.Group as={Row} className="mb-3 mt-5">
                        <Form.Label column md={2} style={{"fontSize": "12px !important"}} >Número documento</Form.Label>
                        <Col md={4}>
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita el documento" size="lg" id="documento" name="documento" style={{marginLeft:10}}
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
                               isValid={!errors.documento && touched.documento} disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.documento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Form.Label column md={2} style={{"fontSize": "12px !important"}}>Nombre</Form.Label>
                        <Col md={4}>
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

                        <Form.Group as={Row} className="mb-3 mt-4">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
                                 value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                 isValid={!errors.fechaNacimiento && touched.fechaNacimiento} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Sexo</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                          <Form.Select name="sexo" onChange={handleChange} onBlur={handleBlur}
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

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Edad en meses</Form.Label>
                        <Col sm="2">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Edad" size="lg" id="edad" name="edad" 
                               defaultValue={userControl.edad} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                               isValid={!errors.edad && touched.edad}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={2}>
                        <InputGroup hasValidation>
                        <Form.Select size="lg" name="meses" onChange={handleChange} onBlur={handleBlur} id="meses"
                                    isValid={!errors.meses && touched.meses} isInvalid={!!errors.meses && touched.meses}
                            >
                            <option disabled selected>Seleccionar opción</option>
                            <option value="meses">meses</option>
                            <option value="anos">años</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.meses}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Peso (kg)</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Peso en (Kg)" size="lg" id="peso" name="peso" 
                               defaultValue={convertKgToG(values.peso)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                               isValid={!errors.peso && touched.peso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.peso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3 mt-4">
                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Talla (cm)</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Talla en (m)" size="lg" id="talla" name="talla" 
                               defaultValue={values.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
                              isValid={!errors.talla && touched.talla}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.talla}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>IMC calculado</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control className="mt-2" type="text" placeholder="Valor de IMC" size="lg" id="imc" name="imc" 
                               value={calculateIMC(values.peso, convertCmToM(values.talla))} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.imc && touched.imc}
                               isValid={!errors.imc && touched.imc} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.imc}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3 mt-4">
                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha control</Form.Label>
                        <Col sm="4">
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

                        <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha prox. control</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control  className="mt-2" type="date" size="lg" id="proximoControl" name="proximoControl" 
                                 value={values.proximoControl} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.proximoControl && touched.proximoControl}
                                 isValid={!errors.proximoControl && touched.proximoControl}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.proximoControl}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Row >
                        <div  className="row justify-content mb-5">
                            <Button variant="primary" type="submit" size="lg">
                                Guardar
                            </Button>
                        </div>
                        </Row >

                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
                <Col sm={1}> </Col>  
            </Row>
        </Container>
    )

}