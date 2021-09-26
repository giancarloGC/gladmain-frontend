import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { updateContVaccApi } from "../../../api/vaccination";
import swal from 'sweetalert';
import moment from 'moment';

export default function EditControlVMadre (props){
    const { userControl, infoControl } = props;
    const token = localStorage.getItem(TOKEN);
    const [ textFormSend, setTextFormSend ] = useState({});
    const [show, setShow] = useState(false);

    const dateFormat = (date) => {
        if(date){
            let dateFormated = date.split('T');
            return dateFormated[0];
        }
    }

    return(
        <Container className="b">
            <Row> 
              <Col sm={1}> </Col>
                <Col sm={10} style={{backgroundColor: '#f1f1f1'}}> 
                <Row className="justify-content-center">
                <Col sm={7}>
                <Formik 
                initialValues={{ 
                    fechaAplicacion: infoControl.fechaAplicacion,
                    nombreVacuna: infoControl.nombreVacuna, 
                    edadGestacional: infoControl.edadGestacional,
                }}
                
                validate={(valores) => {
                  let errores = {};
                    
                  const dateCurrently = moment();
                  if(!valores.fechaAplicacion){
                    errores.fechaAplicacion = 'Asegurese de selecionar una fecha';
                  }else{
                    let control = moment(valores.fechaAplicacion);
                    if(control.diff(dateCurrently, 'hours') > 0){
                        errores.fechaAplicacion = 'Seleccione una fecha valida, no mayor a hoy';
                  }
                  } 

                  if(!valores.nombreVacuna){
                    errores.nombreVacuna = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreVacuna)){
                    errores.nombreVacuna = 'Nombre incorrecto, solo puedes escribir letras';
                  }

                  if(!valores.edadGestacional){
                    errores.edadGestacional = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.edadGestacional)){
                    errores.edadGestacional = 'Edad gestacional incorrecta, solo puedes escribir valores enteros';
                  }

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  valores.token = token;
                  
                  const formData = {
                    idUsuario: userControl.documento,
                    nombreVacuna: valores.nombreVacuna,
                    fechaAplicacion: valores.fechaAplicacion,
                    dosis: null,
                    edadGestacional: valores.edadGestacional,
                    vigente: false
                }
                console.log(formData);
                valores.token = token;
                updateContVaccApi(formData, token).then(response => {
                    if(response === true){
                    swal("¡Excelente, registro exitoso!, El control fue actualizado correctamente", {
                        icon: "success",
                    })
                    .then((value) => {
                        window.location.replace(`/admin/listVacMadre/${userControl.documento}`);
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
                    
                    <Form.Group as={Row} className="mb-3 mt-4">
                    <Form.Label column sm="5" style={{"fontSize": "12px !important"}}>Tipo documento</Form.Label>
                       <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Select size="lg" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                value={userControl.tipoDocumento} isValid={!errors.tipoDocumento && touched.tipoDocumento} 
                                isInvalid={!!errors.tipoDocumento && touched.tipoDocumento} disabled
                            >
                            <option disabled>Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CE">Cédula de extranjería</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.tipoDocumento}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>
                       
                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Form.Label column sm="5" style={{"fontSize": "12px !important"}} >Número documento</Form.Label>
                        <Col sm="7">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita el documento" size="lg" id="documento" name="documento" 
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
                        
                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Form.Label column md={5} style={{"fontSize": "12px !important"}}>Nombre</Form.Label>
                        <Col sm="7">
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
                        
                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Form.Label column sm="5" style={{"fontSize": "12px !important"}}>Fecha Aplicacion</Form.Label>
                            <Col sm="7">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaAplicacion" name="fechaAplicacion" 
                                 defaultValue={dateFormat(infoControl.fechaAplicacion)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaAplicacion && touched.fechaAplicacion}
                                 isValid={!errors.fechaAplicacion && touched.fechaAplicacion} 
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaAplicacion}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Form.Label column md={5} style={{"fontSize": "12px !important"}}>Nombre Vacuna</Form.Label>
                        <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre de la vacuna" size="lg" id="nombreVacuna" name="nombreVacuna" 
                               defaultValue={infoControl.nombreVacuna} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreVacuna && touched.nombreVacuna}
                               isValid={!errors.nombreVacuna && touched.nombreVacuna}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreVacuna}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4 mt-3">
                        <Form.Label column sm="5" style={{"font-size": "12px !important"}}>Edad Gestacional</Form.Label>
                            <Col sm="7">
                           <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Edad gestacional en semanas" size="lg" id="edadGestacional" name="edadGestacional" 
                              defaultValue={infoControl.edadGestacional} onChange={handleChange} onBlur={handleBlur} 
                              isInvalid={!!errors.edadGestacional && touched.edadGestacional}
                                isValid={!errors.edadGestacional && touched.edadGestacional}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edadGestacional}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                          </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-4 mt-3 justify-content-center">
                        <Col sm="12">
                        <div  className="row justify-content mb-2">
                            <Button variant="primary" type="submit" size="lg">
                                Guardar
                            </Button>
                        </div>
                        </Col>
                        </Form.Group>
                        
                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}