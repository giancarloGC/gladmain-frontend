import React from 'react';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import AllUsers from "../../components/Users/AllUsers/AllUsers";


export default function ListUsers(){ 
    return(
        <Container>
            <h1 className="text-center">Lista de Usuarios <Link to="/admin/addUser" ><FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4"
            />
            </Link>
            <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Agregar Nuevo Usuario </ReactTooltip>
            </h1>
            <AllUsers />
        </Container>
    )
}