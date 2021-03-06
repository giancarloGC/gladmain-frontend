import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import UsersDesnutrition from "../../components/Users/UsersDesnutrition/UsersDesnutrition";
import { getUserByIdApi, listUsersByRol } from "../../api/user";
import { getControlNutriApi, getControlCyDApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";

export default function ListUserDesnutrition(){
    const token = localStorage.getItem(TOKEN);
    const [ usersApi, setUsersApi ] = useState([]);
    const [ allUsersSaved, setAllUsersSaved ] = useState([]);

    const [ usersLoaded, setUsersLoaded ] = useState(false);

    useEffect(() => {
        (async () => {
            consultInfantes();
        })()
    }, []); 


    const consultInfantes = async () => {
        const responseUsers = await listUsersByRol("INFANTE", token);
        let totalUsersDesnutri = [];
        await Promise.all(responseUsers.map(async (userInfant, index) => {
            let result = await consultControls(userInfant.documento);
            console.log(result);
            if(result){
                let documentEstado = result.split("/");
                let docu = documentEstado[0];
                let infouser = await getUserByIdApi(docu, token);
                infouser.estado = documentEstado[1];
                totalUsersDesnutri.push(infouser);
            };
        }));

        setUsersApi(totalUsersDesnutri);
        setAllUsersSaved(totalUsersDesnutri);

        setUsersLoaded(true);
    }

    const consultControls = async (documentoInf) => {
        const responseControls = await getControlNutriApi(documentoInf, token);
        if(responseControls.length > 0){
            let enDesnutricion = false;
            let doc = 0;
            for(var i = 0; i < responseControls.length; i++ ){
                if(enDesnutricion === false){
                    if(responseControls[i].vigente === true && (responseControls[i].estadoNutricional === "Riesgo de Desnutrici??n Aguda" 
                    || responseControls[i].estadoNutricional === "Desnutrici??n Aguda Moderada" || responseControls[i].estadoNutricional === "Desnutrici??n Aguda Severa")){
                        doc = responseControls[i].idUsuario + "/" + responseControls[i].estadoNutricional;
                        enDesnutricion = true;
                    }else{
                        doc = 0;
                    }
                }
            };
            return doc;
        };
    }

    return(
        <Container>
            <h1 className="text-center">Usuarios en Desnutrici??n</h1>
            {!usersLoaded ? (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            ):(
                <UsersDesnutrition usersApi={usersApi} setUsersApi={setUsersApi} allUsersSaved={allUsersSaved} setAllUsersSaved={setAllUsersSaved} />
            )}
        </Container>
    )
}