import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import FormUser from "../../components/Users/FormUser/FormUser"; 

export default function AddUser(){ 
    return(
        <Container>
            <h1 className="text-center">Añadir usuario</h1>
            <FormUser />
        </Container>
    )
}