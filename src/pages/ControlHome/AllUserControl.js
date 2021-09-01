import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AllUserC from "../../components/Control/ControlHome/AllUserC"; 

export default function AllUserControl(){ 
    return(
        <Container>
            <h1 className="text-center">Listado de Infantes<FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4"/>
            </h1>
           <AllUserC />
        </Container>
    )
}