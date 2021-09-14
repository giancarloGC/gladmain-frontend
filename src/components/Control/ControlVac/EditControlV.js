import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import swal from 'sweetalert';
import { updateContVaccApi } from "../../../api/vaccination";

export default function EditControlV(props){
    const { userControl, infoControl, listVac } = props;
    const { user } = AuthContext();
    const [ userApi, setUserByIdApi ] = useState({});
    const token = localStorage.getItem(TOKEN);

    const [show, setShow] = useState(false);
    const [ textFormSend, setTextFormSend ] = useState({});
    const [ vaccinesSelected, setVaccinesSelected ] = useState([]);
  
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

  const checkVac = (item) => {
    const result = infoControl.vacunasRegistradas.filter(vac => item.nombre === vac.nombre);
    if(result.length > 0){
        return <Form.Check type="checkbox" label={item.nombre} key={item.id} defaultChecked={true} onChange={(e) => handleCheck(e, item)}/>;
    }else{
        return <Form.Check type="checkbox" label={item.nombre} key={item.id} defaultChecked={false} onChange={(e) => handleCheck(e, item)}/>;
    }
  }

  return(
    <Container>
        <Row style={{backgroundColor: '#f1f1f1'}} >
          <Col sm={2}> </Col> 
            <Col sm={8} >

            <Formik
            initialValues={userControl}
            initialValues={{ 
                nombreVacuna: '',
                fechaAplicacion: '',
                dosis: '',
                edadGestacional:'',
                vigente:'',
            }}
            
            onSubmit={(valores, {resetForm}) => {
                var edadGestacional = null;
                resetForm();
                valores.token = token;
                valores.vacunas = vaccinesSelected;

                const formData = {
                  id: infoControl.id,
                  idUsuario: userControl.documento,
                  nombreVacuna: valores.nombreVacuna,
                  fechaAplicacion: valores.fechaAplicacion,
                  dosis: 1,
                  edadGestacional: null,
                  vigente: true,
              }
              console.log(infoControl.id);
              console.log(formData);
              valores.token = token;
                /*if ((valores.vacunas).length === 0) {
                  swal("Opss! Ocurrió un error!, Recuerda seleccionar las vacunas que se aplicó el usuario", {
                          icon: "error",
                  });
                setShow(true);
              }else{*/
                updateContVaccApi(formData, token).then(response => {
                  if(response === true && (valores.vacunas).length!=0){
                    swal("¡Excelente, registro exitoso!, El control de vacunas fue acualizado correctamente", {
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
              //}
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
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha nacimiento</Form.Label>
                        <Col sm="8">
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
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Edad</Form.Label>
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
                        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha Aplicacion</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaAplicacion" name="fechaAplicacion" 
                                 defaultValue={dateFormat(infoControl.fechaAplicacion)}onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaAplicacion && touched.fechaAplicacion}
                                 isValid={!errors.fechaAplicacion && touched.fechaAplicacion}
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.fechaAplicacion}
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
                                  checkVac(item)             
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
                <Col sm={2}></Col>
            </Row>
        </Container>
    )

}
