import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import EditControlV from "../../components/Control/ControlVac/EditControlV";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { getVacByAgeApi } from "../../api/vaccine";
import { getContVaccByIdApi } from "../../api/vaccination";
import { TOKEN } from "../../utils/constans";

export default function AddControlVac(){
    const { documento, id } = useParams();
    const [infoControl, setInfoControl] = useState({});
    const [listControls, setListControls] = useState([]);
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ userLoaded, setUserLoaded ] = useState({});
    const [ componentLoaded, setComponentLoaded ] = useState(false);   
    const [ listVac, setListVac ] = useState([]);
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
        getContVaccByIdApi(id, token).then(responseControl => {
           setInfoControl(responseControl);
           setComponentLoaded(true); 
        });
        //setComponentLoaded(true); 
        setUserLoaded(userControl);
        }
      }, []);

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
            <EditControlV userControl={userControl} infoControl={infoControl} listVac={listVac}/>
        )
        }
        </Container>
    )
    
}