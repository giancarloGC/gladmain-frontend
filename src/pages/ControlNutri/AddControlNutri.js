import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddControlN from "../../components/Control/ControlNutri/AddControlN"; 

export default function AddControlNutri(){ 
    return(
        <Container>
            <h1 className="text-center">Formulario de añadir Control Nutricional<FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4"/>
            </h1>
            <AddControlN />
        </Container>
    )
}