import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { insertUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import { getRolesApi, getAssignRolApi } from "../../../api/rol";

export default function FormUser(){
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ rolesSelected, setRolesSelected ] = useState([]);

    useEffect(() => {
      getRolesApi().then(response => {
        setRolesApi(response);
      })
    }, []);

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
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}}>
                <Col sm={2}></Col>
                <Col sm={8} background="background-color:#A42D55"> 
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
                  if(valores.documento.length < 0 || valores.documento.length > 15){
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

                  if(!valores.meses){
                    errores.meses = 'Asegurese de selecionar una opción';
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

                  if (valores.confirmClave != valores.clave){
                    errores.confirmClave = 'la clave no coincide'
                  }

                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                  if(rolesSelected.length === 0){
                    setTextFormSend({
                        variant: "danger", heading: "¡Opss, No has seleccionado roles!",
                        message: `Debes seleccionar al menos un  rol para el usuario`
                    });
                    setShow(true);
                    setTimeout(() => {
                        setShow(false);
                    }, 3000);
                }else{
                  const dateCurrently = new Date();
                  console.log(dateCurrently);
                    console.log(valores);
                    if(valores.meses !== 'meses'){
                      valores.edad = valores.meses / 12;
                    };
                    console.log(valores);

                    valores.token = token;
                    const data = {
                      documento: parseInt(valores.documento),
                      tipoDocumento: valores.tipoDocumento,
                      nombre: valores.nombre,
                      sexo: valores.sexo,
                      fechaNacimiento: valores.fechaNacimiento,
                      celular: valores.celular,
                      edad: valores.edad,
                      municipio: valores.municipio,
                      direccion: valores.direccion,
                      correoElectronico: valores.correoElectronico,
                      clave: valores.clave,
                      token: token
                    }
                
                    insertUserApi(data).then(response => {
                      if(response === true){
                          let successs = false;
                          successs = rolesSelected.map((item, index) => {
                            return getAssignRolApi(item.idRol, valores.documento, valores.token).then(responseRol => {
                              console.log(responseRol);
                              if(responseRol === true){ 
                                return successs = true;
                              }else{
                                return successs = false;
                              }
                            });
                          })
                          if(successs){
                            console.log("entro");
                            setTextFormSend({
                              variant: "success", heading: "¡Excelente, registro exitoso!",
                              message: `El usuario ${valores.name} fue almacenado correctamente`
                            });
                            setShow(true);
                          }else{
                            console.log("no entro");
                            setTextFormSend({
                              variant: "danger", heading: "¡Opss, ocurrió un error!",
                              message: "Revisaremos lo ocurrido, inténtalo nuevamente"
                          });
                          setShow(true);
                          }
                        }else{
                            setTextFormSend({
                                variant: "danger", heading: "¡Opss, ocurrió un error!",
                                message: "Revisaremos lo ocurrido, inténtalo nuevamente"
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
                        <Form.Group as={Row} className="mb-3 mt-5">
                       <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Select size="lg" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
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
                            <Form.Control type="text" placeholder="Dígita aquí el documento" size="lg" id="documento" name="documento" 
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
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="nombre" name="nombre" 
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
                        <Form.Select size="lg" name="sexo" onChange={handleChange} onBlur={handleBlur}
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
                            <Form.Control type="date" placeholder="Fecha de nacimiento" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
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


                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Col md={2}>
                        <InputGroup hasValidation>
                            <Form.Control type="number" placeholder="edad " size="lg" id="edad" name="edad" 
                            value={values.edad} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                            isValid={!errors.edad && touched.edad}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.edad}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col md={4}>
                        <InputGroup hasValidation>
                        <Form.Select size="lg" name="meses" onChange={handleChange} onBlur={handleBlur}
                                    isValid={!errors.meses && touched.meses} isInvalid={!!errors.meses && touched.meses}
                            >
                            <option disabled selected>Seleccionar opción</option>
                            <option value="meses">meses</option>
                            <option value="años">años</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.meses}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Col>

                        <Col md={6}>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el municipio" size="lg" id="municipio" name="municipio" 
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
                            <Form.Control type="text" placeholder="Dígita aquí la dirección" size="lg" id="direccion" name="direccion" 
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
                            <Form.Control type="email" placeholder="Dígita aquí el Correo " size="lg" id="correoElectronico" name="correoElectronico" 
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
                        <Form.Control size="lg" type="password" placeholder="Password" id="clave" name="clave" 
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
                        <Form.Control size="lg" type="password" placeholder="Password" id="confirmClave" name="confirmClave" 
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

                      {/*<Form.Group as={Row} className="mb-3">
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
                              </Form.Group>*/}


                      <fieldset>
                            <legend>Asignar roles al usuario</legend>
                                {rolesApi.map((item, index) => (
                                        <Form.Check inline type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                    
                                ))}
                        </fieldset>

                        <div className="d-grid gap-2 mb-3 mt-4">
                            <Button variant="primary" type="submit" size="lg">
                                Añadir usuario
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
                <Col sm={2}></Col>
            </Row>
        </Container>
    )
}