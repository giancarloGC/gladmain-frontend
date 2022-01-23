import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import { updateContVaccApi } from "../../../api/vaccination";
import swal from 'sweetalert';
import moment from 'moment';
import Lottie from 'react-lottie';
import useAuth from '../../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../../assets/animations/withoutAuthorization.json";
import AnimationErrorServer from "../../../assets/animations/working-server-animation.json";

export default function EditControlVMadre (props){
    const { userControl, infoControl } = props;
    const token = localStorage.getItem(TOKEN);
    const [ textFormSend, setTextFormSend ] = useState({});
    const [show, setShow] = useState(false);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const { user } = useAuth();
    const [ authorization, setAuthorization ] = useState(true);
    const [ errorServer, setErrorServer ] = useState(false);

    console.log(infoControl);

    const validatePrivilegio = (privilegio) => {
      return user.authorities.filter(priv => priv === privilegio);
  }

    const dateFormat = (date) => {
        if(date){
            let dateFormated = date.split('T');
            return dateFormated[0];
        }
    }

    if(validatePrivilegio("ACTUALIZAR_CONTROL_VACUNACION").length === 0){
      return(
          <>
              <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                  <Lottie height={500} width="65%"
                  options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
              />
          </>
      )
  }else{
    return(
        <Container>
            <Row> 
              <Col sm={2}> </Col>
                <Col sm={8} style={{border:'2px solid #eee', borderRadius:'5px'}}> 
                <Row className="justify-content-center">
                <Col sm={10}>
                <Formik 
                initialValues={{ 
                    fechaAplicacion: infoControl.fechaAplicacion,
                    nombreVacuna: infoControl.nombreVacuna, 
                    edadGestacional: infoControl.edadGestacional,
                    lote: infoControl.lote, 
                    institucion: infoControl.institucion,
                    profesional: infoControl.profesionalSalud
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

                  
                  if(!valores.lote){
                    errores.lote = 'No se permiten campos vacíos'
                }
                if(!valores.institucion){
                  errores.institucion = 'No se permiten campos vacíos'
                }
                if(!valores.profesional){
                  errores.profesional = 'No se permiten campos vacíos'
                }

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  valores.token = token;
                  
                  const formData = {
                    id: infoControl.id,
                    idUsuario: userControl.documento,
                    nombreVacuna: valores.nombreVacuna,
                    fechaAplicacion: valores.fechaAplicacion,
                    dosis: null,
                    edadGestacional: valores.edadGestacional,
                    vigente: false,
                    lote: valores.lote,
                    institucion: valores.institucion,
                    profesionalSalud: valores.profesional,
                }
                console.log(formData);
                valores.token = token;
                setShowSpinner(true);
                updateContVaccApi(formData, token).then(response => {
                    setShowSpinner(false);
                    if(response === true){
                    setShowSpinner(false);
                    swal("¡Excelente, registro exitoso!, El control fue actualizado correctamente", {
                        icon: "success",
                    })
                    .then((value) => {
                        window.location.replace(`/admin/listVacMadre/${userControl.documento}`);
                    }); 
                    setShow(true);
                    }else{
                    setShowSpinner(false);
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
                    <Form.Label column sm="5">
                    <h5 style={{fontSize: "16px"}} className="mt-1">Tipo documento</h5></Form.Label>
                       <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Select size="xs" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                value={userControl.tipoDocumento} disabled
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
                        <Form.Label column sm="5"><h5 style={{fontSize: "16px"}} className="mt-1">Número documento</h5></Form.Label>
                        <Col sm="7">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita el documento" size="xs" id="documento" name="documento" 
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column md={5}> <h5 style={{fontSize: "16px"}} className="mt-1">Nombre </h5></Form.Label>
                        <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm="5"> <h5 style={{fontSize: "16px"}} className="mt-1">Fecha Aplicacion </h5></Form.Label>
                            <Col sm="7">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaAplicacion" name="fechaAplicacion" 
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

                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column md={5}><h5 style={{fontSize: "16px"}} className="mt-1"> Nombre Vacuna </h5></Form.Label>
                        <Col sm="7">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre de la vacuna" size="xs" id="nombreVacuna" name="nombreVacuna" 
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

                        <Form.Group as={Row} className="mt-2">
                        <Form.Label column sm="5"> <h5 style={{fontSize: "16px"}} className="mt-1">Edad Gestacional </h5></Form.Label>
                            <Col sm="7">
                           <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Edad gestacional en semanas" size="xs" id="edadGestacional" name="edadGestacional" 
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

                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí el lote" size="ls" id="lote" name="lote" 
                                defaultValue={infoControl.lote} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.lote && touched.lote}
                                isValid={!errors.lote && touched.lote}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lote}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí la institución" size="ls" id="institucion" name="institucion" 
                                defaultValue={infoControl.institucion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.institucion && touched.institucion}
                                isValid={!errors.institucion && touched.institucion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.institucion}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí el nombre del profesional" size="ls" id="profesional" name="profesional" 
                                defaultValue={infoControl.profesionalSalud} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.profesional && touched.profesional}
                                isValid={!errors.profesional && touched.profesional}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.profesional}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>


                        <Form.Group as={Row} className="mb-3 mt-3 justify-content-center">
                        <Col sm="12">
                        <div  className="row justify-content mb-2">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                             {showSpinner ? (
                                <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                                {"  " + `  Cargando...`}  
                                </>
                                ):(
                                " Guardar   " 
                            )}
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
}