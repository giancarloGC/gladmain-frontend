import React from "react";
import { Container } from "react-bootstrap";
import AddControlF from "../../components/Control/ControlFollow/AddControlF";

export default function AddControlFollow(){
    return(
        <Container>
             <h1 className="text-center">Añadir Seguimiento </h1>
            <AddControlF />
        </Container>
    )
}