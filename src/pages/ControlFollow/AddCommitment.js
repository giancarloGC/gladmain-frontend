import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getSegByIdApi } from "../../api/follow-up";
import { TOKEN } from "../../utils/constans";
import AddCommit from "../../components/Control/ControlFollow/AddCommit";

export default function AddCommitment(){
    const { idSeg } = useParams();
    const [controlSeguimiento, setControl] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ controlLoaded, setControlLoaded ] = useState({});
    var loading = true;

    useEffect(() => {
        loading = false;
        getSegByIdApi(idSeg, token).then(response => {
            setControl(response);
            setComponentLoaded(true); 
        })
        if(!loading){ 
            setComponentLoaded(true); 
            setControlLoaded(controlSeguimiento);
        }
        }, []);

    return(
        <Container>
        <h1 className="text-center">Añadir Compromiso</h1>
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
            <AddCommit controlSeguimiento={controlSeguimiento}/>
        )
        }
        </Container>
    )
}