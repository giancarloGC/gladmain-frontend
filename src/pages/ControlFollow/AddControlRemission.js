import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getSegByIdApi } from "../../api/follow-up";
import { TOKEN } from "../../utils/constans";
import AddControlR from "../../components/Control/ControlFollow/AddControlR";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function AddControlRemission(){
    const { idSeg, documento } = useParams();
    const [controlSeguimiento, setControl] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ controlLoaded, setControlLoaded ] = useState({});
    const [ authorization, setAuthorization ] = useState(true);
    const { user } = useAuth(); //privilegios
    var loading = true;

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        loading = false;
        getSegByIdApi(idSeg, token).then(response => {
            setControl(response);
            setComponentLoaded(true); 
        })
        if(!loading){ 
            setComponentLoaded(true); 
            setControlLoaded(controlSeguimiento);
        }
        }, []);

if(validatePrivilegio("REGISTRAR_REMICION").length === 0){
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
        <Container>
        <h1 className="text-center">Añadir Remisión</h1>
        {!componentLoaded ? (
            <Row className="justify-content-md-center text-center">
            <Col md={1} className="justify-content-center">
            <Spinner animation="border" >
            </Spinner> 
            </Col>
            </Row>
        )
        :
        (
            <AddControlR controlSeguimiento={controlSeguimiento} documento={documento}/>
        )
        }
        </Container>
    )
    }
}