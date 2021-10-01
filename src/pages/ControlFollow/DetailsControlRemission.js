import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import DetailsControlR from "../../components/Control/ControlFollow/DetailsControlR";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getRemisByIdApi } from "../../api/remission";
import { TOKEN } from "../../utils/constans";

export default function DetailsControlRemission(){
    const { idSeg, idRemi } = useParams();
    const [infoRemi, setInfoRemi] = useState({});
    const [ remiLoaded, setRemiLoaded ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ checkeds, setCheckeds ] = useState({radio: false, radio1: false, radio2: false});
    const [ componentLoaded, setComponentLoaded ] = useState(false);   
    var loading = true;


    useEffect(() => {
        loading = false;
        if(!loading){ 
            getRemisByIdApi(idRemi, token).then(responseComp => {
                setCheckeds({
                    radio: responseComp.atendido === true ? true : false,
                    radio1: responseComp.hospitalizado === true ? true : false, 
                    radio2: responseComp.fallecido === true ? true : false
                });
            setInfoRemi(responseComp);
            setComponentLoaded(true); 
        });
        setRemiLoaded(infoRemi);
        }
      }, []);

    return(
        <Container>
            <h1 className="text-center">Detalles Remisión</h1>
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
            <DetailsControlR idSeg={idSeg} infoRemi={infoRemi} checkeds={checkeds} setCheckeds={setCheckeds}/>
        )
        }
        </Container>
    )
    
}