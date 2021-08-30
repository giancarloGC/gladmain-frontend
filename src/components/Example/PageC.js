import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { insertUserApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import { getRolesApi, getAssignRolApi } from "../../api/rol";

export default function PageC(){
    return(
        <Container>
            <Row>
                <Col sm={4}></Col>
                <Col sm={4}> 
                <Formik
                initialValues={{ 
                    campo: '',
                }}
                validate={(valores) => {
                  let errores = {};
                  if(!valores.campo){
                    errores.campo = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.campo)){
                    errores.campo = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                

                  return errores;
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

                        <Form.Group className="mb-3">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí tu ejenmpllo" size="lg" id="campo" name="campo" 
                            value={values.campo} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.campo && touched.campo}
                            isValid={!errors.campo && touched.campo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.campo}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>   

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Añadir usuario
                            </Button>
                        </div>

                    </Form>
                            );
                        }}
                      </Formik> 

                </Col>
                <Col sm={4}></Col>
            </Row>
        </Container>
    )
}