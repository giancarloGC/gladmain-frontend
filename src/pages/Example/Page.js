import React from "react";
import { Container } from "react-bootstrap";
import PageC from "../../components/Example/PageC";

export default function Page(){
    return(
        <Container>
            <h1 className="text-center">Formulario de añadir usuario</h1>
            <PageC />
        </Container>
    )
}