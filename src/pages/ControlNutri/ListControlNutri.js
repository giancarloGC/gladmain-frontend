import React from "react";
import { Container } from "react-bootstrap";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
//import { getContVaccApi } from "../../api/vaccination";

export default function ListVac(){
    return(
        <Container>
             <h1 className="text-center">Controles Nutricionales de XXXXXX </h1>
            <ListControlN />
        </Container>
    )
}