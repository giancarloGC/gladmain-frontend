import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import EditControlVMadre from "../../components/Control/ControlVac/EditControlVMadre";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getContVaccByIdApi } from "../../api/vaccination";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import AnimationErrorServer from "../../assets/animations/working-server-animation.json";

export default function AddControlVac(){
    const { id, documento } = useParams();
    const [infoControl, setInfoControl] = useState({});
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ componentLoaded, setComponentLoaded ] = useState(false);   
    var loading = true;
    const { user } = useAuth();
    const [ authorization, setAuthorization ] = useState(true);
    const [ errorServer, setErrorServer ] = useState(false);

    const validatePrivilegio = (privilegio) => {
      return user.authorities.filter(priv => priv === privilegio);
  }

    useEffect(() => {
        loading = false;
        if(!loading){ 
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
        });
        getContVaccByIdApi(id, token).then(responseControl => {
           setInfoControl(responseControl);
           setComponentLoaded(true); 
        });
        //setComponentLoaded(true); 
        setUserLoaded(userControl);
        }
      }, []);

      if(validatePrivilegio("ACTUALIZAR_CONTROL_VACUNACION").length === 0){
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
                <h1 className="text-center">Editar Control de Vacunación</h1>
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
                <EditControlVMadre userControl={userControl} infoControl={infoControl}/>
            )
            }
            </Container>
        )
    }
}