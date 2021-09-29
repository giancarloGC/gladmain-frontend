import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import swal from 'sweetalert';
import { faPrint, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TOKEN } from "../../../utils/constans";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { deleteRemisApi } from "../../../api/remission";

export default function ListControlR(props){
    const {listRemis, idSeg, documento} = props;
    const token = localStorage.getItem(TOKEN);
    
    let remisionesBySeguimiento = listRemis.filter(remission => remission.idSeguimiento === parseInt(idSeg));
    console.log(remisionesBySeguimiento);

    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
      };
 
      const confirmDeleteControl = (id) => {
        swal({
            title: "¿Estás seguro de eliminar la remisión?",
            text: "¡Una vez eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteControl(id);
            }
          });
    }

    const deleteControl = (id) => {
        deleteRemisApi(id, token).then(response => {
            if(response === true){
                swal("Excelente! remisión eliminado!", {
                    icon: "success",
                })
                .then((value) => {
                    window.location.replace(`/admin/listControlRemission/${idSeg}/${documento}`);
                  });                      
            }else{
                swal("Opss! Ocurrió un error al eliminar la remisión!", {
                    icon: "error",
                })
                .then((value) => {
                    window.location.replace(`/admin/listControlRemission/${idSeg}/${documento}`);
                  });                  
            }
        })
    }

     return(
         <Container className="mt-4"> 
             <Row> 
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
                        
                            <Link className="enlace" to={`/admin/detailsControlRemission/${idSeg}/${item.id}`} className="btn btn-primary mx-0">
                                <FontAwesomeIcon icon={faEye} size="l" color="white" data-tip data-for = "boton3" 
                                /> <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                            </Link>
                             <Link to="/admin/editControlRemission" className="btn btn-warning mx-3">
                                 <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton4" >
                                     <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                 </svg>
                                 <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                             </Link>
                             <a className="btn btn-warning text-center mx-3" className="enlace" onClick={() => confirmDeleteControl(item.id)}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path data-tip data-for = "boton2" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                                <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                            </a > 
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