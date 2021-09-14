import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { updateUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import { getRolesApi, getAssignRolApi, consultarRolesUsuarioApi, getRemoveRolApi } from "../../../api/rol";
import "./FormEdit.scss";
import swal from 'sweetalert';

export default function FormEdit(props){   
    const { user } = props;
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ userLoaded, setUserLoaded ] = useState(user);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ rolesRegistred, setRolesRegistred ] = useState([]);
    const [ rolesSelected, setRolesSelected ] = useState([]);
  
  const [ loaded, setLoaded] = useState(false);
  console.log(user);

    var loading = true;

    useEffect(() => {
      (async () => {
        const responseRoles = await getRolesApi();
        const responseRolesSelected = await consultarRolesUsuarioApi(user.documento, token);
          setRolesApi(responseRoles);
          setUserLoaded(user);
          setComponentLoaded(true); 
        
          setRolesSelected(responseRolesSelected);
          setRolesRegistred(responseRolesSelected);
          setLoaded(true);
      })();
    }, []);

    const handleCheck = (e, item) => {
      let role = {
          idRol: item.idRol,
          documento: user.documento
      }
      if(e.target.checked){
        setRolesSelected([...rolesSelected, role]);
      }else{
          const result = rolesSelected.filter((priv) => {
              return priv.idRol != item.idRol;
          });
          setRolesSelected(result);
      }
  }

    const dateFormat = (date) => {
      if(date){
      let dateFormated = date.split('T');
      return dateFormated[0];
      }
    }
    
    const checkRole = (item) => {
      const result = rolesSelected.filter(role => role.idRol === item.idRol);
      let checked = false;
      if(result.length > 0){
        return    <Form.Check inline type="checkbox" label={item.nombre} defaultChecked={true} onChange={(e) => handleCheck(e, item)}/>
      }else{
        return    <Form.Check inline type="checkbox" label={item.nombre} defaultChecked={false} onChange={(e) => handleCheck(e, item)}/>
      }
  }

    const removeRoles = async (item) => {
      let successs = false;
      const responseRemove = await getRemoveRolApi(item.idRol, user.documento, token);
          console.log(responseRemove);
          if(responseRemove === true){
            console.log("Si entro");
            successs = true;
          }else{
            console.log("pailenchus");
            successs = false;
          }

    
      return successs;
    }


    const asignRoles = async (item) => {
      let successs = false;

      const responseRemove = await getAssignRolApi(item.idRol, user.documento, token);
          console.log(responseRemove);
          if(responseRemove === true){
            console.log("Si entro");
            successs = true;
          }else{
            console.log("pauilas");
            successs = false;
          }     
      return successs;
    }    

    const updateRoles = async () => {
      let actualizationSuccess = false;
      actualizationSuccess = await rolesRegistred.map((item, index) => {
        removeRoles(item);
      });


      actualizationSuccess = await rolesSelected.map((item, index) => {
        asignRoles(item);
      });

      await resultUpdate(actualizationSuccess);
    }

    const resultUpdate = async (actualizationSuccess) => {

      if(actualizationSuccess){
        console.log("entro");
        swal("¡Excelente, actualización exitosa!, El usuario fue actualizado correctamente", {
          icon: "success",
        });
        setShow(true);
      }else{
        console.log("no entro");
        swal("Opss! Ocurrió un error al actualizar el usuario!", {
          icon: "error",
        });
      setShow(true);
      }
    }

    return(
        <Container>
            {!loaded ? (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )
            :
            (
            <Row style={{backgroundColor: '#f1f1f1'}}>
                <Col sm={1}></Col>
                <Col sm={10}> 
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

                  if(!valores.edad){
                    errores.edad = 'Por favor, ingresa números';
                  }else if(!/^([0-9])*$/.test(valores.edad)){
                    errores.edad = 'Edad incorrecta, solo puedes escribir números';
                  }else if(valores.edad <= 0 || valores.edad > 90){
                    errores.edad = 'Edad invalida, intente con otra';
                  }       

                  if(!valores.municipio){
                    errores.municipio = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.municipio)){
                    errores.municipio = 'Municipio incorrecto, solo puedes escribir letras';
                  }

                  if(!valores.direccion){
                    errores.direccion = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.direccion)){
                    errores.direccion = 'Municipio incorrecto, solo puedes escribir letras';
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
                  if(rolesSelected.length === 0){
                    swal("¡Opss, No has seleccionado funciones!, Debes seleccionar al menos una función para el usuario", {
                      icon: "error",
                    });
                        setShow(true);
                        setTimeout(() => {
                            setShow(false);
                        }, 3000);
                    }else{
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
                          updateRoles();
                        }else{
                          swal("Opss! Ocurrió un error!", {
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
                        <Form.Group as={Row} className="mb-1 mt-3">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Tipo documento</Form.Label>
                        <Col sm="4">
                        <InputGroup hasValidation>
                            <Form.Select size="lg" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                defaultValue={user.tipoDocumento} isValid={!errors.tipoDocumento && touched.tipoDocumento} isInvalid={!!errors.tipoDocumento && touched.tipoDocumento}
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

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Número documento</Form.Label>
                        <Col sm="4">
                            <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="Dígita aquí el documento" size="lg" id="documento" name="documento" 
                            defaultValue={user.documento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.documento && touched.documento}
                            isValid={!errors.documento && touched.documento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.documento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Nombre</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="nombre" name="nombre" 
                              defaultValue={user.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
                              isValid={!errors.nombre && touched.nombre}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.nombre}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Sexo</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                          <Form.Select size="lg" name="sexo" onChange={handleChange} onBlur={handleBlur}
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
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
                                defaultValue={dateFormat(user.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                isValid={!errors.fechaNacimiento && touched.fechaNacimiento}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Celular</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="Dígita aquí Teléfono" size="lg" id="celular" name="celular" 
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
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Edad en meses</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="edad" size="lg" id="edad" name="edad" 
                              defaultValue={user.edad} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                              isValid={!errors.edad && touched.edad}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Municipio</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí el municipio" size="lg" id="municipio" name="municipio" 
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
                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Direccion</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la dirección" size="lg" id="direccion" name="direccion" 
                              defaultValue={user.direccion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.direccion && touched.direccion}
                              isValid={!errors.direccion && touched.direccion}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.direccion}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Correo electronico</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="email" placeholder="Dígita aquí el Correo " size="lg" id="correoElectronico" name="correoElectronico" 
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
                      <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Contraseña</Form.Label>
                      <Col sm="4">
                        <InputGroup hasValidation>
                          <Form.Control size="lg" type="password" placeholder="Password" id="clave" name="clave" 
                          defaultValue={user.clave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.clave && touched.clave}
                          isValid={!errors.clave && touched.clave}
                          />
                          <Form.Control.Feedback type="invalid">
                                      {errors.clave}
                                  </Form.Control.Feedback>
                                  <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>

                      <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Confirmar Contraseña</Form.Label>
                      <Col sm="4">
                        <InputGroup hasValidation>
                          <Form.Control size="lg" type="password" placeholder="Password" id="clave" name="clave" 
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

                      {/*}
                      <Form.Group as={Row} className="mb-4">
                      <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Rol</Form.Label>
                      <Col sm="10">
                        <InputGroup hasValidation>
                            <Form.Select size="lg" name="role" onChange={handleChange} onBlur={handleBlur}
                                  isValid={!errors.role && touched.role} isInvalid={!!errors.role && touched.role}
                            >
                            <option disabled selected>Selecciona un rol</option>
                            {rolesApi.length > 0 && (
                              rolesApi.map((data, index) => (
                                <option key={index} value={data.idRol}>{data.nombre}</option>
                              ))
                              )}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                                        {errors.role}
                                      </Form.Control.Feedback>
                          <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                              </Form.Group>*/}

                        <fieldset>
                            <legend>Asignar roles al usuario</legend>
                                {rolesApi.map((item, index) => (
                                    checkRole(item)
                                ))}
                        </fieldset>

                        <div className="d-grid gap-2">
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
                <Col sm={1}></Col>
            </Row>
            )}
        </Container>
    )
}