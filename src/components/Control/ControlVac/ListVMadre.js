import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import swal from 'sweetalert';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { TOKEN } from "../../../utils/constans";
import { deleteContVaccApi } from "../../../api/vaccination";

export default function ListVMadre(props){
    const { listControls } = props;
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);

    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
    }

    const confirmDeleteControl = (id) => {
        swal({
            title: "¿Estás seguro de eliminar el control?",
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
        deleteContVaccApi(id, token).then(response => {
            if(response === true){
                swal("Excelente! Control eliminado!", {
                    icon: "success",
                })
                .then((value) => {
                    window.location.replace(`/admin/listVacMadre/${documento}`);
                  });                      
            }else{
                swal("Opss! Ocurrió un error al eliminar el control!", {
                    icon: "error",
                })
                .then((value) => {
                    window.location.replace(`/admin/listVacMadre/${documento}`);
                  });                  
            }
        })
    }

    return(
        <Container> 
            <Row  style={{backgroundColor: '#f1f1f1'}}> 
            <Row className="mb-3 mt-3">
                <Col md={3}>
                </Col>
                <Col md={6}>
                   <InputGroup hasValidation>
                       <Form.Control type="search" placeholder="Buscar Control" size="lg" id="busqueda" name="busqueda" />
                       <Button class="btn btn-outline-success" type="submit">Buscar</Button>
                   </InputGroup>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
        
          <ListGroup >
          {listControls.map((item, index) => (
               <ListGroup.Item className="shadow border mt-2 mb-3">
               <Container>
               <Row >
                   <Col md={3} className="row justify-content-center align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 24}}><b>Fecha Aplicaciòn</b> <br/>{dateFormat(item.fechaAplicacion)}</p>
                   </Col>
                   <Col md={2} className="row justify-content-center align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 24}}><b>Numero Documento</b> <br/>{item.idUsuario}</p>
                   </Col>
                   <Col md={2} className="row justify-content-center align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 24}}><b>Nombre Vacuna </b> <br/>{item.nombreVacuna}</p>
                   </Col>
                   <Col md={2} className="row justify-content-center align-self-center">
                       <p style={{"color": "#2D61A4", "font-size": 24}}><b>Edad Gestacional </b> <br/>{item.edadGestacional}</p>
                   </Col>
                   
                   <Col md={3} className="align-self-center justify-content-around">
                        <p style={{"color": "#2D61A4", "font-size": 24}}><b> Acciones </b> <br/>
                            <a href="#" className="btn btn-primary">
                               <Link to={`/admin/EditControlVacMadre/${item.id}/${documento}`} className="btn btn-primary">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path data-tip data-for = "boton1" fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                </svg>
                                <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                               </Link>
                            </a>
                            <a className="btn btn-warning text-center mx-3" className="enlace" onClick={() => confirmDeleteControl(item.id)}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path data-tip data-for = "boton2" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                                <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                            </a > 
                            <a className="btn btn-secondary text-center mx-0" >
                               <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                               <FontAwesomeIcon icon={faPrint} data-tip data-for = "boton3"
                               />
                           </svg>
                           <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
                           </a > 
                        </p>                     
                    </Col>
                </Row>

                </Container>
            </ListGroup.Item>
            ))}
            </ListGroup>
            </Row> 
        </Container>
    )

}