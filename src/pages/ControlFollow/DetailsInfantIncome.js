import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import DetailsInfantInc from "../../components/Control/ControlFollow/DetailsInfantInc";

import { getUserByIdApi } from "../../api/user";
import { getInfantIncomeApi } from "../../api/infant_income";
import { TOKEN } from "../../utils/constans";


export default function DetailsInfantIncome(){
    const [ componentLoaded, setComponentLoaded ] = useState(false); 

    const { idSeg, documento, rolUser} = useParams();
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);
    const [ showValidationM, setShowValidationM ] = useState(false);

        useEffect(() => {
        (async () => {
            let listIngresos = await getInfantIncomeApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            getUserByIdApi(documento, token).then(response => {
                if(response.sexo === "FEMENINO"){
                    setShowValidationM(true);
                }else{
                    if(response.edad < 1){
                        setShowValidationM(true);
                    }
                }
            });
            setIngreso(ingresoBySeg[0]);
            setComponentLoaded(true); 
        })();
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
            <DetailsInfantInc idSeg={idSeg} documento={documento} showValidationM={showValidationM} ingreso={ingreso} rolUser={rolUser} />
            )
        }
        </Container>
    )
}