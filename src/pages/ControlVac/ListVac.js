import React from "react";
import { Container } from "react-bootstrap";
import ListV from '../../components/Control/ControlVac/ListV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";

export default function ListVac(){
    return(
        <Container>
            <h1 className="text-center">Controles Vacunas <Link to="/admin/addControlVac" >
              <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4"/></Link>
            </h1>
            <ListV />
        </Container>
    )
}