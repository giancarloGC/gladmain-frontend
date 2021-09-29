import React from 'react';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import UsersDesnutrition from "../../components/Users/UsersDesnutrition/UsersDesnutrition";

export default function ListUserDesnutrition(){ 
    return(
        <Container>
            <h1 className="text-center">Usuarios en Desnutrición</h1>
            <UsersDesnutrition/>
        </Container>
    )
}