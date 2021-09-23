import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

import AllUserC from "../../components/Control/ControlHome/AllUserC"; 

export default function AllUserControl(){ 
    const { rolUser } = useParams();
    return(
        <Container>
            <h1 className="text-center">{rolUser === "MADRE_GESTANTE" ? "Listado de Madres Gestantes" : "Listado de Infantes"} </h1>
           <AllUserC rolUser={rolUser}/>
        </Container>
    )
}