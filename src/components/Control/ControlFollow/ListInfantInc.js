import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import { faPrint, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, ErrorMessage } from "formik";
import { faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import {getSegByIdApi} from "../../../api/follow-up";
import { TOKEN } from "../../../utils/constans";

export default function ListInfantInc(props){
    const { listControls, documento } = props;
    console.log(listControls);
    const token = localStorage.getItem(TOKEN);
     const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        } 
      }
      
     const getNombreAcudiente = (id) => {
        getSegByIdApi(id, token).then(response => {
            console.log(response);

            return response.nombreAcudiente;
        })
     }

     const getFecha = (id) => {
        getSegByIdApi(id, token).then(response => {
            console.log(response);

            return dateFormat(response.fecha);
            
        })
     }
 
     return(
         <Container> 
           <Row > 
           <Col sm={12}>
           <ListGroup>
           {listControls.map((item, index) => (
                <ListGroup.Item className="mt-3" className="shadow border mt-4" style={{height:'125px'}}>
                <Container>
                <Row >
                    <Col md={3} className="align-self-center" >
                        <p style={{color: '#2D61A4', fontSize: 20}}><b>Nombre Acudiente</b><br/>
                        {getNombreAcudiente(item.ingreso.idSeguimiento)}
                        </p>
                    </Col>
                    <Col md={2} className="align-self-center" >
                        <p style={{color: '#2D61A4', fontSize: 20}}><b>Fecha ingreso</b><br/>{item.ingreso.idSeguimiento}
                        {//{getFecha(item.ingreso.idSeguimiento)}
                        }
                        </p>
                    </Col>
                    <Col md={3} className="align-self-center" >
                        <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Estado del ingreso</b> <br/></p>
                    </Col>
                    <Col md={4} className="align-self-right">
                         <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Acciones</b> <br/>
                        
                            <Link className="enlace" to="#" className="btn btn-primary mx-0">
                                <FontAwesomeIcon icon={faEye} size="lg" color="white" data-tip data-for = "boton3" 
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
                                <br></br> 
                                <Button href={`/admin/listControlRemission/${documento}/${item.ingreso.idSeguimiento}`} style={{"fontSize": 11, "backgroundColor": "#fd650d", "borderColor":"#fd650d"}} color="black">
                                Remisiones
                                </Button>{' '}
                                <Button href="/admin/addCommitment" style={{"fontSize": 11, "backgroundColor": "#fd650d", "borderColor":"#fd650d"}} color="black">
                                Compromisos
                                </Button>{' '}

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