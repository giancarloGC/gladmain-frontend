import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";


export default function AddControlN(props){
    const { userControl } = props;
    const { user } = AuthContext();
    const token = localStorage.getItem(TOKEN);
    const [ userApi, setUserByIdApi ] = useState({});
    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const documentoLogin = user.sub.split('-');
    const rolUser = "madre";
 
    const dateFormat = (date) => {
      if(date){
      let dateFormated = date.split('T');
      return dateFormated[0];
      }
    }

    return(
        <Container>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}> 
              <Formik
                initialValues={{ 
                    fechaControl: '',
                    peso: '',
                    talla: '',
                    imc: '',
                    estadoNutricional: '',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  /*if(!valores.documento){
                    errores.documento = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.documento)){
                    errores.documento = 'Documento incorrecto, solo puedes escribir números';
                  }
                  let docuemnt = toString(valores.documento);
                  if(docuemnt.length <= 0 || docuemnt.length > 15){
                    errores.documento = 'Documento invalido, intente con otro';
                  }      

                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  const dateCurrently = new Date();
                  if(!valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently <= valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Seleccione una fecha valida';
                  }
                  if(!valores.sexo){
                    errores.sexo = 'Asegurese de selecionar una opción';
                  }
                  if(!valores.edad){
                    errores.edad = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.edad)){
                    errores.edad = 'Edad incorrecta, solo puedes escribir números';
                  }else if(valores.edad <= 0 || valores.edad > 90){
                    errores.edad = 'Edad invalida, intente con otra';
                  }*/      
                  const dateCurrently2 = new Date();
                  if(!valores.fechaControl){
                    errores.fechaControl = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaControl){
                    errores.fechaControl = 'Seleccione una fecha valida';
                  }
                  if(!valores.peso){
                    errores.peso = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9])*$/.test(valores.peso)){
                    errores.peso = 'Solo puedes escribir números';
                  }
                  if(!valores.talla){
                    errores.talla = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9])*$/.test(valores.talla)){
                    errores.talla = 'Solo puedes escribir números';
                  }
                  if(!valores.imc){
                    errores.imc = 'Por favor, ingresa solo números';
                  }else if(!/^([0-9])*$/.test(valores.imc)){
                    errores.imc = 'Solo puedes escribir números';
                  }
                  if(!valores.estadoNutricional){
                    errores.estadoNutricional = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.estadoNutricional)){
                    errores.estadoNutricional = 'Solo puedes escribir letras';
                  }
                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  var tension = null;
                  var edadGestacional = null;
                  /*if(parametro === "mamita"){
                    tension = valores.tension;
                    edadGestacional = valores.edadGestacional;
                  }*/


                  const formData = {
                    idUsuario: userControl.documento,
                    idUsuarioNutricionista: documentoLogin[0],
                    nombre: userControl.nombre,
                    fechaNacimiento: userControl.fechaNacimiento,
                    sexo: userControl.sexo,
                    edad: userControl.edad,
                    fechaControl: valores.fechaControl,
                    peso: valores.peso,
                    talla: valores.talla,
                    tension: tension,
                    edadGestacional: edadGestacional,
                    imc: valores.imc,
                    estadoNutricional: valores.estadoNutricional,
                    edad: userControl.edad,
                  };
                  /*resetForm();
                  valores.token = token;
                  insertUserApi(valores).then(response => {
                      if(response.status !== 500){
                        getAssignRolApi(valores.role, valores.documento, valores.token).then(responseRol => {
                            if(responseRol === true){
                                setTextFormSend({
                                  variant: "success", heading: "¡Excelente, registro exitoso!",
                                  message: `El control ${valores.name} fue almacenado correctamente`
                                });
                                setShow(true);
                          }else{
                                setTextFormSend({
                                  variant: "danger", heading: "¡Opss, ocurrió un error!",
                                  message: "Revisaremos lo ocurrido, inténtalo nuevamente"
                              });
                              setShow(true);
                          }
                        });
                      }else{
                          setTextFormSend({
                              variant: "danger", heading: "¡Opss, ocurrió un error!",
                              message: "Revisaremos lo ocurrido, inténtalo nuevamente"
                          });
                          setShow(true);
                      }
                });*/
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

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Número documento</Form.Label>
                        <Col sm="8">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí el documento" size="lg" id="documento" name="documento" 
                               value={userControl.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
                               isValid={!errors.documento && touched.documento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.documento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Nombre</Form.Label>
                        <Col sm="8">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="nombre" name="nombre" 
                               value={userControl.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                               isValid={!errors.nombre && touched.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>
                      
                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
                                 Value={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                 isValid={!errors.fechaNacimiento && touched.fechaNacimiento}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Sexo</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                          <Form.Select size="lg" name="sexo" onChange={handleChange} onBlur={handleBlur}
                                value={userControl.sexo} isValid={!errors.sexo && touched.sexo} isInvalid={!!errors.sexo && touched.sexo}
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
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Edad</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Dígita aquí la edad" size="lg" id="edad" name="edad" 
                               value={userControl.edad} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                               isValid={!errors.edad && touched.edad}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha control</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaControl" name="fechaControl" 
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

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Peso</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Dígita aquí el peso" size="lg" id="peso" name="peso" 
                               value={values.peso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.peso && touched.peso}
                               isValid={!errors.peso && touched.peso}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.peso}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Talla</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Escribe la talla sin punto ni coma" size="lg" id="talla" name="talla" 
                               value={values.talla} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.talla && touched.talla}
                              isValid={!errors.talla && touched.talla}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.talla}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>IMC calculado</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Valor de IMC" size="lg" id="imc" name="imc" 
                               value={values.imc} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.imc && touched.imc}
                               isValid={!errors.imc && touched.imc}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.imc}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Estado nutricional</Form.Label>
                        <Col sm="8">
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

                        {rolUser === "madre" && ( 
                          <p>Campo de mamita TENSION</p>
                        )}   

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Añadir Control
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 

                </Col>
                <Col sm={3}></Col>
            </Row>
        </Container>
    )

}