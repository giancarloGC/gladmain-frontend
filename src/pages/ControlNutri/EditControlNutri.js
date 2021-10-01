import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import EditControlN from "../../components/Control/ControlNutri/EditControlN";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getControlByIdApi } from "../../api/controls";

import { TOKEN } from "../../utils/constans";

export default function EditControlNutri(){
    const { id, documento, rolUser } = useParams();
    const [infoControl, setInfoControl] = useState({});
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ componentLoaded, setComponentLoaded ] = useState(false);   
    var loading = true;
    
    useEffect(() => {
        loading = false;
        if(!loading){ 
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
        });
        getControlByIdApi(id, token).then(responseControl => {
           setInfoControl(responseControl);
           setComponentLoaded(true); 
        });
        //setComponentLoaded(true); 
        setUserLoaded(userControl);
        }
      }, []);

    return(
        <Container>
            <h1 className="text-center">Editar Control Nutricional</h1>
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
            <EditControlN userControl={userControl} infoControl={infoControl} rolUser={rolUser}/>
        )
        }
        </Container>
    )
    
}