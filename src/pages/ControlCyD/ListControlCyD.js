import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListControlCyDe from "../../components/Control/ControlCyD/ListControlCyDe";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';

export default function ListControlCyD(){
    return(
        <Container>
            <h1 className="text-center">Controles de Crec. y Des. de XXXXXX 
                <Link to="/admin/addControlCyD" >
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton1" />
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
                </Link>
                <Link to="/" >
                    <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
                    <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
                </Link>
            </h1>
            <ListControlCyDe />
        </Container>
    )
}