import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { insertContVaccApi } from "../../../api/vaccination";
import swal from 'sweetalert';
import moment from 'moment';

export default function AddControlVMadre (props){
    const { userControl } = props;
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
              <Col sm={2}> </Col>
                <Col sm={8} style={{border:'2px solid #eee', borderRadius:'5px'}}> 
                <Row className="justify-content-center">
                <Col sm={10}>
                <Formik 
                initialValues={{ 
                    fechaAplicacion: '',
                    nombreVacuna: '', 
                    edadGestacional: ''
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
                    fechaAplicacion: valores.fechaAplicacion,
                    nombreVacuna: valores.nombreVacuna,
                    dosis: null,
                    edadGestacional: valores.edadGestacional,
                    vigente: false,
                    vacunas: null
                }
                console.log(formData);
                valores.token = token;
                insertContVaccApi(formData, token).then(response => {
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
                    
                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column sm="5"> <h5 style={{fontSize: "16px"}} className="mt-1">Tipo documento</h5></Form.Label>
                       <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Select size="xs" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                defaultValue={userControl.tipoDocumento} disabled
                            >
                            <option disabled>Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CE">Cédula de extranjería</option>
                            </Form.Select>
                        </InputGroup>
                        </Col>
                        </Form.Group>
                       
                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm="5"> <h5 style={{fontSize: "16px"}} className="mt-1"> Número documento </h5></Form.Label>
                        <Col sm="7">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita el documento" size="xs" id="documento" name="documento" 
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
                        
                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column md={5}><h5 style={{fontSize: "16px"}} className="mt-1">Nombre </h5></Form.Label>
                        <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm="5"><h5 style={{fontSize: "16px"}} className="mt-1">Fecha Aplicacion</h5></Form.Label>
                            <Col sm="7">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaAplicacion" name="fechaAplicacion" 
                                 value={dateFormat(values.fechaAplicacion)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaAplicacion && touched.fechaAplicacion}
                                 isValid={!errors.fechaAplicacion && touched.fechaAplicacion} 
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaAplicacion}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column md={5}><h5 style={{fontSize: "16px"}} className="mt-1">Nombre Vacuna</h5></Form.Label>
                        <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre de la vacuna" size="xs" id="nombreVacuna" name="nombreVacuna" 
                               value={values.nombreVacuna} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreVacuna && touched.nombreVacuna}
                               isValid={!errors.nombreVacuna && touched.nombreVacuna}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreVacuna}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm="5"><h5 style={{fontSize: "16px"}} className="mt-1">Edad Gestacional</h5></Form.Label>
                            <Col sm="7">
                           <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Edad gestacional en semanas" size="xs" id="edadGestacional" name="edadGestacional" 
                              value={values.edadGestacional} onChange={handleChange} onBlur={handleBlur} 
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
                            <Button variant="primary" type="submit" size="l">
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