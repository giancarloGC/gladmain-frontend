import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListInfantInc from "../../components/Control/ControlFollow/ListInfantInc";
import ListControlR from "../../components/Control/ControlFollow/ListControlR";
import ListCommitIncome from "../../components/Control/ControlFollow/ListCommitIncome";
import ListOtherCommit from "../../components/Control/ControlFollow/ListOtherCommit";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import {Row, Form} from "react-bootstrap";

export default function ListFollowUpChecks(){
    return(
        <Container>
            <h1 className="text-center mb-5">Controles de Seguimiento
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton1" />
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
                
                    <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
                    <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
               
            </h1>
            <Form.Group as={Row} className="mb-1">
                    <div class="middle">
                      <label>
                      <input type="radio" name="radio" checked/>
                      <div class="front-end box">
                        <span>Compromiso por factores de riesgo en ingreso</span>
                      </div>
                      </label>

                      <label>
                      <input type="radio" name="radio"/>
                      <div class="back-end box">
                        <span>Otros Compromisos</span>
                      </div>
                      </label>
                    </div>
                    </Form.Group>
                    <ListOtherCommit />
            {/*<ListCommitIncome />
            <ListControlR />
            <ListInfantInc />
            */}
        </Container>
    )
}