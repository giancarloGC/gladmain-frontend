import React from "react";
import { Container } from "react-bootstrap";
import AddCommit from "../../components/Control/ControlFollow/AddCommit";

export default function AddCommitment(){
    return(
        <Container>
             <h1 className="text-center">Añadir Compromiso </h1>
            <AddCommit />
        </Container>
    )
}