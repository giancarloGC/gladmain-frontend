import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import moment from 'moment';
import swal from 'sweetalert';
import { insertContVaccApi } from "../../../api/vaccination";

export default function AddControlV(props){
  const { userControl, listVac } = props;
  const { user } = AuthContext();
  const token = localStorage.getItem(TOKEN);
  const [ userApi, setUserByIdApi ] = useState({});
  const [show, setShow] = useState(false);
  const [ textFormSend, setTextFormSend ] = useState({});
  const [ vaccinesSelected, setVaccinesSelected ] = useState([]);

  let dateFechaNaci = moment(userControl.fechaNacimiento);
    let dateCurrent = moment();
    userControl.edad = dateCurrent.diff(dateFechaNaci, 'months');
  
  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');

    return dateFormated[0];
    }
  }
  
  const handleCheck = (e, item) => {
    let vaccines = {
        id: item.id,
        meses: item.meses,
        nombre: item.nombre,
    }
    if(e.target.checked){
      setVaccinesSelected([...vaccinesSelected, vaccines]);
    }else{
        const result = vaccinesSelected.filter((vacc) => {
            return vacc.id != item.id && vacc.meses != item.meses && vacc.nombre != item.nombre;
        });
        setVaccinesSelected(result);
    }
}


    return(
        <Container>
            <Row style={{backgroundColor: '#f1f1f1'}} >
              <Col sm={1}> </Col> 
                <Col sm={10} >

                <Formik
                initialValues={userControl}
                initialValues={{ 
                    fechaNacimiento: '',
                    edadVac: '',
                    edad: '',
                    fechaAplicacion: '',
                    vacunas:'',
                }}
                
                validate={(valores) => {
                  let errores = {};

                  if(valores.edadVac){
                    errores.edadVac = 'Asegurese de selecionar una opción';
                  }else if(valores.edadVac === "2_M"){
                    userControl.edad = 2;
                  }else if(valores.edadVac === "4_M"){
                    userControl.edad = 4;
                  }else if(valores.edadVac === "6_M"){
                    userControl.edad = 6;
                  }else if(valores.edadVac === "7_M"){
                    userControl.edad = 7;
                  }else if(!valores.edadVac === "12_M"){
                    listVac.meses = 12
                  }else if(!valores.edadVac === "18_M"){
                    listVac.meses = 18
                  }else if(!valores.edadVac === "60_M"){
                    listVac.meses = 60
                  }

                  const dateCurrently2 = new Date();
                  if(!valores.fechaAplicacion){
                    errores.fechaAplicacion = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaAplicacion){
                    errores.fechaAplicacion = 'Seleccione una fecha valida';
                  }

                  return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                  var edadGestacional = null;
                  resetForm();
                    valores.token = token;
                  valores.vacunas = vaccinesSelected;
                  const formData = {
                    idUsuario: userControl.documento,
                    fechaAplicacion: valores.fechaAplicacion,
                    dosis: 1,
                    edadGestacional: null,
                    vigente: true,
                    vacunas: valores.vacunas,
                }
                

                console.log(formData);
                  valores.token = token;
                    if ((valores.vacunas).length === 0) {
                      swal("¡Opss, ocurrió un error!, Recuerda seleccionar las vacunas que se aplicó el usuario", {
                        icon: "error",
                    });
                    setShow(true);
                  }else{
                    insertContVaccApi(formData, token).then(response => {
                      if(response === true && (valores.vacunas).length!=0){
                        swal("¡Excelente, registro exitoso!, El control de vacunas fue almacenado correctamente", {
                          icon: "success",
                      });
                          setShow(true);
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
                }, 6000);
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
                        <Form.Group as={Row} className="mb-3 mt-3">
                        <Form.Label column sm="3" style={{"fontSize": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaNacimiento" name="fechaNacimiento" 
                                 defaultValue={dateFormat(userControl.fechaNacimiento)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaNacimiento && touched.fechaNacimiento}
                                 isValid={!errors.fechaNacimiento && touched.fechaNacimiento} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaNacimiento}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        
                        <Col sm="1"></Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Edad Usuario</Form.Label>
                        <Col sm="2">
                        <InputGroup hasValidation>
                              <Form.Control type="text" placeholder="Dígita aquí la edad" size="lg" id="edad" name="edad" 
                               value={`${userControl.edad} meses`} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.edad && touched.edad}
                               isValid={!errors.edad && touched.edad} disabled
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.edad}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 
                       
                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3" style={{"fontSize": "12px !important"}}>Fecha Aplicacion</Form.Label>
                        <Col sm="4">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaAplicacion" name="fechaAplicacion" 
                                 value={values.fechaAplicacion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaAplicacion && touched.fechaAplicacion}
                                 isValid={!errors.fechaAplicacion && touched.fechaAplicacion}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaAplicacion}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        
                        <Col sm="1"></Col>

                        <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Edad Vacuna</Form.Label>
                        <Col sm="2">
                        <InputGroup hasValidation>
                        <Form.Select size="lg" name="Edad Vacuna" onChange={handleChange} onBlur={handleBlur}
                                defaultValue={values.edadVac} isValid={!errors.edadVac && touched.edadVac} isInvalid={!!errors.edadVac && touched.edadVac}
                            >
                            <option disabled>Selecciona la edad</option>
                            <option value="2_M">2 Meses</option>
                            {userControl.edad >= 4 && (<option value="4_M">4 Meses</option>)}
                            {userControl.edad >= 6 && (<option value="6_M">6 Meses</option>)}
                            {userControl.edad >= 7 && (<option value="7_M">7 Meses</option>)}
                            {userControl.edad >= 12 && (<option value="12_M">12 Meses</option>)}
                            {userControl.edad >= 18 && (<option value="18_M">18 Meses</option>)}
                            {userControl.edad >= 60 && (<option value="60_M">5 años</option>)}

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                        {errors.edadVac}
                                        </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                        </Form.Group>
                       
                        <Form.Group as={Row} className="mb-3">
                          {listVac.length === 0 ? (
                              <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>No hay vacunas para esta edad</Form.Label>
                          ) 
                        :
                          (
                            <>
                            <Form.Label column sm="4" style={{"fontSize": "12px !important"}} className="justify-content-left">Vacunas:</Form.Label>
                            <InputGroup className="mb-3">
                              {listVac.map((item, index) => (
                              <Form.Check type="checkbox" label={item.nombre} key={item.id} onChange={(e) => handleCheck(e, item)}/>
                              ))}
                              </InputGroup>
                            </>
                          )}

                        </Form.Group> 

                        <div className="d-grid gap-2 mb-4">
                            <Button variant="primary" type="submit" size="lg">
                                Añadir Control
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