import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { insertRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";

export default function AddRol(){
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);

    return(
        <Container>
            <h1 className="text-center">Formulario de Rol</h1>

            <Row>
                <Col sm={4}></Col>
                <Col sm={4}> 
                <Formik
                initialValues={{ name: '' }}
                validate={(valores) => {
                  let errores = {};
                  if(!valores.name){
                    errores.name = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.name)){
                    errores.name = 'Nombre incorrecto, solo puedes escribir letras';
                  }

                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    valores.token = token;
                    insertRolApi(valores,).then(response => {
                        if(response.status === 500 && response.message === "NO EXISTE UN ROL CON ESTE ID"){
                            setTextFormSend({
                                variant: "success", heading: "¡Excelente, registro exitoso!",
                                message: `El rol ${valores.name} fue almacenado correctamente`
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
                        <Form.Group className="mb-3">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre" size="lg" id="name" name="name" 
                            value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
                            isValid={!errors.name && touched.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Añadir
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 


                      {show && (
                        <Alert variant={textFormSend.variant} onClose={() => setShow(false)} dismissible className="mt-5">
                            <Alert.Heading>{textFormSend.heading}</Alert.Heading>
                            <p style={{"color": textFormSend.variant === "success" ? "#2DA45C" : "#A42D55", "font-size": 18}}>
                            {textFormSend.message}
                            </p>
                        </Alert>
                    )}
                </Col>
                <Col sm={4}></Col>
            </Row>
        </Container>
    )
}