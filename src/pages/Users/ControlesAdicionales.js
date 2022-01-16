import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Form, Col, Row, Spinner, Button } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint, faHistory, faCommentMedical, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { getRolesApi, deleteRolApi } from "../../api/rol";
import { listControlsAdicionalesApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import AnimationNotFindSearch from "../../assets/animations/notFindSearch.json";

export default function ControlesAdicionales(){
    const token = localStorage.getItem(TOKEN);
    const { documento } = useParams();
    const [ listControls, setListControls ] = useState([]);
    const [ optionsControl, setOptionsControl ] = useState({ psicosocial: true, educacion: false, promocion: false });
    const [ loading, setLoading ] = useState(true);
    const { user } = useAuth(); //privilegios
    const [ authorization, setAuthorization ] = useState(true);

    useEffect(() => {
        (async () => {
            const data = {
                token: token,
                typeControl: 1 //El 1 es Psicosocial
            };
            let response = await listControlsAdicionalesApi(data);
            setLoading(false);
            if(response.length > 0){
                response = response.filter(user => user.idUsuario === parseInt(documento));
                setListControls(response);
            }
        })();       
    }, []);

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }
        
    const handleCheck = (e, item) => {
        if(e.target.checked){
            if(item === "check1"){
                setOptionsControl({psicosocial: true, educacion: false, promocion: false });
                updateControlsAditional(1);
            } else if(item === "check2"){
                setOptionsControl({psicosocial: false, educacion: true, promocion: false });
                updateControlsAditional(2);
            } else if(item === "check3"){
                setOptionsControl({psicosocial: false, educacion: false, promocion: true });
                updateControlsAditional(3);
            } 
        }
    } 

    const updateControlsAditional = async (typeControl) => {
        const data = {
            token: token,
            typeControl: typeControl //El 1 es Psicosocial, el 2 educación, el 3 es promocion
        };
        let response = await listControlsAdicionalesApi(data); 
        if(response.length > 0){
            response = response.filter(user => user.idUsuario === parseInt(documento));
            setListControls(response);
        }
        setListControls(response);
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
                <h1 className="text-center">Controles adicionales 
                    <FontAwesomeIcon icon={faCommentMedical} size="lg" color="#2D61A4"
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

                <center className="select">
                    <Form.Check type="checkbox" inline label="Control Psicosocial" checked={optionsControl.psicosocial} onChange={(e) => handleCheck(e, "check1")}/>  
                    <Form.Check type="checkbox" inline label="Control de Educación" checked={optionsControl.educacion} onChange={(e) => handleCheck(e, "check2")}/>
                    <Form.Check type="checkbox" inline label="Control de Promoción y Prevención" checked={optionsControl.promocion} onChange={(e) => handleCheck(e, "check3")}/>
                </center>

                <Row className="justify-content-md-center text-center">
                    <Col md={6} className="justify-content-center">
                    <Link to={`/admin/users/addControlAdicional/${documento}/${optionsControl.psicosocial ? '1' : ''}${optionsControl.educacion ? ' 2' : ''}${optionsControl.promocion ? '2' : ''}`} className="btn btn-primary">Añadir {optionsControl.psicosocial && 'Control Psicosocial '} {optionsControl.educacion && 'Control de educación '} {optionsControl.promocion && 'Control de Promoción y Prevención '}<FontAwesomeIcon data-tip data-for="boton1" icon={faCommentMedical} size="lg" color="#2D61A4"/></Link> 
                    </Col>
                </Row>
                        
        {listControls.length === 0 && (
            <>
            <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
            <Lottie height={400} width="55%"
                options={{ loop: true, autoplay: true, animationData: AnimationNotFindSearch, }}  
            />
        </>
        )}

        {listControls.length > 0 && (
        <ListGroup>
            {listControls.map((control, index) => (
            <ListGroup.Item className="shadow border mt-2 mb-3">
            <Container>
            <Row>
                <Col md={3} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Nombre proceso </b> <br/> {control.nombreProceso}</p>
                </Col>
                <Col md={3} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Descripción </b> <br/> {control.descripcion}</p>
                </Col>
                <Col md={3} className="align-self-center justify-content-around">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Aprobador </b> <br/> {control.nombreProfesional}</p>               
                </Col>
                <Col md={3} className="align-self-center justify-content-around">
                <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Acciones </b> <br/>
                        <Link to="" className="btn btn-primary">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton2">
                                <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                            <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                        </Link>

                        <Link className="btn btn-secondary text-center mx-3">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton3">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                            <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                        </Link>    
                    
                    </p>                 
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
}