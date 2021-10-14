import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { insertUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import { getRolesApi, getAssignRolApi } from "../../../api/rol";
import swal from 'sweetalert';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import moment from 'moment';
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../../assets/animations/withoutAuthorization.json";
import AnimationErrorServer from "../../../assets/animations/working-server-animation.json";

export default function FormUser(){
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ showRoles, setShowRoles ] = useState(false);
    const [show, setShow] = useState(false);
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ allRoles, setAllRoles ] = useState([]);
    const [ rolesSelected, setRolesSelected ] = useState([]);
    const [ edadFinaly, setEdadFinaly ] = useState(null);
    const [ goRedirect, setGoRedirect ] = useState(false);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    const [ errorServer, setErrorServer ] = useState(false);

    useEffect(() => {
      (async () => {
          const response = await getRolesApi(token);
          console.log(response);
          if(response.status === 403){
              setAuthorization(false);
          }else if(response.status === 500){
              setErrorServer(true);
          }else{
              setAllRoles(response);
              setRolesApi(response);;
          };
      })();
  }, []);

  /*  useEffect(() => {
      getRolesApi().then(response => {
        if(response.status === 403){
          setAuthorization(false);
        }else if(response.status === 500){
          setErrorServer(true);
        }else{
          setAllRoles(response);
          setRolesApi(response);
        }    
      })
    }, []); */

    let fechaNacimiento;
    let dateCurrent = moment();

    const handleCheck = (e, item) => {
      let role = {
          idRol: item.idRol,
          nombre: item.nombre
      }
      if(e.target.checked){
        setRolesSelected([...rolesSelected, role]);
      }else{
          const result = rolesSelected.filter((priv) => {
              return priv.idRol != item.idRol && priv.nombre != item.nombre;
          });
          setRolesSelected(result);
      }
  }

    return(
      <>
            {authorization || (
                <>
                    <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                        <Lottie height={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
            )}

            {errorServer && (
                <>
                    <h1 style={{"textAlign": "center"}}>Error en el servidor, intentelo más tarde</h1>
                        <Lottie height={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationErrorServer, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
            )}
            
      {!errorServer && authorization && allRoles && (
        <>
        <Container>
            <Row>
            {goRedirect && (
                   <Redirect to={`/admin/users`} />
              )}
                <Col sm={1}></Col>
                <Col sm={10} style={{backgroundColor: '#f1f1f1', borderRadius: '5px'}} > 
                <Row>
                <Col sm={1}></Col>
                <Col sm={10} className="justify-aling-content-center">
                <Formik
                initialValues={{ 
                    documento: '',
                    tipoDocumento: '', 
                    nombre: '', 
                    sexo: '', 
                    fechaNacimiento: '',
                    celular: '',
                    edad: '',
                    meses: '',
                    municipio: '',
                    direccion: '',
                    correoElectronico: '',
                    clave: '',
                    confirmClave: '',
                    edadAños: ''
                }} 
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
                  
                  let docuemnt = toString(valores.documento);
                  if(valores.documento.length < 8 || valores.documento.length > 15){
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

                  const dateCurrently = moment();
                  if(!valores.fechaNacimiento){
                    errores.fechaNacimiento = 'Asegurese de selecionar una fecha';
                    setShowRoles(false);
                  }else{
                    let nacimiento = moment(valores.fechaNacimiento);
                    if(nacimiento.diff(dateCurrently, 'hours') > 0){
                        errores.fechaNacimiento = 'Seleccione una fecha valida';
                        setShowRoles(false);
                    }else{
                      let mesesEdad = dateCurrently.diff(nacimiento, 'months');
                      setEdadFinaly(mesesEdad);
                      let rolesUpdated = [];
                      if(mesesEdad > 83){
                        rolesUpdated = allRoles.filter(rol => rol.nombre !== 'INFANTE');
                        setRolesApi(rolesUpdated);
                      }else{
                        rolesUpdated = allRoles.filter(rol => rol.nombre === 'INFANTE');
                        setRolesApi(rolesUpdated);
                      }
                      setShowRoles(true);
                    }
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
                    errores.direccion = 'No se permiten campos vacíos'
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

                  if (valores.confirmClave != valores.clave){
                    errores.confirmClave = 'la clave no coincide'
                  }

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  setShowSpinner(true);
                  if(rolesSelected.length === 0){
                    setShowSpinner(false);
                    swal("¡Opss, No has seleccionado roles!, Debes seleccionar al menos un  rol para el usuario", {
                      icon: "error",
                    });
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                    }, 3000);
                }else{
                  const dateCurrently = new Date();

                    if(valores.meses !== 'meses'){
                      valores.edad = valores.edad * 12;
                    };

                    valores.token = token;
                    const data = {
                      documento: parseInt(valores.documento),
                      tipoDocumento: valores.tipoDocumento,
                      nombre: valores.nombre.toLowerCase(),
                      sexo: valores.sexo,
                      fechaNacimiento: valores.fechaNacimiento,
                      celular: valores.celular,
                      edad: edadFinaly,
                      municipio: valores.municipio,
                      direccion: valores.direccion,
                      correoElectronico: valores.correoElectronico,
                      clave: valores.clave
                    }
                    console.log(data);
                    
                    insertUserApi(data, token).then(response => {
                      setShowSpinner(false);
                    if(response === true){
                          let successs = false;
                          successs = rolesSelected.map((item, index) => {
                            return getAssignRolApi(item.idRol, valores.documento, valores.token).then(responseRol => {
                              console.log(responseRol);
                              if(responseRol === true){ 
                                return successs = true;
                              }else if (responseRol.status === 403){
                                setAuthorization(false);
                                return successs = false;
                              }
                            });
                          })
                          if(successs){
                            setShowSpinner(false);
                            swal("¡Excelente, registro exitoso!, El usuario fue almacenado correctamente", {
                              icon: "success",
                            }).then((value) => {
                              window.location.replace(`/admin/users`);
                            });
                            //setShow(true);
                          }else{
                            setShowSpinner(false);
                            swal("Opss! Ocurrió un error!", {
                              icon: "error",
                            }).then((value) => {
                              setGoRedirect(true);
                            });
                          //setShow(true);
                          }
                        }else if (response.status === 403){
                          setAuthorization(false);
                        }else{
                          swal("Opss! Ocurrió un error al almacenar el usuario!", {
                            icon: "error",
                          });
                            setShow(true);
                        }
                  });
                  }
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
                        <Form.Group as={Row} className="mb-3 mt-3">
                       <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Select size="xs" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.tipoDocumento && touched.tipoDocumento} isInvalid={!!errors.tipoDocumento && touched.tipoDocumento}
                            >
                            <option disabled selected>Selecciona el tipo de documento</option>
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

                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el documento" size="xs" id="documento" name="documento" 
                            value={values.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
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
                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="xs" id="nombre" name="nombre" 
                            value={values.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                            isValid={!errors.nombre && touched.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col md={6}>
                        <InputGroup hasValidation>
                        <Form.Select size="xs" name="sexo" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.sexo && touched.sexo} isInvalid={!!errors.sexo && touched.sexo}
                            >
                            <option disabled selected>Selecciona el sexo</option>
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
                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="date" placeholder="Fecha de nacimiento" size="xs" id="fechaNacimiento" name="fechaNacimiento" 
                            value={values.fechaNacimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                            isValid={!errors.fechaNacimiento && touched.fechaNacimiento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fechaNacimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí Teléfono" size="xs" id="celular" name="celular" 
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


                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Col md={6}>
                        <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la edad" size="xs" id="edad" name="edad" 
                               value={edadFinaly != null ? `${edadFinaly} meses` : values.edad} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                               isValid={!errors.edad && touched.edad} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el municipio" size="xs" id="municipio" name="municipio" 
                            value={values.municipio} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.municipio && touched.municipio}
                            isValid={!errors.municipio && touched.municipio}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.municipio}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí la dirección" size="xs" id="direccion" name="direccion" 
                            value={values.direccion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.direccion && touched.direccion}
                            isValid={!errors.direccion && touched.direccion}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.direccion}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="email" placeholder="Dígita aquí el Correo " size="xs" id="correoElectronico" name="correoElectronico" 
                            value={values.correoElectronico} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.correoElectronico && touched.correoElectronico}
                            isValid={!errors.correoElectronico && touched.correoElectronico}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.correoElectronico}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group> 

                      <Form.Group as={Row} className="mb-3">
                      <Col md={6}>
                        <InputGroup hasValidation>
                        <Form.Control size="xs" type="password" placeholder="Password" id="clave" name="clave" 
                        value={values.clave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.clave && touched.clave}
                        isValid={!errors.clave && touched.clave}
                        />
                        <Form.Control.Feedback type="invalid">
                                    {errors.clave}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <InputGroup hasValidation>
                        <Form.Control size="xs" type="password" placeholder="Password" id="confirmClave" name="confirmClave" 
                        value={values.confirmClave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.confirmClave && touched.confirmClave}
                        isValid={!errors.confirmClave && touched.confirmClave}
                        />
                        <Form.Control.Feedback type="invalid">
                                    {errors.confirmClave}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      </Form.Group>  

                      {showRoles && (
                      <fieldset className="mb-3 mt-4">
                      <center>
                        <h1 style={{fontSize: "22px", color: "#0084D2"}} className="mb-3 ">
                          Asignar roles al usuario </h1>
                              {rolesApi.map((item, index) => (
                                <Form.Check inline type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                              ))}
                      </center>
                      </fieldset>
                      )}



                    <div className="d-grid gap-2 mb-3 mt-4">
                      <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                      {showSpinner ? (
                          <>
                          <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                          {"  " + `  Cargando...`}  
                          </>
                      ):(
                          "Añadir usuario" 
                      )}
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
        </>
      )}
    </>
  )
}