import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import EditInfantInc from "../../components/Control/ControlFollow/EditInfantInc";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getInfantIncomeApi } from "../../api/infant_income";
import { TOKEN } from "../../utils/constans";


export default function EditInfantIncome(){
    const { idSeg, documento} = useParams();
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);

    useEffect(() => {
        (async () => {
            let listIngresos = await getInfantIncomeApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            console.log(ingresoBySeg);
            setIngreso(ingresoBySeg[0]);
        })();
    }, [])

    return(
        <Container>
             <h1 className="text-center">Editar Ingreso </h1>
            {ingreso && (
                <EditInfantInc ingreso={ingreso} />
            )} 
        </Container>
    )
}