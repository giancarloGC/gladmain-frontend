import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { updateControlApi } from "../../../api/controls";
import swal from 'sweetalert';

export default function EditControlCyD(props){
  const { userControl, control } = props;
  const token = localStorage.getItem(TOKEN);
  const { user } = AuthContext();
  const documentoLogin = user.sub.split('-');
  const [ textFormSend, setTextFormSend ] = useState({});
  const [show, setShow] = useState(false);

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

  const convertGToKg = (kg) => {
    let resultado = kg / 1000;
    return resultado;
  }
    
  const convertCmToM = (cm) => {
    let resultado = cm / 100;
    return resultado;
  }

  const calculateIMC = (kg, metros) => {
    const imc = kg / (metros * metros);
    return imc;
  }

  return (
    <Container className="b">
      <Row  style={{backgroundColor: '#f1f1f1'}}>
        <Col sm={1}> </Col>
          <Col sm={10}> 
          <Formik
            initialValues={{ 
              nombre: '', 
              documento: '',
              fechaNacimiento: '',
              sexo: '', 
              peso: control.peso,
              talla: control.talla,
              imc: '',
              fechaControl: control.fechaControl,
              proximoControl: control.proximoControl,
              ultimoControl: control.ultimoControl,
              edadAños: '',
              meses: ''
            }}

            validate={(valores) => {
              let errores = {};

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

              const dateCurrently2 = new Date();
              if(!valores.fechaControl){
                errores.fechaControl = 'Asegurese de selecionar una fecha';
              }else if(dateCurrently2 <= valores.fechaControl){
                errores.fechaControl = 'Seleccione una fecha valida';
              }

              const dateCurrently = new Date();
              if(!valores.proximoControl){
                errores.proximoControl = 'Asegurese de selecionar una fecha';
              }else if(dateCurrently <= valores.proximoControl){
                errores.proximoControl = 'Seleccione una fecha valida';
              }

              return errores;
            }}

            onSubmit={(valores, {resetForm}) => {

              valores.token = token;
              var documertParse = parseInt( documentoLogin[0]);

              const formData = {
                id: control.id,
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
                meses: control.meses
              }
              console.log(formData);
              formData.token = token;
              updateControlApi(formData).then(response => {
                if(response === true){
                  swal("¡Excelente, registro exitoso!, El control fue almacenado correctamente", {
                    icon: "success",
                });
                  setShow(true);
                }else{
                  swal("Opss! Ocurrió un error!", {
                    icon: "error",
                });
                  setShow(true);
                }
              });
              setTimeout(() => {
                setShow(false);
              }, 5000);
            }}
          >
            {props => {const { values, touched, errors, dirty, isSubmitting,handleChange, handleBlur, 
                      handleSubmit, handleReset } = props;
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
                    <Form.Label column md={2} style={{"font-size": "12px !important"}} >Número documento</Form.Label>
                    <Col md={4}>
                      <InputGroup hasValidation>
                        <Form.Control type="number" placeholder="Dígita el documento" size="lg" id="documento" name="documento" style={{marginLeft:10}}
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
                               isValid={!errors.documento && touched.documento} disabled />
                        <Form.Control.Feedback type="invalid"> {errors.documento} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>

                    <Form.Label column md={2} style={{"font-size": "12px !important"}}>Nombre</Form.Label>
                    <Col md={4}>
                      <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="nombre" name="nombre" 
                          value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                          isValid={!errors.nombre && touched.nombre} disabled />
                        <Form.Control.Feedback type="invalid"> {errors.nombre} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3 mt-4">
                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha nacimiento</Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Control type="date" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
                          value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                          isValid={!errors.fechaNacimiento && touched.fechaNacimiento} disabled />
                        <Form.Control.Feedback type="invalid"> {errors.fechaNacimiento} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>

                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Sexo</Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Select name="sexo" onChange={handleChange} onBlur={handleBlur}
                          value={userControl.sexo} isValid={!errors.sexo && touched.sexo} 
                          isInvalid={!!errors.sexo && touched.sexo} disabled >
                          <option disabled>Selecciona el sexo</option>
                          <option value="FEMENINO">FEMENINO</option>
                          <option value="MASCULINO">MASCULINO</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.sexo} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>

                    <Form.Label column sm="1" style={{"font-size": "12px !important"}}>Peso (kg)</Form.Label>
                    <Col sm="2">
                      <InputGroup hasValidation>
                        <Form.Control type="number" placeholder="Peso (kg)" size="lg" id="peso" name="peso" 
                          defaultValue={convertGToKg(control.peso)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                          isValid={!errors.peso && touched.peso} />
                        <Form.Control.Feedback type="invalid"> {errors.peso} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                        
                    <Form.Label column sm="1" style={{"font-size": "12px !important"}}>Talla (cm)</Form.Label>
                    <Col sm="2">
                      <InputGroup hasValidation>
                        <Form.Control type="number" placeholder="Talla (cm)" size="lg" id="talla" name="talla" 
                          defaultValue={control.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
                          isValid={!errors.talla && touched.talla} />
                        <Form.Control.Feedback type="invalid"> {errors.talla} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>

                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>IMC calculado</Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Control className="mt-2" type="text" placeholder="Valor de IMC" size="lg" id="imc" name="imc" 
                          value={calculateIMC(values.peso, convertCmToM(values.talla))} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.imc && touched.imc}
                          isValid={!errors.imc && touched.imc} disabled />
                        <Form.Control.Feedback type="invalid"> {errors.imc} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Form.Group> 

                  <Form.Group as={Row} className="mb-3 mt-4">
                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha control</Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Control className="mt-2" type="date" size="lg" id="fechaControl" name="fechaControl" 
                          defaultValue={dateFormat(control.fechaControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaControl && touched.fechaControl}
                          isValid={!errors.fechaControl && touched.fechaControl} />
                        <Form.Control.Feedback type="invalid"> {errors.fechaControl} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>

                    <Form.Label column sm="2" style={{"font-size": "12px !important"}}>Fecha prox. control</Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Control  className="mt-2" type="date" size="lg" id="proximoControl" name="proximoControl" 
                          defaultValue={dateFormat(control.proximoControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.proximoControl && touched.proximoControl}
                          isValid={!errors.proximoControl && touched.proximoControl} />
                        <Form.Control.Feedback type="invalid"> {errors.proximoControl} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Form.Group> 

                  <Row >
                    <div  className="row justify-content mb-5">
                      <Button variant="primary" type="submit" size="lg"> Guardar </Button>
                    </div>
                  </Row >

                </Form>
              );
            }}
          </Formik> 
        </Col>
      </Row>
    </Container>

  )
}