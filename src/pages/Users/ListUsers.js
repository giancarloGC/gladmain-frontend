import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AllUsers from "../../components/Users/AllUsers/AllUsers";

export default function ListUsers(){ 
    return(
        <Container>
            <h1 className="text-center">Lista de Usuarios<FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4"
                    onClick={() => window.location.replace("/admin/addUser")}
            />
            </h1>
            <AllUsers />
        </Container>
    )
}