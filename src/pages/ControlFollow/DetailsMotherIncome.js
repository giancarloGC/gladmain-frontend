import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getMotIncomeByUserApi } from "../../api/mother_income";
import { TOKEN } from "../../utils/constans";
import DetailsMothertInc from "../../components/Control/ControlFollow/DetailsMothertInc";
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import Lottie from 'react-lottie';

export default function DetailsMotherIncome(){
    const { idSeg, documento } = useParams();
    const [controlSeguimiento, setControl] = useState({});
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ controlLoaded, setControlLoaded ] = useState({});
    var loading = true;
    const { user } = useAuth();
    const [ authorization, setAuthorization ] = useState(true);

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    } 

    useEffect(() => {
        (async () => {
            let listIngresos = await getMotIncomeByUserApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            console.log(ingresoBySeg);
            setIngreso(ingresoBySeg[0]);
        })();
    }, []);

    if(validatePrivilegio("CONSULTAR_INGRESO_MADRE").length === 0 ){
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
            <h1 className="text-center">Detalles Ingreso Madre Gestante</h1>
            {!ingreso ? (
                <Row className="justify-content-md-center text-center">
                <Col md={1} className="justify-content-center">
                <Spinner animation="border" >
                </Spinner> 
                </Col>
                </Row>
            )
            :
            (
                <DetailsMothertInc idSeg={idSeg} documento={documento} ingreso={ingreso}/>
            )
            }
            </Container>
        )
    }
}