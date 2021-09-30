import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import swal from 'sweetalert';
import { faPlus, faPrint, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { TOKEN } from "../../../utils/constans";
import { deleteContVaccApi } from "../../../api/vaccination";

export default function ListFollowUp(props){
    const { listSeg, documento } = props;
    const token = localStorage.getItem(TOKEN);

    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
    }

    return(
        <Container className="mt-4"> 
            <Row > 
           <Col sm={12}>
          <ListGroup className="mt-3 mb-3">
          {listSeg.map((item, index) => (
               <ListGroup.Item className="shadow border mt-2 mb-3">
                   
               <Container>
               <Row >
                   <Col sm={3} className="align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 20}}><b>Nombre Acudiente</b> <br/>{item.nombreAcudiente}</p>
                   </Col>
                   <Col sm={3} className="align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 20}}><b>Fecha Ingreso</b> <br/>{dateFormat(item.fecha)}</p>
                   </Col>
                   <Col md={3} className="align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 20}}><b>Estado del Ingreso </b> <br/></p>
                   </Col>
                   <Col sm={3} className="align-self-right">
                   <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Acciones</b> <br/>
                        
                        <Link className="enlace"to={`/admin/detailsInfantIncome/${item.id}/`} className="btn btn-primary mx-0">
                            <FontAwesomeIcon icon={faEye} size="l" color="white" data-tip data-for = "boton3" 
                            /> <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                        </Link>
                         <Link lassName="enlace" to={`/admin/editControlFollow/${item.id}/${documento}`} className="btn btn-warning mx-3">
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
                            <Button href={`/admin/listControlRemission/${item.id}/${documento}`} style={{"fontSize": 10.3, "backgroundColor": "#fd650d", "borderColor":"#fd650d"}}>
                                Remisiones
                            </Button>{' '}
                            <Button href={`/admin/commitments/${item.id}/${documento}`} style={{"fontSize": 10.3, "backgroundColor": "#fd650d", "borderColor":"#fd650d"}}>
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