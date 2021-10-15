import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import EditInfantInc from "../../components/Control/ControlFollow/EditInfantInc";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getInfantIncomeApi } from "../../api/infant_income";
import { TOKEN } from "../../utils/constans";
import { getUserByIdApi } from "../../api/user";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";


export default function EditInfantIncome(){
    const { idSeg, documento, rolUser} = useParams();
    const [ ingreso, setIngreso ] = useState(null);
    const token = localStorage.getItem(TOKEN);
    const [ showValidationM, setShowValidationM ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    const { user } = useAuth(); //privilegios

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        (async () => {
            let listIngresos = await getInfantIncomeApi(documento, token);
            let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === parseInt(idSeg));
            getUserByIdApi(documento, token).then(response => {
                if(response.sexo === "FEMENINO"){
                    setShowValidationM(true);
                }else{
                    if(response.edad < 1){
                        setShowValidationM(true);
                    }
                }
            });
            setIngreso(ingresoBySeg[0]);
        })();
    }, [])

    if(validatePrivilegio("ACTUALIZAR_SEGUIMIENTO").length === 0){
        return(
            <>
                <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                    <Lottie height={500} width="65%"
                    options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
            </>
        )
    }else if(validatePrivilegio("ACTUALIZAR_INGRESO_INFANTE").length === 0){
        return(
            <>
                <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                    <Lottie height={500} width="65%"
                    options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
            </>
        )
    }else{
        return(
            <Container>
                <h1 className="text-center">Editar Ingreso </h1>
                {ingreso && (
                    <EditInfantInc idSeg={idSeg} documento={documento} showValidationM={showValidationM} ingreso={ingreso} rolUser={rolUser} />
                )} 
            </Container>
        )
    }
}