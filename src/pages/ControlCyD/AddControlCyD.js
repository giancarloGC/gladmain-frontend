import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddControlCD from "../../components/Control/ControlCyD/AddControlCD"; 

export default function AddControlCyD(){ 
    return(
        <Container>
            <h1 className="text-center">Añadir Control de Crecimiento y Desarrollo</h1>
            <AddControlCD />
        </Container>
    )
}