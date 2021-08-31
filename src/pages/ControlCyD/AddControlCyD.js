import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddControlCD from "../../components/Control/ControlCyD/AddControlCD"; 

export default function AddControlCyD(){ 
    return(
        <Container>
            <h1 className="text-center">Formulario para añadir Control de Crecimiento y Desarrollo<FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4"/>
            </h1>
            <AddControlCD />
        </Container>
    )
}