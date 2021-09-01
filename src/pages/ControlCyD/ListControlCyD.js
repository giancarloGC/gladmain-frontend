import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListControlCyDe from "../../components/Control/ControlCyD/ListControlCyDe";
//import { getContVaccApi } from "../../api/vaccination";

export default function ListControlCyD(){
    return(
        <Container>
             <h1 className="text-center"> Controles de Crec. y Des. de XXXXXX <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4"
                    onClick={() => window.location.replace("/admin/addControlCyD")} 
                /> 
                <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" 
                    onClick={() => window.location.replace("/admin/imprimir")} 
                /> 
            </h1>
            <ListControlCyDe />
        </Container>
    )
}