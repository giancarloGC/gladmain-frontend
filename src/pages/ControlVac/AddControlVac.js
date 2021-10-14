import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import AddControlV from "../../components/Control/ControlVac/AddControlV";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getVacByAgeApi } from "../../api/vaccine";
import { getContVaccApi } from "../../api/vaccination";
import { TOKEN } from "../../utils/constans";

export default function AddControlVac(){
    const { documento } = useParams();
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ listVac, setListVac ] = useState([]);
    const [ listControls, setListControls ] = useState([]);
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