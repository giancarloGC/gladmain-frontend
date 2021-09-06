import React from "react";
import { Container } from "react-bootstrap";
import ListV from '../../components/Control/ControlVac/ListV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';

export default function ListVac(){
    return(
        <Container>
            <h1 className="text-center">Controles Vacunas 
                <Link to="/admin/addControlVac" >
                    <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4" style = {{marginLeft:10}} data-tip data-for = "boton1" />
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
                </Link>
            </h1>
            <ListV />
        </Container>
    )
}