import React from "react";
import { Container } from "react-bootstrap";
import DetailsInfantInc from "../../components/Control/ControlFollow/DetailsInfantInc";

export default function DetailsInfantIncome(){
    return(
        <Container>
             <h1 className="text-center">Detalles Ingreso </h1>
            <DetailsInfantInc />
        </Container>
    )
}