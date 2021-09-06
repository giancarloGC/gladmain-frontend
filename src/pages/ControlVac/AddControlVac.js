import React from "react";
import { Container } from "react-bootstrap";
import AddControlV from "../../components/Control/ControlVac/AddControlV";

export default function AddControlVac(){
    return(
        <Container>
            <h1 className="text-center">Añadir Control de Vacunación</h1>
            <AddControlV />
        </Container>
    )
}