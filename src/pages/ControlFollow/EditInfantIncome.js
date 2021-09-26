import React from "react";
import { Container } from "react-bootstrap";
import EditInfantInc from "../../components/Control/ControlFollow/EditInfantInc";

export default function EditInfantIncome(){
    return(
        <Container>
             <h1 className="text-center">Editar Ingreso </h1>
            <EditInfantInc /> 
        </Container>
    )
}