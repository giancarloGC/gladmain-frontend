import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";


export default function AddControlF(){

    return(
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}}>
                <Col sm={1}></Col>
                <Col sm={10} className="mt-2 mb-4"> 
                <Formik
                initialValues={{ 
                    
                    id: '',
                    fechaSeg:"",
                    nombre: '',
                    tipoDocumento: '',
                    idUsuario: '',
                    celular: '',
                    idUsuarioNutricionista: '',
                    nombreAcudiente: '',
                    tipoDocAcudiente: '',
                    numeroDocAcudiente: '',
                    estadoNutricional: '',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  const dateCurrently2 = new Date();
                  if(!valores.fechaSeg){
                    errores.fechaSeg = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaSeg){
                    errores.fecha = 'Seleccione una fecha valida';
                  }
                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.tipoDocumento){
                    errores.tipoDocumento = 'Asegurese de selecionar una opción';
                  }
                  if(!valores.idUsuario){
                    errores.idUsuario = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.idUsuario)){
                    errores.idUsuario = 'Documento incorrecto, solo puedes escribir números';
                  }
                  let docuemnt = toString(valores.idUsuario);
                  if(docuemnt.length <= 0 || docuemnt.length > 15){
                    errores.idUsuario = 'Documento invalido, intente con otro';
                  }      
                  if(!valores.celular){
                    errores.celular = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.celular)){
                    errores.celular = 'Teléfono incorrecto, solo puedes escribir números';
                  } 
                  if(!valores.nombreAcudiente){
                    errores.nombreAcudiente = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombreAcudiente)){
                    errores.nombreAcudiente = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.numeroDocAcudiente){
                    errores.numeroDocAcudiente = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.numeroDocAcudiente)){
                    errores.numeroDocAcudiente = 'Documento incorrecto, solo puedes escribir números';
                  }
                  let docuemnt3 = toString(valores.numeroDocAcudiente);
                  if(docuemnt3.length <= 0 || docuemnt3.length > 15){
                    errores.numeroDocAcudiente = 'Documento invalido, intente con otro';
                  }    
                  if(!valores.estadoNutricional){
                    errores.estadoNutricional = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.estadoNutricional = 'Solo puedes escribir letras';
                  }  
                }}

                onSubmit={(valores, {resetForm}) => {
                  /*  resetForm();
                    valores.token = token;
                    insertUserApi(valores).then(response => {
                        console.log(repsonse);
                  });*/
                }}
                >

                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-1 mt-3">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>No. Seguimiento</Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="01" size="lg" id="idSeguimiento" name="idSeguimiento" 
                               value={values.idSeguimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.idSeguimiento && touched.idSeguimiento}
                               isValid={!errors.idSeguimiento && touched.idSeguimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idSeguimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        <Col sm="4"> </Col>

                        <Form.Label column sm="1" style={{"fontSize": "12px !important"}}>Fecha </Form.Label>
                        <Col sm="3">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaSeg" name="fechaSeg" 
                                 value={values.fechaSeg} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaSeg && touched.fechaSeg}
                                 isValid={!errors.fechaSeg && touched.fechaSeg}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaSeg}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <center>
                    <Form.Label column sm="4" style={{"fontSize": "12px !important"}} className="align-self-center justify-content-around mb-4"> <u>INFORMACIÓN DEL ACUDIENTE </u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                     <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Tipo de Documento</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Select  size="lg" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.tipoDocumento && touched.tipoDocumento} isInvalid={!!errors.tipoDocumento && touched.tipoDocumento}
                            >
                            <option disabled selected>Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
                            <option value="CE">Cédula de extranjería</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.tipoDocumento}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Número Documento</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="documento acudiente" size="lg" id="numeroDocAcudiente" name="numeroDocAcudiente" 
                            value={values.numeroDocAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.numeroDocAcudiente && touched.numeroDocAcudiente}
                            isValid={!errors.numeroDocAcudiente && touched.numeroDocAcudiente}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.numeroDocAcudiente}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3 mt-3">
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Nombre</Form.Label>
                    <Col md={10}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre del Acudiente" size="lg" id="nombreAcudiente" name="nombreAcudiente" 
                               value={values.nombreAcudiente} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombreAcudiente && touched.nombreAcudiente}
                               isValid={!errors.nombreAcudiente && touched.nombreAcudiente}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombreAcudiente}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                     </Col>
                    </Form.Group>

                    <center>
                    <Form.Label column sm="4" style={{"fontSize": "12px !important"}} className="align-self-center justify-content-around mb-4 mt-3"> <u>INFORMACIÓN DEL USUARIO </u> </Form.Label>
                    </center>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Tipo de Documento</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Select  size="lg" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.tipoDocumento && touched.tipoDocumento} isInvalid={!!errors.tipoDocumento && touched.tipoDocumento}
                            >
                            <option disabled selected>Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
                            <option value="CE">Cédula de extranjería</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.tipoDocumento}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                       
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Número Documento</Form.Label>
                            <Col md={4}>
                            <InputGroup hasValidation>
                            <Form.Control  type="text" placeholder="Número documento" size="lg" id="idUsuario" name="idUsuario" 
                            value={values.idUsuario} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.idUsuario}
                            isValid={!errors.idUsuario && touched.idUsuario}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idUsuario}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Nombre </Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="nombre usuario" size="lg" id="nombre" name="nombre" 
                               value={values.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                               isValid={!errors.nombre && touched.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Celular</Form.Label>
                        <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí Teléfono" size="lg" id="celular" name="celular" 
                            value={values.celular} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.celular && touched.celular}
                            isValid={!errors.celular && touched.celular}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.celular}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Form.Group>

                   
                    <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Estado Nutricional</Form.Label>
                    <Col md={10}>
                        <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Estado nutricional calculado" size="lg" id="estadoNutricional" name="estadoNutricional" 
                               value={values.estadoNutricional} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.estadoNutricional && touched.estadoNutricional}
                              isValid={!errors.estadoNutricional && touched.estadoNutricional}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.estadoNutricional}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                    </Col>
                    </Form.Group>                           

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                               Guardar
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
                <Col sm={1}></Col>
            </Row>
        </Container>
    )

}