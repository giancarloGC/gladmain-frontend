import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import DetailsControlF from "../../components/Control/ControlFollow/DetailsControlF";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getSegByIdApi } from "../../api/follow-up";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";

export default function DetailsControlFollow(){
    const { idSeg, documento, rolUser } = useParams();
    const [infoSeg, setInfoSeg] = useState({});
    const [userControl, setUser] = useState({});
    const [ segLoaded, setSegLoaded ] = useState({});
    const [ userLoaded, setUserLoaded ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false);   
    var loading = true;

    useEffect(() => {
        loading = false;
        if(!loading){ 
            getUserByIdApi(documento, token).then(response => {
                setUser(response);
            });
            getSegByIdApi(idSeg, token).then(responseComp => {
                setInfoSeg(responseComp);
            setComponentLoaded(true); 
        });
        setSegLoaded(infoSeg);
        setUserLoaded(userControl);
        }
      }, []);

    return(
        <Container>
            <h1 className="text-center">Detalles del Seguimiento</h1>
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
            <DetailsControlF rolUser={rolUser} infoSeg={infoSeg} documento={documento} userControl={userControl}/>
        )
        }
        </Container>
    )
    
}