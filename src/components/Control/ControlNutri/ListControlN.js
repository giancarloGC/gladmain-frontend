//import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jsPDF from 'jspdf'

export default function npmListControlN(){
    /* const [ vacApi, setVacApi ] = useState([]);
     const [ loading, setLoading ] = useState(true);
     useEffect(() => {
         (async () => {
             const response = await getContVaccApi();
             setLoading(false);
             setRolesApi(response);
         })();
     }, []);*/

     const pdfGenerate = () => {
        var doc=new jsPDF('landscape','px', 'a4', 'false');
        doc.save('a.pdf')
     }
 
     return(
         <Container>
            <Row className="mb-3 mt-5">
                 <Col md={3}>
                 </Col>
                 <Col md={6}>
                    <InputGroup hasValidation>
                        <Form.Control type="search" placeholder="Buscar Usuario" size="lg" id="busqueda" name="busqueda" />
                        <Button class="btn btn-outline-success" type="submit">Buscar</Button>
                    </InputGroup>
                 </Col>
                 <Col md={3}>
                 </Col>
             </Row>

             <ListGroup >
                <ListGroup.Item className="shadow border mt-2 mb-3">
                <Container>
                <Row >
                    <Col md={2} className="row justify-content-center align-self-center">
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
                    <Col md={2} className="row justify-content-center align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Estado Nutricional</b> <br/></p>
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
                             <a className="btn btn-secondary text-center mx-0" >
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <FontAwesomeIcon icon={faPrint}
                                />
                            </svg>
                            </a > 
                            <Button onClick={() => pdfGenerate()}>Generar PDF</Button>
                         </p>                     
                     </Col>
                 </Row>
                 </Container>
             </ListGroup.Item>
             </ListGroup>
         </Container>
     )
 }