import React from "react";
import { Container } from "react-bootstrap";
import AddInfantInc from "../../components/Control/ControlFollow/AddInfantInc";

export default function AddInfantIncome(){
    return(
        <Container>
             <h1 className="text-center">Añadir Ingreso </h1>
            <AddInfantInc /> 
        </Container>
    )
}