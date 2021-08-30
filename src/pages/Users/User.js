import React from "react";
import { Container } from "react-bootstrap";
import DetailsUser from "../../components/Users/DetailsUser/DetailsUser";

export default function User(){
    return(
        <Container>
            <h1 className="text-center">Detalles del usuario</h1>

            <DetailsUser />
        </Container>
    )
}