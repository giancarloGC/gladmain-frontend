import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import swal from 'sweetalert';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimationNotFindSearch from "../../../assets/animations/notFindSearch.json";
import Lottie from 'react-lottie';
import { useParams } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { TOKEN } from "../../../utils/constans";
import { deleteControlApi } from "../../../api/controls";

export default function ListControlCyDe(props){
    const { infoUser, user, listControls, lastControls, allControlSaved } = props;
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

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
        deleteControlApi(id, token).then(response => {
            if(response === true){
                swal("Excelente! Control eliminado!", {
                    icon: "success",
                })
                .then((value) => {
                    window.location.replace(`/admin/listControlCyD/${documento}`);
                  });                      
            }else{
                swal("Opss! Ocurrió un error al eliminar el control!", {
                    icon: "error",
                })
                .then((value) => {
                    window.location.replace(`/admin/listControlCyD/${documento}`);
                  });                  
            }
        })
    }
 
     return(
         <Container className="mt-4"> 
             <Row> 
            
             <Col sm={12} >
             <Container style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}} >
            <Row className="mt-2 mb-2 justify-content-center">
            <Col sm={6} >
             <Form.Group as={Row} className="mt-2 mb-2 justify-content-center">
                    <Form.Label column sm={6} >
                        Fecha Ultimo Control
                    </Form.Label>
                    <Col className="row justify-content-center">
                    <Form.Control type="date" size="l" id="ultimoControl" name="ultimoControl" value={dateFormat(lastControls.ultimoControl)} disabled/>
                    </Col>
                    <Col sm={1}></Col>
            </Form.Group> 
            </Col>
            <Col sm={6} >
            <Form.Group as={Row} className="mt-2 mb-2 justify-content-center">
                    <Form.Label column sm={6} >
                        Fecha Proximo Control
                    </Form.Label>
                    <Col className="row justify-content-center">
                    <Form.Control type="date" size="l" id="proximoControl" name="proximoControl" value={dateFormat(lastControls.proximoControl)} disabled
                    />
                    </Col>
            </Form.Group> 
            </Col>
            </Row>
            </Container>
            </Col>

            {allControlSaved.length === 0 && (
                <>
                    <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
                    <Lottie height={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationNotFindSearch, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
            )}

            {allControlSaved.length > 0 && (
             <Col sm={12} >
                {listControls.length === 0 && (
                <>
                    <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
                    <Lottie height={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationNotFindSearch, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
                )}
                
                {listControls.length > 0 && (
                <ListGroup className="mt-3 mb-3">
                 {listControls.map((item, index) => (
                <ListGroup.Item className="shadow border mt-2 mb-3">
                <Container>
                <Row >
                    <Col md={3} className="align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 20}}><b>Fecha Control</b> <br/>{dateFormat(item.fechaControl)}</p>
                    </Col>
                    <Col md={2} className="align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 20}}><b>Peso </b> <br/>{item.peso}</p>
                    </Col>
                    <Col md={2} className="align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 20}}><b>Talla </b> <br/>{item.talla}</p>
                    </Col>
                    <Col md={2} className="align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 20}}><b>IMC</b> <br/>{item.imc}</p>
                    </Col>
                    
                    <Col md={3} className="align-self-right">
                         <p style={{"color": "#2D61A4", "font-size": 20}}><b> Acciones </b> <br/>
                         {validatePrivilegio("ACTUALIZAR_CONTROL").length > 0 && ("CONSULTAR_USUARIO").length > 0 && ("CONSULTAR_CONTROL").length > 0 &&(
                             <Link to={`/admin/editControlCyD/${item.id}/${documento}`} className="btn btn-warning mx-0">
                                 <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton3" >
                                     <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                 </svg>
                                 <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                             </Link>
                         )}

                          {validatePrivilegio("ELIMINAR_CONTROL").length > 0 && (
                             <a className="enlace btn btn-primary mx-3" onClick={() => confirmDeleteControl(item.id)}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path data-tip data-for = "boton4" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                                <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                            </a > 
                          )}
                         </p>                     
                     </Col>
                 </Row>
                 </Container>
             </ListGroup.Item>
             ))}
             </ListGroup>
             )} 
          </Col>  
         )}    
          </Row> 
          
      </Container>
  )
 }