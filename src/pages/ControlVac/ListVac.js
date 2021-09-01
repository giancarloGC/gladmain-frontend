import React from "react";
import { Container } from "react-bootstrap";
import ListV from '../../components/Control/ControlVac/ListV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//import { getContVaccApi } from "../../api/vaccination";

export default function ListVac(){
    return(
        <Container>
             <h1 className="text-center">Controles Vacunas <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4"
                    onClick={() => window.location.replace("/admin/addControlNutri")} 
                /> 
            </h1>
            <ListV />
        </Container>
    )
}