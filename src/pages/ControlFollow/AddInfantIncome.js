import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getSegByIdApi } from "../../api/follow-up";
import { TOKEN } from "../../utils/constans";
import AddInfantInc from "../../components/Control/ControlFollow/AddInfantInc";
import { getUserByIdApi } from "../../api/user";

export default function AddInfantIncome(){
    const { idSeg, documento } = useParams();
    const [controlSeguimiento, setControl] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ controlLoaded, setControlLoaded ] = useState({});
    var loading = true;
    const [ showValidationM, setShowValidationM ] = useState(false);

    useEffect(() => {
        loading = false;
        getSegByIdApi(idSeg, token).then(response => {
            setControl(response);
        });
        getUserByIdApi(documento, token).then(response => {
            console.log(response);
            if(response.sexo === "FEMENINO"){
                setShowValidationM(true);
            }else{
                if(response.edad <= 1){
                    setShowValidationM(true);
                }
            }
            setComponentLoaded(true); 
        })

        if(!loading){ 
            setComponentLoaded(true); 
            setControlLoaded(controlSeguimiento);
        }
        }, []);

    return(
        <Container>
        <h1 className="text-center">Añadir Ingreso Infante</h1>
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
            <AddInfantInc idSeg={idSeg} showValidationM={showValidationM} documento={documento} controlSeguimiento={controlSeguimiento}/>
        )
        }
        </Container>
    )
}