import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Spinner, Button } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint, faHistory } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { getRolesApi, deleteRolApi } from "../../api/rol";
import { bitacoraUserApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import AnimationNotFindSearch from "../../assets/animations/notFindSearch.json";

export default function BitacoraUser(){
    const token = localStorage.getItem(TOKEN);
    const { documento } = useParams();
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ latestRol, setLatestRol ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const { user } = useAuth(); //privilegios
    const [ authorization, setAuthorization ] = useState(true);

    useEffect(() => {
        (async () => {
            const data = {
                token: token,
                documento: documento
            };
            const response = await bitacoraUserApi(data);
            console.log(response);
            console.log(response.length);
            setLoading(false);
            setRolesApi(response);
        })();       
    }, []);

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    if(validatePrivilegio("LISTAR_BITACORA_USUARIO").length === 0){
        return(
            <>
                <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                    <Lottie height={500} width="65%"
                    options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
            </>
        )
    }else{
        return(
            <Container className="justify-content-center">
                <h1 className="text-center">Bitacora del usuario 
                    <FontAwesomeIcon icon={faHistory} size="lg" color="#2D61A4"
                        data-tip data-for = "boton1" />
                </h1> 
    
                {loading && (
                    <Row className="justify-content-md-center text-center">
                        <Col md={1} className="justify-content-center">
                        <Spinner animation="border" >
                        </Spinner> 
                        </Col>
                    </Row>
                )}
    
                    <ListRolSon rolesApi={rolesApi} />
            </Container>
        )
    }
}

function ListRolSon({rolesApi}){
    const { user } = useAuth(); //privilegios

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }
    return(
        <Container>
        
        {rolesApi.length === 0 && (
            <>
            <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
            <Lottie height={400} width="55%"
                options={{ loop: true, autoplay: true, animationData: AnimationNotFindSearch, }}  
            />
        </>
        )}

        {rolesApi.length > 0 && (
        <ListGroup>
            {rolesApi.map((rol, index) => (
            <ListGroup.Item className="shadow border mt-2 mb-3">
            <Container>
            <Row>
                <Col md={4} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Acción </b> <br/> {rol.accion ? 'Activado' : 'Desactivado'}</p>
                </Col>
                <Col md={4} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Descripción </b> <br/> {rol.descripcion}</p>
                </Col>
                <Col md={4} className="align-self-center justify-content-around">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Aprobador </b> <br/> {rol.documentoAprobador}</p>               
                </Col>
            </Row>
            </Container>
        </ListGroup.Item>
            ))}
        </ListGroup>
        )}
        </Container>
    )
}