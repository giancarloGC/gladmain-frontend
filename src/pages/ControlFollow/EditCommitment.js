import React from "react";
import { Container } from "react-bootstrap";
import EditCommit from "../../components/Control/ControlFollow/EditCommit";

export default function EditCommitment(){
    return(
        <Container>
             <h1 className="text-center">Editar Compromiso </h1>
            <EditCommit />
        </Container>
    )
}