import React from "react";
import { Container } from "react-bootstrap";
import EditControlF from "../../components/Control/ControlFollow/EditControlF";

export default function AddControlFollow(){
    return(
        <Container>
             <h1 className="text-center">Editar Seguimiento </h1>
            <EditControlF />
        </Container>
    )
}