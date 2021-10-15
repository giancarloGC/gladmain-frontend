import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import DetailsInfantInc from "../../components/Control/ControlFollow/DetailsInfantInc";

import { getUserByIdApi } from "../../api/user";
import { getInfantIncomeApi } from "../../api/infant_income";
import { TOKEN } from "../../utils/constans";
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import Lottie from 'react-lottie';


export default function DetailsInfantIncome(){
    const [ componentLoaded, setComponentLoaded ] = useState(false); 

    const { idSeg, documento, rolUser} = useParams();
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);
    const [ showValidationM, setShowValidationM ] = useState(false);
    const { user } = useAuth();
    const [ authorization, setAuthorization ] = useState(true);

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    } 

        useEffect(() => {
        (async () => {
            let listIngresos = await getInfantIncomeApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            getUserByIdApi(documento, token).then(response => {
                if(response.sexo === "FEMENINO"){
                    setShowValidationM(true);
                }else{
                    if(response.edad < 1){
                        setShowValidationM(true);
                    }
                }
            });
            setIngreso(ingresoBySeg[0]);
            setComponentLoaded(true); 
        })();
      }, []);

      if(validatePrivilegio("CONSULTAR_INGRESO_INFANTE").length === 0 ){
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
                <h1 className="text-center">Detalles Ingreso </h1>
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
                <DetailsInfantInc idSeg={idSeg} documento={documento} showValidationM={showValidationM} ingreso={ingreso} rolUser={rolUser} />
                )
            }
            </Container>
        )
    }
}