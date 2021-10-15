import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getControlByIdApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";
import DetailControlNMadre from "../../components/Control/ControlNutri/DetailControlNMadre";
import Lottie from 'react-lottie';
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function DetailControlNutriMadre(){ 
    const { id, documento } = useParams();
    const [control, setControl] = useState({});
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ controlLoaded, setControlLoaded ] = useState(false);
    const [ nombreNutricionista, setNombreNutricionista ] = useState("");
    var loading = true;
    const { user } = useAuth();
    const [ authorization, setAuthorization ] = useState(true);

    const validatePrivilegio = (privilegio) => {
      return user.authorities.filter(priv => priv === privilegio);
    }   
    
        useEffect(() => {
        loading = false;
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
            setComponentLoaded(true); 
        });
        getControlByIdApi(id, token).then(response => {
            setControl(response);
            setControlLoaded(true);
            getUserByIdApi(response.idUsuarioNutricionista, token).then(response => {
              setNombreNutricionista(response.nombre);
          })
        })
        if(!loading){ 
        setComponentLoaded(true); 
        setUserLoaded(userControl);
        }
      }, []);

      
  if(validatePrivilegio("CONSULTAR_CONTROL").length === 0 ){
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
            <h1 className="text-center">Detalles Control Nutricional</h1>
            {!componentLoaded ? (
            <Row className="justify-content-md-center text-center">
              <Col md={1} className="justify-content-center">
              <Spinner animation="border" >
              </Spinner> 
              </Col>
            </Row>
          )
          : (
              <DetailControlNMadre userControl={userControl} control={control} nombreNutricionista={nombreNutricionista}/>
          )}
        </Container>        
    )
  }
}