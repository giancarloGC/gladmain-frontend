import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { updateControlApi } from "../../../api/controls";
import swal from 'sweetalert';
import moment from 'moment';

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

  /*const convertGToKg = (kg) => {
    let resultado = kg / 1000;
    return resultado;
  }*/
    
  const convertCmToM = (cm) => {
    let resultado = cm / 100;
    return resultado;
  }

  const calculateIMC = (kg, metros) => {
    const imc = kg / (metros * metros);
    return imc.toFixed(2);
  }

  return (
    <Container className="b">
      <Row  className="justify-content-center">
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

              const dateCurrently = moment();
              if(!valores.fechaControl){
                errores.fechaControl = 'Asegurese de selecionar una fecha';
              }else{
                let control = moment(valores.fechaControl);
                if(control.diff(dateCurrently, 'hours') > 0){
                    errores.fechaControl = 'Seleccione una fecha valida, no mayor a hoy';
              }
              }

              if(!valores.proximoControl){
                errores.proximoControl = 'Asegurese de selecionar una fecha';
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
                peso: valores.peso,
                talla: valores.talla,
                imc: calculateIMC(valores.peso, convertCmToM(valores.talla)),
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
                  swal("¡Excelente, registro exitoso!, El control fue actualizado correctamente", {
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


                  <Form.Group as={Row} className="mt-2">
                    <Form.Label column sm="2"><h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">Fecha control</h1></Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Control className="mt-2" type="date" size="lg" id="fechaControl" name="fechaControl" 
                          defaultValue={dateFormat(control.fechaControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaControl && touched.fechaControl}
                          isValid={!errors.fechaControl && touched.fechaControl} />
                        <Form.Control.Feedback type="invalid"> 
                        {errors.fechaControl} 
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    </Form.Group>

                  <Row className="justify-content-center">
                  <Col sm={12} className="mt-3 mb-4" style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}> 
                  
                  <Form.Group as={Row} className="mt-3">
                    <Form.Label column sm={2}> <h5 style={{fontSize: "16px"}}> Número documento </h5></Form.Label>
                    <Col sm={4}>
                      <InputGroup hasValidation>
                        <Form.Control type="number" placeholder="Dígita el documento" size="l" id="documento" name="documento"
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} disabled />
                      </InputGroup>
                    </Col>

                    <Form.Label column md={2}><h5 style={{fontSize: "16px"}} className="mt-1">Nombre</h5></Form.Label>
                    <Col md={4}>
                      <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Dígita aquí el nombre" size="l" id="nombre" name="nombre" 
                          value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} disabled />
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-3">
                    <Form.Label column sm={2}><h5 style={{fontSize: "16px"}}>Fecha nacimiento</h5></Form.Label>
                    <Col sm={4}>
                      <InputGroup hasValidation>
                        <Form.Control type="date" size="l" id="fechaNacimiento" name="fechaNacimiento" 
                          value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} disabled />
                       </InputGroup>
                    </Col>

                    <Form.Label column sm={2}><h5 style={{fontSize: "16px"}} className="mt-1">Sexo</h5></Form.Label>
                    <Col sm={4}>
                      <InputGroup hasValidation>
                        <Form.Select name="sexo" onChange={handleChange} onBlur={handleBlur}
                          value={userControl.sexo} disabled >
                          <option disabled>Selecciona el sexo</option>
                          <option value="FEMENINO">FEMENINO</option>
                          <option value="MASCULINO">MASCULINO</option>
                        </Form.Select>
                        </InputGroup>
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-2 mb-2">
                    <Form.Label column sm={2}><h5 style={{fontSize: "16px"}} className="mt-1">Peso (kg)</h5></Form.Label>
                    <Col sm={4}>
                      <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Peso (kg)" size="l" id="peso" name="peso" 
                          defaultValue={control.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                          isValid={!errors.peso && touched.peso} />
                        <Form.Control.Feedback type="invalid"> {errors.peso} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                        
                    <Form.Label column sm="2"><h5 style={{fontSize: "16px"}} className="mt-1">Talla (cm)</h5></Form.Label>
                    <Col sm="4">
                      <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Talla (cm)" size="l" id="talla" name="talla" 
                          defaultValue={control.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
                          isValid={!errors.talla && touched.talla} />
                        <Form.Control.Feedback type="invalid"> {errors.talla} </Form.Control.Feedback>
                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    </Form.Group>
                    </Col>
                    </Row >

                    <Form.Group as={Row} className="justify-content-center">
                        <Alert variant="warning">
                          <Alert.Heading className="text-center" style={{fontSize: "18px"}}>IMC Calculado: {calculateIMC(values.peso, convertCmToM(values.talla))}</Alert.Heading>
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