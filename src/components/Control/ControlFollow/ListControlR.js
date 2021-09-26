import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import { faPrint, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, ErrorMessage } from "formik";
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';

export default function ListControlR(props){
    const {listControls, idSeguimiento} = props;
    console.log(listControls); 
    
    let remisionesBySeguimiento = listControls.filter(remission => remission.idSeguimiento === parseInt(idSeguimiento));
    console.log(remisionesBySeguimiento);

    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
      };
 
     return(
         <Container className="mt-4"> 
             <Row> 
             <Row className="mb-4 mt-3">
                 <Col md={3}> </Col>
                 <Col md={5}>
                    <InputGroup hasValidation className="mt-3">
                        <Form.Control type="search" placeholder="Buscar Control" size="l" id="busqueda" name="busqueda" />  
                    </InputGroup>
                 </Col>
                 <Col md={4}> <Button class="btn btn-outline-success" type="submit" size="l">Buscar</Button></Col>
             </Row>
             <Col sm={12} >
           <ListGroup className="mt-3 mb-3">
           {remisionesBySeguimiento.map((item, index) => (
                <ListGroup.Item className="shadow border mt-2 mb-3">
                
                <Container>
                <Row >
                    <Col sm={2} className="align-self-center" >
                        <p style={{"color": "#2D61A4", "fontSize": 19.2}}><b>Fecha</b> <br/> {dateFormat(item.fechaRemision)}</p>
                    </Col>
                    <Col sm={3} className="align-self-center" >
                        <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Entidad Remisión</b> <br/>{item.entidadRemitida}</p>
                    </Col>
                    <Col sm={4} className="align-self-center" >
                        <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Aux. Enfermeria</b><br/>{item.nombreAuxEnfermero}</p>
                    </Col>
                    <Col sm={3} className="align-self-right">
                         <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Acciones</b> <br/>
                        
                            <Link className="enlace" to="#" className="btn btn-primary mx-0">
                                <FontAwesomeIcon icon={faEye} size="l" color="white" data-tip data-for = "boton3" 
                                /> <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                            </Link>
                             <Link href="#" className="btn btn-warning mx-3">
                                 <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton4" >
                                     <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                 </svg>
                                 <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                             </Link>
                             <Link className="btn btn-secondary text-center mx-0">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <FontAwesomeIcon icon={faPrint} size="lg" color="white" data-tip data-for = "boton5"
                                />
                            </svg>
                                <ReactTooltip id="boton5" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
                            </Link >
                         </p>                     
                     </Col>
                 </Row>
                 </Container>
             </ListGroup.Item>
             ))}
             </ListGroup> 
             </Col>      
             </Row> 
             
         </Container>
     )
 }