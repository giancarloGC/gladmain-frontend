import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getMotIncomeByUserApi } from "../../api/mother_income";
import { TOKEN } from "../../utils/constans";
import DetailsMothertInc from "../../components/Control/ControlFollow/DetailsMothertInc";

export default function DetailsMotherIncome(){
    const { idSeg, documento } = useParams();
    const [controlSeguimiento, setControl] = useState({});
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ controlLoaded, setControlLoaded ] = useState({});
    var loading = true;

    useEffect(() => {
        (async () => {
            let listIngresos = await getMotIncomeByUserApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            console.log(ingresoBySeg);
            setIngreso(ingresoBySeg[0]);
        })();
    }, []);

    return(
        <Container>
        <h1 className="text-center">Detalles Ingreso Madre Gestante</h1>
        {!ingreso ? (
            <Row className="justify-content-md-center text-center">
            <Col md={1} className="justify-content-center">
            <Spinner animation="border" >
            </Spinner> 
            </Col>
            </Row>
        )
        :
        (
            <DetailsMothertInc idSeg={idSeg} documento={documento} ingreso={ingreso}/>
        )
        }
        </Container>
    )
}