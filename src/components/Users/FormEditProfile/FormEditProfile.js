import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { updateUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import "../FormEdit/FormEdit.scss";
import swal from 'sweetalert';

export default function FormEditProfile(props){   
    const { user } = props;
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ userLoaded, setUserLoaded ] = useState(user);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
  
  const [ loaded, setLoaded] = useState(false);
  console.log(user);

    var loading = true;

    const dateFormat = (date) => {
      if(date){
      let dateFormated = date.split('T');
      return dateFormated[0];
      }
    }
    
    return(
        <Container className='mt-4'>
            <Row>
                <Col sm={1}></Col>
                <Col sm={10} style={{backgroundColor: '#f1f1f1', borderRadius: '5px'}}> 
                <Row className="justify-content-center">
                <Col sm={11}>
                <Formik
                initialValues={user}
                validate={(valores) => {
                  let errores = {};
                  if(!valores.tipoDocumento){
                    errores.tipoDocumento = 'Asegurese de selecionar una opción';
                  }
                  if(!valores.documento){
                    errores.documento = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.documento)){
                    errores.documento = 'Documento incorrecto, solo puedes escribir números';
                  }
                  if(valores.documento.length <= 0 || valores.documento.length > 15){
                    errores.documento = 'Documento invalido, intente con otro';
                  }      

                  if(!valores.nombre){
                    errores.nombre = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.nombre)){
                    errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.sexo){
                    errores.sexo = 'Asegurese de selecionar una opción';
                  }
                  const dateCurrently = new Date();

                  if(!valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently <= valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Seleccione una fecha valida';
                  }

                  if(!valores.celular){
                    errores.celular = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.celular)){
                    errores.celular = 'Teléfono incorrecto, solo puedes escribir números';
                  }  

                  if(!valores.municipio){
                    errores.municipio = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.municipio)){
                    errores.municipio = 'Municipio incorrecto, solo puedes escribir letras';
                  }

                  if(!valores.direccion){
                    errores.direccion = 'No se permiten campos vacíos';
                  }

                  if(!valores.correoElectronico){
                    errores.correoElectronico = 'Por favor, ingresa números'
                  }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valores.correoElectronico)){
                    errores.correoElectronico = 'Email incorrecto, intente con otro';
                  }

                  if (!valores.clave){
                    errores.clave = 'Por favor, ingresa una contraseña'
                  }else if(valores.clave.length < 8){
                    errores.clave = 'La contraseña debe tener un minimo de 8 caracteres'
                  }
                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                        const data = {
                        documento: parseInt(valores.documento),
                        tipoDocumento: valores.tipoDocumento,
                        nombre: valores.nombre,
                        sexo: valores.sexo,
                        fechaNacimiento: valores.fechaNacimiento,
                        celular: parseInt(valores.celular),
                        edad: parseInt(valores.edad),
                        municipio: valores.municipio,
                        direccion: valores.direccion,
                        correoElectronico: valores.correoElectronico,
                        clave: valores.clave,
                        token: token
                      }
                      updateUserApi(data).then(response => {
                        if(response === true){
                          swal("¡Excelente, actualización exitosa!, Sus datos fueron actualizados correctamente", {
                            icon: "success",
                          })
                          .then((value) => {
                              window.location.replace(`/admin`);
                          });
                          setShow(true);
                        }else{
                          swal("Opss! Ocurrió un error!", {
                            icon: "error",
                          })
                          .then((value) => {
                              window.location.replace(`/admin`);
                          }); 
                            setShow(true);
                        }
                      });
                    //}
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
                        <Form.Group as={Row} className="mb-1 mt-3">
                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Tipo documento</h5></Form.Label>
                        <Col sm="4">
                        <InputGroup hasValidation>
                            <Form.Select size="xs" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                defaultValue={user.tipoDocumento} isValid={!errors.tipoDocumento && touched.tipoDocumento} disabled
                            >
                            <option disabled>Selecciona el tipo de documento</option>
                            <option value="CC">Cédula de ciudadanía</option>
                            <option value="RC">Registro civil</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CE">Cédula de extranjería</option>

                            </Form.Select>
                        </InputGroup>
                        </Col>

                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Número documento</h5></Form.Label>
                        <Col sm="4">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí el documento" size="xs" id="documento" name="documento" 
                            defaultValue={user.documento} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Nombre</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                              defaultValue={user.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                              isValid={!errors.nombre && touched.nombre}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.nombre}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Sexo</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                          <Form.Select size="xs" name="sexo" onChange={handleChange} onBlur={handleBlur}
                                  defaultValue={user.sexo} isValid={!errors.sexo && touched.sexo} isInvalid={!!errors.sexo && touched.sexo}
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

                        <Form.Group as={Row} className="mt-4">
                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Fecha nacimiento</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaNacimiento" name="fechaNacimiento" 
                                defaultValue={dateFormat(user.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                isValid={!errors.fechaNacimiento && touched.fechaNacimiento}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Celular</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Dígita aquí Teléfono" size="xs" id="celular" name="celular" 
                              defaultValue={user.celular} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.celular && touched.celular}
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
                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Edad en meses</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="edad" size="xs" id="edad" name="edad" 
                              defaultValue={user.edad} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2">
                        <h5 style={{fontSize:'17px'}}>Municipio</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí el municipio" size="xs" id="municipio" name="municipio" 
                              defaultValue={user.municipio} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.municipio && touched.municipio}
                              isValid={!errors.municipio && touched.municipio}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.municipio}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Form.Label column sm="2"><h5 style={{fontSize:'17px'}}>Direccion</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la dirección" size="xs" id="direccion" name="direccion" 
                              defaultValue={user.direccion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.direccion && touched.direccion}
                              isValid={!errors.direccion && touched.direccion}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.direccion}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2"><h5 style={{fontSize:'17px'}}>Correo electronico</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="email" placeholder="Dígita aquí el Correo " size="xs" id="correoElectronico" name="correoElectronico" 
                              defaultValue={user.correoElectronico} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.correoElectronico && touched.correoElectronico}
                              isValid={!errors.correoElectronico && touched.correoElectronico}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.correoElectronico}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                      <Form.Group as={Row} className="mb-2">
                      <Form.Label column sm="2"><h5 style={{fontSize:'17px'}}>Contraseña</h5></Form.Label>
                      <Col sm="4">
                        <InputGroup hasValidation>
                          <Form.Control size="xs" type="password" placeholder="Password" id="clave" name="clave" 
                          defaultValue={user.clave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.clave && touched.clave}
                          isValid={!errors.clave && touched.clave}
                          />
                          <Form.Control.Feedback type="invalid">
                                      {errors.clave}
                                  </Form.Control.Feedback>
                                  <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>

                      <Form.Label column sm="2"><h5 style={{fontSize:'17px'}}>Confirmar Contraseña</h5></Form.Label>
                      <Col sm="4">
                        <InputGroup hasValidation>
                          <Form.Control size="xs" type="password" placeholder="Password" id="clave" name="clave" 
                          defaultValue={user.clave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.clave && touched.clave}
                          isValid={!errors.clave && touched.clave}
                          />
                          <Form.Control.Feedback type="invalid">
                                      {errors.clave}
                                  </Form.Control.Feedback>
                                  <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>

                      </Form.Group>
                        <div className="d-grid gap-2 mb-3">
                            <Button variant="primary" type="submit" size="lg">
                                Guardar Cambios
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 


                      {show && (
                        <Alert variant={textFormSend.variant} onClose={() => setShow(false)} dismissible className="mt-5">
                            <Alert.Heading>{textFormSend.heading}</Alert.Heading>
                            <p style={{"color": textFormSend.variant === "success" ? "#2DA45C" : "#A42D55", "fontSize": 18}}>
                            {textFormSend.message}
                            </p>
                        </Alert>
                    )}
                    </Col>
                    </Row>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </Container>
    )
}