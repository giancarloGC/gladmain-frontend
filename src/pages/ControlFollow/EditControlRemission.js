import React from "react";
import { Container } from "react-bootstrap";
import EditControlR from "../../components/Control/ControlFollow/EditControlR";

export default function EditControlRemission(){
    return(
        <Container>
             <h1 className="text-center">Editar Remisión </h1>
            <EditControlR />
        </Container>
    )
}