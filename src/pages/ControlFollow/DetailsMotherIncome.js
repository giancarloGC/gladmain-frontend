import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import DetailsMothertInc from "../../components/Control/ControlFollow/DetailsMothertInc";

import { getSegByIdApi } from "../../api/follow-up";
import { getMotIncomeByIdApi } from "../../api/mother_income";
import { TOKEN } from "../../utils/constans";


export default function DetailsMotherIncome(){
    const token = localStorage.getItem(TOKEN);
    const { idSeg, idInc } = useParams();
    const [control, setControl] = useState({});
    const [segControl, setSeg] = useState({});
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
        getMotIncomeByIdApi(idInc, token).then(responseInc => {
           /* setCheckeds({
                radio1: responseInc.ingreso.patologiaIdentificadaSgsss === true ? true : false, 
                radio: responseInc.ingreso.recibeMedFormulada === true ? true : false 
            });*/
            setControl(responseInc);
            setControlLoaded(true);
            setComponentLoaded(true); 
        });
        setControlLoaded(control);
        setSegLoaded(segControl);
        }
      }, []);

    return(
        <Container>
             <h1 className="text-center">Detalles Ingreso </h1>
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
            <DetailsMothertInc segControl={segControl} control={control} checkeds={checkeds} setCheckeds={setCheckeds}/>
            )
        }
        </Container>
    )
}