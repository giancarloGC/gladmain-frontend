import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getControlByIdApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";
import DetailControlN from "../../components/Control/ControlNutri/DetailControlN";


export default function DetailControlNutri(){ 
    const { id, documento } = useParams();
    const [control, setControl] = useState({});
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ controlLoaded, setControlLoaded ] = useState(false);
    const [ nombreNutricionista, setNombreNutricionista ] = useState("");
    var loading = true;
    
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
              <DetailControlN userControl={userControl} control={control} nombreNutricionista={nombreNutricionista}/>
          )}
        </Container>        
    )
}