import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Spinner, Button } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { getRolesApi, deleteRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";
import useAuth from '../../hooks/useAuth'; //privilegios

export default function ListRol(){
    const token = localStorage.getItem(TOKEN);
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ latestRol, setLatestRol ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const { user } = useAuth(); //privilegios

    useEffect(() => {
        (async () => {
            const response = await getRolesApi();
            setLoading(false);
            setRolesApi(response);
            let rolesDesc = response.sort(function (a, b){
                return (b.idRol - a.idRol)
            });
            setLatestRol(rolesDesc[0].idRol);
        })();       
    }, []);

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    const confirmDeleteRol = (idRol) => {
        swal({
            title: "¿Estás seguro de eliminar el rol?",
            text: "¡Una vez eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteRol(idRol);
            }
          });
    }

    const deleteRol = (idRol) => {
        deleteRolApi(idRol, token).then(response => {
            if(response === true){
                swal("Excelente! Rol eliminado!", {
                    icon: "success",
                })
                .then((value) => {
                    window.location.replace("/admin/roles");
                  });                      
            }else{
                swal("Opss! Ocurrió un error al eliminar el rol!", {
                    icon: "error",
                })
                .then((value) => {
                    window.location.replace("/admin/roles");
                  });                  
            }
        })
    }

    return(
        <Container className="justify-content-center">
            <h1 className="text-center">Listado de roles 
            {validatePrivilegio("REGISTRAR_ROL").length > 0 && ("CONSULTAR_PRIVILEGIOS").length > 0 && (
                <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4"
                    data-tip data-for = "boton1" onClick={() => window.location.replace(`/admin/addRol/${latestRol}`)}
                /> //{` `}
            )}
                <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Agregar Nuevo Rol </ReactTooltip>
            </h1> 

            {loading && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}

            {rolesApi.length > 0 && (
                <ListRolSon rolesApi={rolesApi} confirmDeleteRol={confirmDeleteRol} />
            )}
        </Container>
    )
}

function ListRolSon({rolesApi, confirmDeleteRol}){
    const { user } = useAuth(); //privilegios

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }
    return(
        <Container>
        <ListGroup>
            {rolesApi.map((rol, index) => (
            <ListGroup.Item className="shadow border mt-2 mb-3">
            <Container>
            <Row>
                <Col md={4} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Código </b> <br/> {rol.idRol}</p>
                </Col>
                <Col md={4} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Titulo </b> <br/> {rol.nombre}</p>
                </Col>
                <Col md={4} className="align-self-center justify-content-around">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Acciones </b> <br/>
                    {validatePrivilegio("CONSULTAR_ROL").length > 0 && ("ACTUALIZAR_ROL").length > 0 && ("CONSULTAR_PRIVILEGIOS").length > 0 && (
                        <Link to={`/admin/editRol/${rol.idRol}`} className="btn btn-primary">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton2">
                                <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                            <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                        </Link>
                    )}

                     {validatePrivilegio("ELIMINAR_ROL").length > 0 && (
                        <Link className="btn btn-secondary text-center mx-3" onClick={() => confirmDeleteRol(rol.idRol)}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton3">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                            <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                        </Link>    
                    )}
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
