import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faPrint, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { getSegApi } from "../../api/follow-up";
import ListFollowUp from "../../components/Control/ControlFollow/ListFollowUp";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";
import { getInfantIncomeApi } from "../../api/infant_income";
import { getMotIncomeByUserApi } from "../../api/mother_income";

export default function ListFollow(){
    const { documento, rolUser } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listSeg, setListSeg ] = useState([]);
    const [ listInc, setListInc ] = useState([]);

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        getSegApi(documento, token).then(response => {
            if(response.length > 0){
                (async () => {
                    let newData = [];
                    let infoCompleted = await calculateProgress(response, newData);                              
                    console.log(response);
                    console.log("siuuuuu");
                    setListSeg(infoCompleted);
                })()
            }
        });
    }, []);

    const calculateProgress = async (response, newData) => {
        await Promise.all(response.map(async (item, index) => {
            if(rolUser === "INFANTE"){
                let listIngresos = await getInfantIncomeApi(documento, token);
                console.log(listIngresos);
                let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === item.id);
                console.log(listIngresos);
                let totalOptions = 10;
                let optionsSelected = 0;

                if(ingresoBySeg[0].ingreso.afiliacionSgsss === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.conoceUrgencias === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.patologiaIdentificadaSgsss === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.recibeMedFormulada === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.saludOral === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.usuarioRemitido === "1"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.alarmaPreventiva === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.controlCyD === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.recibeSuplementos === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica === "SI"){
                    optionsSelected += 1;
                };
                let percentageCompleted = (optionsSelected / totalOptions) * 100;
                item.estado = percentageCompleted.toString();
                newData.push(item);

            }else if(rolUser === "MADRE_GESTANTE"){
                let listIngresos = await getMotIncomeByUserApi(documento, token);
                let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === item.id);
                console.log(listIngresos);
                let totalOptions = 10;
                let optionsSelected = 0;

                if(ingresoBySeg[0].ingreso.afiliacionSgsss === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.conoceUrgencias === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.patologiaIdentificadaSgsss === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.recibeMedFormulada === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.saludOral === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.usuarioRemitido === "1"){
                    optionsSelected += 1;
                };
                /*if(ingresoBySeg[0].ingresoInfante.alarmaPreventiva === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.controlCyD === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.recibeSuplementos === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica === "SI"){
                    optionsSelected += 1;
                };*/
                let percentageCompleted = (optionsSelected / totalOptions) * 100;
                item.estado = percentageCompleted.toString();
                newData.push(item);
            }
        }));
        console.log("espero padre");
        return newData;
    }

    return(
        <Container>
            <h1 className="text-center mb-4">Seguimientos de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addControlFollow/${documento}/${rolUser}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Seguimiento </ReactTooltip>
              </Link>
              
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton2" />
              <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
            </h1>
            {listSeg.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listSeg.length > 0 && (
             <ListFollowUp  listSeg={listSeg} documento={documento} listInc={listInc} rolUser={rolUser}/>
            )}
        </Container>
    )
}