import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import AddControlV from "../../components/Control/ControlVac/AddControlV";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getVacByAgeApi } from "../../api/vaccine";
import { getContVaccApi } from "../../api/vaccination";
import { TOKEN } from "../../utils/constans";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function AddControlVac(){
    const { documento } = useParams();
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ listVac, setListVac ] = useState([]);
    const [ listControls, setListControls ] = useState([]);
    const [ authorization, setAuthorization ] = useState(true);
    const { user } = useAuth(); //privilegios
    var loading = true;

    useEffect(() => {
        loading = false;
        if(!loading){ 
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
            getVacByAgeApi(response.edad, token).then(responseAGE => {
                setListVac(responseAGE);
            })
        });
        getContVaccApi(documento, token).then(response => {
          console.log(response);
          setListControls(response);
      });
        setComponentLoaded(true); 
        setUserLoaded(userControl);
        setComponentLoaded(true); 
        }
      }, []);

      const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

   if (validatePrivilegio ("REGISTRAR_CONTROL_VACUNACION").length === 0){
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
              {componentLoaded || (
              <Row className="justify-content-md-center text-center">
                <Col md={1} className="justify-content-center">
                <Spinner animation="border" >
                </Spinner> 
                </Col>
              </Row>
            )}
            {componentLoaded && (
              <>
                <h1 className="text-center">Actualizar vacunas de {userControl.nombre}</h1>
                <AddControlV userControl={userControl} listVac={listVac} listControls={listControls}/>
              </>
            )}

          </Container>
      )
 }
}