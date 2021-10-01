import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import EditCommit from "../../components/Control/ControlFollow/EditCommit";
import { getSegByIdApi } from "../../api/follow-up";
import { getCompByIdApi } from "../../api/commitment";
import { TOKEN } from "../../utils/constans";

export default function EditCommitment(){

    const { idSeg, idComp, documento } = useParams();
    const [control, setControl] = useState({});
    const [segControl, setSeg] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ segLoaded, setSegLoaded ] = useState({});
    const [ controlLoaded, setControlLoaded ] = useState(false);
    const [ checkeds, setCheckeds ] = useState({radio1: false, radio: false});
    var loading = true;

      useEffect(() => {
        loading = false;
        if(!loading){ 
        getSegByIdApi(idSeg, token).then(response => {
            setSeg(response);
        });
        getCompByIdApi(idComp, token).then(responseComp => {
            setCheckeds({
                radio1: responseComp.tipo === "Compromiso cumplido que no se mantuvo" ? true : false, 
                radio: responseComp.tipo === "Compromiso por nuevo factor de riesgo" ? true : false,
            });
            setControl(responseComp);
            setControlLoaded(true);
            setComponentLoaded(true); 
        });
        //setComponentLoaded(true); 
        setControlLoaded(control);
        setSegLoaded(segControl);
        }
      }, []);

    return(
        <Container>
            <h1 className="text-center">Editar Compromiso</h1>
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
            <EditCommit segControl={segControl} control={control} documento={documento} checkeds={checkeds} setCheckeds={setCheckeds}/>
        )
        }
        </Container>
    )
}