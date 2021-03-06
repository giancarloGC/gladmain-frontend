import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { updateUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import { getRolesApi, getAssignRolApi, consultarRolesUsuarioApi, getRemoveRolApi } from "../../../api/rol";
import "./FormEdit.scss";
import swal from 'sweetalert';
import moment from 'moment';
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../../assets/animations/withoutAuthorization.json";
import useAuth from '../../../hooks/useAuth'; 

export default function FormEdit(props){   
    const { usuario } = props;
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ userLoaded, setUserLoaded ] = useState(usuario);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ rolesRegistred, setRolesRegistred ] = useState([]);
    const [ rolesSelected, setRolesSelected ] = useState([]);
    const [ edadFinaly, setEdadFinaly ] = useState(null);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const { user } = useAuth();

    //privilegios
    const validatePrivilegio = (privilegio) => {
      return user.authorities.filter(priv => priv === privilegio);
  }
  
  const [ loaded, setLoaded] = useState(false);

    var loading = true;
console.log(usuario);
    useEffect(() => {
      (async () => {
            const responseRoles = await getRolesApi();
            const responseRolesSelected = await consultarRolesUsuarioApi(usuario.documento, token);
              setRolesApi(responseRoles);
              setUserLoaded(usuario);
              setComponentLoaded(true); 
            
              setRolesSelected(responseRolesSelected);
              setRolesRegistred(responseRolesSelected);
              setLoaded(true);
      })();
    }, []);

    let fechaNacimiento;
    let dateCurrent = moment();

    const handleCheck = (e, item) => {
      let role = {
          idRol: item.idRol,
          documento: usuario.documento
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
      const responseRemove = await getRemoveRolApi(item.idRol, usuario.documento, token);
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

      const responseRemove = await getAssignRolApi(item.idRol, usuario.documento, token);
          console.log(responseRemove);
          if(responseRemove === true){
            successs = true;
          }else{
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
      setShowSpinner(true);
      if(actualizationSuccess){
        setShowSpinner(false);
        swal("??Excelente, actualizaci??n exitosa!, El usuario fue actualizado correctamente", {
          icon: "success",
        })
        .then((value) => {
          window.location.replace(`/admin/users`);
        });
        setShow(true);
      }else{
        setShowSpinner(false);
        swal("Opss! Ocurri?? un error al actualizar el usuario!", {
          icon: "error",
        });
      setShow(true);
      }
    }

    if(validatePrivilegio("ACTUALIZAR_USUARIO").length === 0){
      return(
          <>
              <h1 style={{"textAlign": "center"}}>No tienes autorizaci??n</h1>
                  <Lottie height={500} width="65%"
                  options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
              />
          </>
      )
    }else{
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
                <Row>
                <Col sm={1}></Col>
                <Col sm={10} style={{backgroundColor: '#f1f1f1', borderRadius: '5px'}}> 
                <Row className="justify-content-center">
                <Col sm={11}>
                  <Formik
                  initialValues={usuario}
                  validate={(valores) => {
                    let errores = {};
                    if(!valores.nombre){
                      errores.nombre = 'No se permiten campos vac??os'
                    }else if(!/^[A-Za-z???????????????????????? ]+$/g.test(valores.nombre)){
                      errores.nombre = 'Nombre incorrecto, solo puedes escribir letras';
                    }
                    if(!valores.sexo){
                      errores.sexo = 'Asegurese de selecionar una opci??n';
                    }

                    const dateCurrently = moment();
                    if(!valores.fechaNacimiento){
                      errores.fechaNacimiento = 'Asegurese de selecionar una fecha';
                    }else{
                      let nacimiento = moment(valores.fechaNacimiento);
                      if(nacimiento.diff(dateCurrently, 'hours') > 0){
                          errores.fechaNacimiento = 'Seleccione una fecha valida';
                      }else{
                        let mesesEdad = dateCurrently.diff(nacimiento, 'months');
                        setEdadFinaly(mesesEdad);
                      }
                    }

                    if(!valores.celular){
                      errores.celular = 'Por favor, ingresa n??meros';
                    }else if(!/^([0-9])*$/.test(valores.celular)){
                      errores.celular = 'Tel??fono incorrecto, solo puedes escribir n??meros';
                    }  

                    if(!valores.municipio){
                      errores.municipio = 'No se permiten campos vac??os'
                    }else if(!/^[A-Za-z???????????????????????? ]+$/g.test(valores.municipio)){
                      errores.municipio = 'Municipio incorrecto, solo puedes escribir letras';
                    }

                    if(!valores.direccion){
                      errores.direccion = 'No se permiten campos vac??os'
                    }

                    if(!valores.correoElectronico){
                      errores.correoElectronico = 'Por favor, ingresa n??meros'
                    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valores.correoElectronico)){
                      errores.correoElectronico = 'Email incorrecto, intente con otro';
                    }

                    if (!valores.clave){
                      errores.clave = 'Por favor, ingresa una contrase??a'
                    }else if(valores.clave.length < 8){
                      errores.clave = 'La contrase??a debe tener un minimo de 8 caracteres'
                    }

                    return errores;
                  }}
                  onSubmit={(valores, {resetForm}) => {
                    setShowSpinner(true);
                    if(rolesSelected.length === 0){
                      setShowSpinner(false);
                      swal("??Opss, No has seleccionado funciones!, Debes seleccionar al menos una funci??n para el usuario", {
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

                        const data = {
                          documento: parseInt(valores.documento),
                          tipoDocumento: valores.tipoDocumento,
                          nombre: valores.nombre,
                          sexo: valores.sexo,
                          fechaNacimiento: valores.fechaNacimiento,
                          celular: parseInt(valores.celular),
                          edad: parseInt(edadFinaly),
                          municipio: valores.municipio,
                          direccion: valores.direccion,
                          correoElectronico: valores.correoElectronico,
                          clave: valores.clave,
                          token: token,
                          fechaIngresoPrograma: valores.fechaIngresoPrograma
                        }
                        updateUserApi(data).then(response => {
                          setShowSpinner(true);
                          if(response === true){
                            setShowSpinner(false);
                            updateRoles();
                          }else{
                            setShowSpinner(false);
                            swal("Opss! Ocurri?? un error!", {
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
                        <Col md={12}>
                          <InputGroup hasValidation>
                            <Form.Label column sm={5}>
                              <h1 style={{fontSize: "20px", color:"#0084d2"}} className="mt-2">Fecha inclusi??n</h1>
                            </Form.Label>
                            <Form.Control type="date" size="xs" id="fechaIngresoPrograma" name="fechaIngresoPrograma" placeholder="Fecha inclusi??n"
                              defaultValue={dateFormat(usuario.fechaIngresoPrograma)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaIngresoPrograma && touched.fechaIngresoPrograma}
                              isValid={!errors.fechaIngresoPrograma && touched.fechaIngresoPrograma}
                            />
                            <Form.Control.Feedback type="invalid">
                                  {errors.fechaIngresoPrograma}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      </Form.Group>


                          <Form.Group as={Row} className="mb-1 mt-3">
                          <Form.Label column sm="2">
                          <h5 style={{fontSize:'17px'}}>Tipo documento</h5></Form.Label>
                          <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Select size="xs" name="tipoDocumento" onChange={handleChange} onBlur={handleBlur}
                                  defaultValue={usuario.tipoDocumento} disabled
                              >
                              <option disabled>Selecciona el tipo de documento</option>
                              <option value="CC">C??dula de ciudadan??a</option>
                              <option value="RC">Registro civil</option>
                              <option value="TI">Tarjeta de identidad</option>
                              <option value="CE">C??dula de extranjer??a</option>
                              </Form.Select>
                          </InputGroup>
                          </Col>

                          <Form.Label column sm="2">
                          <h5 style={{fontSize:'17px'}}>N??mero documento</h5></Form.Label>
                          <Col sm="4">
                              <InputGroup hasValidation>
                              <Form.Control type="number" placeholder="D??gita aqu?? el documento" size="xs" id="documento" name="documento" 
                              defaultValue={usuario.documento} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                          </Col>
                          </Form.Group>

                          <Form.Group as={Row} className="mb-4">
                          <Form.Label column sm="2">
                          <h5 style={{fontSize:'17px'}}>Nombre</h5></Form.Label>
                          <Col sm="4">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="D??gita aqu?? el nombre" size="xs" id="nombre" name="nombre" 
                                defaultValue={usuario.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.nombre && touched.nombre}
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
                                    defaultValue={usuario.sexo} isValid={!errors.sexo && touched.sexo} isInvalid={!!errors.sexo && touched.sexo}
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
                                  defaultValue={dateFormat(usuario.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
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
                                <Form.Control type="number" placeholder="D??gita aqu?? Tel??fono" size="xs" id="celular" name="celular" 
                                defaultValue={usuario.celular} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.celular && touched.celular}
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
                                <Form.Control type="text" placeholder="edad" size="xs" id="edad" name="edad" 
                                value={edadFinaly ? `${edadFinaly} meses` : values.edad} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                                isValid={!errors.edad && touched.edad} disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.edad}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                          </Col>

                          <Form.Label column sm="2">
                          <h5 style={{fontSize:'17px'}}>Municipio</h5></Form.Label>
                          <Col sm="4">
                            <InputGroup hasValidation>
                                <Form.Select size="xs" id="municipio" name="municipio" defaultValue={usuario.municipio} 
                            onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.municipio && touched.municipio}
                            isValid={!errors.municipio && touched.municipio}
                            >
                                <option disabled>Selecciona el municipio</option>
                                <option value="C??cuta">C??cuta</option>                                
                                <option value="El Zulia">El Zulia</option>
                                <option value="Los Patios">Los Patios</option>
                                <option value="Puerto Santander">Puerto Santander</option>
                                <option value="San Cayetano">San Cayetano</option>
                                <option value="Villa del Rosario">Villa del Rosario</option>
                                <option value="El Tarra">El Tarra</option>
                                <option value="Sardinata">Sardinata</option>
                                <option value="Tib??">Tib??</option>
                                <option value="Arboledas">Arboledas</option>
                                <option value="Cucutilla">Cucutilla</option>
                                <option value="Gramalote">Gramalote</option>
                                <option value="Lourdes">Lourdes</option>
                                <option value="Salazar de las Palmas">Salazar de las Palmas</option>
                                <option value="Santiago">Santiago</option>
                                <option value="Villa Caro">Villa Caro</option>
                                <option value="??brego">??brego</option>
                                <option value="C??chira">C??chira</option>
                                <option value="Convenci??n">Convenci??n</option>
                                <option value="El Carm??n">El Carm??n</option>
                                <option value="Hacar??">Hacar??</option>
                                <option value="La Esperanza">La Esperanza</option>
                                <option value="La Playa de Bel??n">La Playa de Bel??n</option>
                                <option value="Oca??a">Oca??a</option>
                                <option value="San Calixto">San Calixto</option>
                                <option value="Teorama">Teorama</option>
                                <option value="C??cota">C??cota</option>
                                <option value="Chitag??">Chitag??</option>
                                <option value="Mutiscua">Mutiscua</option>
                                <option value="Pamplona">Pamplona</option>
                                <option value="Pamplonita">Pamplonita</option>
                                <option value="Santo Domingo de Silos">Santo Domingo de Silos</option>
                                <option value="Bochalema">Bochalema</option>
                                <option value="Chin??cota">Chin??cota</option>
                                <option value="Durania">Durania</option>
                                <option value="Herr??n">Herr??n</option>
                                <option value="Labateca">Labateca</option>
                                <option value="Ragonvalia">Ragonvalia</option>
                                <option value="Toledo">Toledo</option>
                            </Form.Select>
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
                                <Form.Control type="text" placeholder="D??gita aqu?? la direcci??n" size="xs" id="direccion" name="direccion" 
                                defaultValue={usuario.direccion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.direccion && touched.direccion}
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
                                <Form.Control type="email" placeholder="D??gita aqu?? el Correo " size="xs" id="correoElectronico" name="correoElectronico" 
                                defaultValue={usuario.correoElectronico} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.correoElectronico && touched.correoElectronico}
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
                        <Form.Label column sm="2"><h5 style={{fontSize:'17px'}}>Contrase??a</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                            <Form.Control size="xs" type="password" placeholder="Password" id="clave" name="clave" 
                            defaultValue={usuario.clave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.clave && touched.clave}
                            isValid={!errors.clave && touched.clave}
                            />
                            <Form.Control.Feedback type="invalid">
                                        {errors.clave}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Form.Label column sm="2"><h5 style={{fontSize:'17px'}}>Confirmar Contrase??a</h5></Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                            <Form.Control size="xs" type="password" placeholder="Password" id="clave" name="clave" 
                            defaultValue={usuario.clave} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.clave && touched.clave}
                            isValid={!errors.clave && touched.clave}
                            />
                            <Form.Control.Feedback type="invalid">
                                        {errors.clave}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        </Form.Group>

                          <fieldset>
                              <legend>Asignar roles al usuario</legend>
                                  {rolesApi.map((item, index) => (
                                      checkRole(item)
                                  ))}
                          </fieldset>

                          <div className="d-grid gap-2">
                          <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                              {showSpinner ? (
                                <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                                {"  " + `  Cargando...`}  
                                </>
                                ):(
                                "Guardar Cambios" 
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
              )}
          </Container>
      )
  }
}