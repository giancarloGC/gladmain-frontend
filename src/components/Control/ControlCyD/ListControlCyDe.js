//import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, ErrorMessage } from "formik";

export default function ListControlCyDe(){
    /* const [ vacApi, setVacApi ] = useState([]);
     const [ loading, setLoading ] = useState(true);
     useEffect(() => {
         (async () => {
             const response = await getContVaccApi();
             setLoading(false);
             setRolesApi(response);
         })();
     }, []);*/

     const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
      }
 
     return(
         <Container>
            <Row>
                <Col sm={4}></Col>
                <Col sm={4}> 
                <Formik
                initialValues={{ 
                    ultimoControl: '',
                    proximoControl: '',
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

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha ultimo control</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="ultimoControl" name="ultimoControl" 
                               /* defaultValue={dateFormat(user.ultimoControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.ultimoControl && touched.ultimoControl}
                                isValid={!errors.ultimoControl && touched.ultimoControl}*/
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.ultimoControl}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 

                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha proximo control</Form.Label>
                        <Col sm="8">
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="proximoControl" name="proximoControl" 
                                /*defaultValue={dateFormat(user.proximoControl)} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.proximoControl && touched.proximoControl}
                                isValid={!errors.proximoControl && touched.proximoControl}*/
                              />
                              <Form.Control.Feedback type="invalid">
                                  {errors.proximoControl}
                              </Form.Control.Feedback>
                              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                        </Form.Group> 
                        


                        </Form>
                            );
                        }}
                      </Formik> 

                </Col>
                <Col sm={4}></Col>
            </Row>



             <ListGroup >
                <ListGroup.Item className="shadow border mt-2 mb-3">
                <Container>
                <Row >
                    <Col md={3} className="row justify-content-center align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Fecha </b> <br/></p>
                    </Col>
                    <Col md={2} className="row justify-content-center align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Peso </b> <br/></p>
                    </Col>
                    <Col md={2} className="row justify-content-center align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Talla </b> <br/></p>
                    </Col>
                    <Col md={2} className="row justify-content-center align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>IMC</b> <br/></p>
                    </Col>
                    <Col md={3} className="align-self-center justify-content-around">
                         <p style={{"color": "#2D61A4", "font-size": 27}}><b> Acciones </b> <br/>
                             <a href="#" className="btn btn-primary">
                                 <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                     <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                 </svg>
                             </a>
                             <a className="btn btn-warning text-center mx-3">
                                 <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                     <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                 </svg>
                             </a > 
                             <a className="btn btn-secondary text-center mx-0">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <FontAwesomeIcon icon={faPrint}
                                />
                            </svg>
                            </a > 
                         </p>                     
                     </Col>
                 </Row>
                 </Container>
             </ListGroup.Item>
             </ListGroup>
         </Container>
     )
 }