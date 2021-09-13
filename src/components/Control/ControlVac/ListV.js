import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotResults from "../../../assets/animations/notResults.json";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { deleteVacApi } from "../../../api/vaccine";
import { TOKEN } from "../../../utils/constans";
import { getUserByIdApi } from "../../../api/user";
import { deleteContVaccApi } from "../../../api/vaccination";


export default function ListV(props){
    const { listControls } = props;
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        /*getContVaccApi(documento, token).then(response => {
            console.log(response);
            setListControls(response);
        });*/
    }, []);

    const formatedDate = (date) => {
         let newDate = date.split("T");
        return newDate[0];
     }

     const confirmDeleteControlVac = (item) => {
        swal({
            title: "¿Estás seguro de eliminar el Control?",
            text: "¡Una vez eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let res = deleteAll(item);
                if(res){
                    swal("Excelente! Control eliminado con éxito!", {
                        icon: "success",
                    })
                    .then((value) => {
                        window.location.replace(`/admin/listVaccines/${documento}`);
                      }); 
                }else{
                    swal("Opss! Ocurrió un error al eliminar el control!", {
                        icon: "error",
                    })
                    .then((value) => {
                        window.location.replace(`/admin/listVaccines/${documento}`);
                      });
                }
            }
          });
    }
    
    const deleteAll = async (item) => {
        let responseDeleteVac = false;
        if(item.vacunasRegistradas.length > 0){
            responseDeleteVac = await item.vacunasRegistradas.map((vacune, index) => {
                return deleteVaccine(item, vacune);
            })
        }

        responseDeleteVac = await delteContol(item);
        return responseDeleteVac;
    }

    const deleteVaccine = async (item, vacune) => {
        const respoinseVAC =  await deleteVacApi(item.id, vacune.idVacuna, token);
        if(respoinseVAC === true){
            console.log("si la elimino");
            return true;                   
        }else{
            console.log("noo la elimino");
            return false;                 
        }
    }
    
    const delteContol = async (item) => {
        const deleteCont = await deleteContVaccApi(item.id, token);
            console.log(deleteCont);
            if(deleteCont === true){
                console.log("rlimino control");
                return true;
            }else{
                console.log("pailas");
                return false;
            }
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

             <ListGroup>
             {listControls.map((item, index) => (
             <ListGroup.Item className="shadow border mt-2 mb-3">
             <Container>
             <Row>
                 <Col md={2} className="align-self-center">
                     <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Número Documento </b> <br/> {item.idUsuario} </p>
                 </Col>
                 <Col md={4} className="align-self-center">
                     <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Vacunas</b> <br/>{item.vacunasRegistradas.length > 0 ? (
                         item.vacunasRegistradas.map((subItem, index) => (
                             `${subItem.nombre}, `
                         )))
                    : ("Ninguna") }</p>
                 </Col>
                 <Col md={3} className="align-self-center">
                     <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Fecha Aplicación</b> <br/>{formatedDate(item.fechaAplicacion)}</p>
                 </Col>
                 <Col md={3} className="align-self-center justify-content-around">
                     <p style={{"color": "#2D61A4", "fontSize": 22}}><b> Acciones </b> <br/>
                         <Link to={`/admin/editControlVac/${item.id}/${documento}`} className="btn btn-primary">
                             <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path data-tip data-for = "boton3" fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                              </svg>
                             <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                         </Link>

                         <Link className="btn btn-warning text-center mx-3" onClick={() => confirmDeleteControlVac(item)}>
                             <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path data-tip data-for = "boton4" fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                             </svg>
                             <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                         </Link > 
                         <Link className="btn btn-secondary text-center mx-0">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <FontAwesomeIcon icon={faPrint} size="lg" data-tip data-for = "boton5"
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
        </Container>
     )
 }