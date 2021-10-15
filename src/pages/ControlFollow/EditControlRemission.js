import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import EditControlR from "../../components/Control/ControlFollow/EditControlR";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getRemisByIdApi } from "../../api/remission";
import { TOKEN } from "../../utils/constans";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function EditControlRemission(){
    const { idSeg, idRemi, documento } = useParams();
    const [infoRemi, setInfoRemi] = useState({});
    const [ remiLoaded, setRemiLoaded ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ checkeds, setCheckeds ] = useState({radio: false, radio1: false, radio2: false});
    const [ componentLoaded, setComponentLoaded ] = useState(false);  
    const [ authorization, setAuthorization ] = useState(true);
    const { user } = useAuth(); //privilegios 
    var loading = true;

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        loading = false;
        if(!loading){ 
            getRemisByIdApi(idRemi, token).then(responseComp => {
                console.log(responseComp);
                setCheckeds({
                    radio: responseComp.atendido === true ? true : false,
                    radio1: responseComp.hospitalizado === true ? true : false, 
                    radio2: responseComp.fallecido === true ? true : false
                });
            setInfoRemi(responseComp);
            setComponentLoaded(true); 
        });
        setRemiLoaded(infoRemi);
        }
      }, []);
if(validatePrivilegio("ACTUALIZAR_REMICION").length === 0){
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
            <h1 className="text-center">Editar Remisión</h1>
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
            <EditControlR idSeg={idSeg} infoRemi={infoRemi} documento={documento} checkeds={checkeds} setCheckeds={setCheckeds}/>
        )
        }
        </Container>
    )
}
    
}