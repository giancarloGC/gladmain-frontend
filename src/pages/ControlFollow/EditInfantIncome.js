import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import EditInfantInc from "../../components/Control/ControlFollow/EditInfantInc";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getInfantIncomeApi } from "../../api/infant_income";
import { TOKEN } from "../../utils/constans";
import { getUserByIdApi } from "../../api/user";


export default function EditInfantIncome(){
    const { idSeg, documento, rolUser} = useParams();
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);
    const [ showValidationM, setShowValidationM ] = useState(false);

    useEffect(() => {
        (async () => {
            let listIngresos = await getInfantIncomeApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            getUserByIdApi(documento, token).then(response => {
                if(response.sexo === "FEMENINO"){
                    setShowValidationM(true);
                }else{
                    if(response.edad <= 1){
                        setShowValidationM(true);
                    }
                }
            });
            setIngreso(ingresoBySeg[0]);
        })();
    }, [])

    return(
        <Container>
             <h1 className="text-center">Editar Ingreso </h1>
            {ingreso && (
                <EditInfantInc idSeg={idSeg} documento={documento} showValidationM={showValidationM} ingreso={ingreso} rolUser={rolUser} />
            )} 
        </Container>
    )
}