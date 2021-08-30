import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import FormUser from "../../components/Users/FormUser/FormUser"; 

export default function AddUser(){ 
    return(
        <Container>
            <h1 className="text-center">Formulario de añadir usuario<FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4"/>
            </h1>
            <FormUser />
        </Container>
    )
}