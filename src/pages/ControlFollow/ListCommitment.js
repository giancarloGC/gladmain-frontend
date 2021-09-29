import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import swal from 'sweetalert';
import { faPlus, faPrint, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useParams } from "react-router-dom";
import { getCompByUserApi, deleteCompApi } from "../../api/commitment";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";


export default function ListCommitment(){

  const { idSeg, documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState(null);
  const [ listControls, setListControls ] = useState([]);
  
  useEffect(() => {
      getUserByIdApi(documento, token).then(responseUser => {
          setInfoUser(responseUser);
      });
      getCompByUserApi(documento, token).then(response => {
          console.log(response);
          if(response.length > 0){
              console.log(idSeg);
              let compromisosBySegui = response.filter(comp => comp.idSeguimientoSalud.toString() === idSeg );
            console.log(compromisosBySegui);
              setListControls(compromisosBySegui);
          }
        });
  }, []);

  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');
    return dateFormated[0];
    }
  }

  const confirmDeleteCom = (id) => {
    swal({
        title: "¿Estás seguro de eliminar el Compromiso?",
        text: "¡Una vez eliminado no se podrá recuperar!",
        icon: "warning",
        buttons: ['Cancelar', 'Sí, eliminar'],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            deleteCom(id);
        }
      });
}

const deleteCom = (id) => {
    deleteCompApi(id, token).then(response => {
        if(response === true){
            swal("Excelente! Compromiso eliminado!", {
                icon: "success",
            })
            .then((value) => {
                window.location.replace(`/admin/commitments/${idSeg}/${documento}`);
              });                      
        }else{
            swal("Opss! Ocurrió un error al eliminar el Compromiso!", {
                icon: "error",
            })
            .then((value) => {
                window.location.replace(`/admin/commitments}/${idSeg}/${documento}`);
              });                  
        }
    })
}
    return(
        <Container>
            <h1 className="text-center mb-4">Compromisos de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addCommitment/${idSeg}/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Compromiso </ReactTooltip>
              </Link>
              
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton2" />
              <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
            </h1>
            
            {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            
            {listControls.length > 0 && (
                <Container className="mt-4"> 
                <Row>
                <Row className="mb-2 mt-3">
                    <Col md={3}> </Col>
                    <Col md={6}>
                       <InputGroup hasValidation>
                           <Form.Control type="search" placeholder="Buscar Control" size="lg" id="busqueda" name="busqueda" />
                           <Button className="btn btn-outline-success" type="submit">Buscar</Button>
                       </InputGroup>
                    </Col>
                    <Col md={3}> </Col>
                </Row>

                <Col sm={12} >
              <ListGroup className="mt-3 mb-3">
                {listControls.map((item, index) => (
                    <ListGroup.Item className="shadow border mt-2 mb-3">

                   <Container>
                   <Row >
                       <Col sm={3} className="align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Inicio</b> <br/>{dateFormat(item.fechaCompromiso)}</p>
                       </Col>
                       <Col sm={3} className="align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Nombre </b> <br/>{item.nombre}</p>
                       </Col>
                       <Col sm={3} className="align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 19.2}}><b>Fin</b> <br/>{dateFormat(item.fechaCumplimiento)}</p>
                       </Col>
                       <Col sm={3} className="align-self-right">
                            <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Acciones</b> <br/>
                                <Link to={`/admin/detailCommitment/${idSeg}/${item.id}`} className="btn btn-primary">
                                <FontAwesomeIcon icon={faEye} size="xs" data-tip data-for = "boton3" 
                                /> <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                                </Link>
                                <Link to={`/admin/editCommitment/${idSeg}/${item.id}/${documento}`} className="btn btn-warning mx-1">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton4">
                                        <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                    </svg>
                                    <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                                </Link>
                                <Link className="enlace btn btn-primary" onClick={() => confirmDeleteCom(item.id)}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton5">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                                <ReactTooltip id="boton5" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                                </Link> 
                                <Link className="btn btn-secondary text-center mx-1">
                                   <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton6">
                                   <FontAwesomeIcon icon={faPrint}
                                   />
                               </svg>
                               <ReactTooltip id="boton6" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
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
            )}
        </Container>
    )
}