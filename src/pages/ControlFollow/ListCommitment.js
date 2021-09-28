import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import ListControlR from "../../components/Control/ControlFollow/ListControlR";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useParams } from "react-router-dom";
import { getCompByUserApi } from "../../api/commitment";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";


export default function ListCommitment(){

  const { documento, idSeguimiento } = useParams();
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
              console.log(idSeguimiento);
              let compromisosBySegui = response.filter(comp => comp.idSeguimientoSalud.toString() === idSeguimiento );
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

    return(
        <Container>
            <h1 className="text-center mb-4">Compromisos de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addCommitment/${idSeguimiento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
              </Link>
              
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
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
                <Container> 
                <Row  style={{backgroundColor: '#f1f1f1'}}> 
   
                <Row className="mb-4 mt-3">
                    <Col md={3}> </Col>
                    <Col md={6}>
                       <InputGroup hasValidation>
                           <Form.Control type="search" placeholder="Buscar Control" size="lg" id="busqueda" name="busqueda" />
                           <Button className="btn btn-outline-success" type="submit">Buscar</Button>
                       </InputGroup>
                    </Col>
                    <Col md={3}> </Col>
                </Row>
   
              <ListGroup >
                {listControls.map((item, index) => (
                    <ListGroup.Item className="shadow border mb-3 ">
                   
                   <Container>
                   <Row >
                       <Col md={2} className="row justify-content-center align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 22}}><b>Fecha Inicio</b> <br/>{dateFormat(item.fechaCompromiso)}</p>
                       </Col>
                       <Col md={2} className="row justify-content-center align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 22}}><b>Nombre Compromiso</b> <br/>{item.nombre}</p>
                       </Col>
                       <Col md={3} className="row justify-content-center align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 22}}><b>Nuevo Compromiso</b> <br/>{item.nuevoCompromiso}</p>
                       </Col>
                       <Col md={2} className="row justify-content-center align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 22}}><b>Fecha Fin</b> <br/>{dateFormat(item.fechaCumplimiento)}</p>
                       </Col>
                       <Col md={4} className="align-self-center">
                            <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Acciones</b> <br/>
                                <Link href="#" className="btn btn-primary">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                    </svg>
                                </Link>
                                <Link className="btn btn-warning text-center mx-3">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                    </svg>
                                </Link > 
                                <Link className="btn btn-secondary text-center mx-0 ">
                                   <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <FontAwesomeIcon icon={faPrint}
                                   />
                               </svg>
                               </Link > 
                               <Link className="btn btn-danger text-center mx-3">
                               <FontAwesomeIcon icon={faFileMedicalAlt} size="lg"/>
                                </Link > 
   
                            </p>                     
                        </Col>
                    </Row>
                    </Container>
                </ListGroup.Item>
                ))}
                </ListGroup>             
                </Row> 
                
            </Container>
            )}
        </Container>
    )
}