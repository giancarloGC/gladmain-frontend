import React from "react";
import { Container } from "react-bootstrap";
import AddControlR from "../../components/Control/ControlFollow/AddControlR";

export default function AddControlRemission(){
    return(
        <Container>
             <h1 className="text-center">Añadir Remisión </h1>
            <AddControlR />
        </Container>
    )
}