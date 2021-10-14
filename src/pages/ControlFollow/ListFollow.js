import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
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
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";
import useAuth from '../../hooks/useAuth';
import { getMotIncomeByUserApi } from "../../api/mother_income";

export default function ListFollow(){
    const { documento, rolUser } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listSeg, setListSeg ] = useState([]);
    const [ listInc, setListInc ] = useState([]);
    const [ listIncome, setListIncome ] = useState([]);
    const [ loadedPDF, setLoadedSonPDF ] = useState(false); 
    const [ loading, setLoading ] = useState(true);  
    const { user } = useAuth();


    /*useEffect(() => {
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
    }, []);*/

    useEffect(() => {
        (async () => {
            const response = await  getSegApi(documento, token);
            setLoading(false);
            if(response.length > 0){
                (async () => {
                    let newData = [];
                    let infoCompleted = await calculateProgress(response, newData);                              
                    console.log(infoCompleted);
                    console.log("siuuuuu");
                    setListSeg(infoCompleted);
                })()
            }

            const responseUser = await getUserByIdApi(documento, token);
            setLoading(false);
            console.log(responseUser);
            setInfoUser(responseUser);
            setLoadedSonPDF(true);

            const responseIncome = await getInfantIncomeApi(documento, token);
            setLoading(false);
            setListIncome(responseIncome);
            setLoadedSonPDF(true);
            


        })();       
        }, []);

        //console.log(listIncome[0].ingreso.nombreMedFormululada);
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    const calculateProgress = async (response, newData) => {
        await Promise.all(response.map(async (item, index) => {
            if(rolUser === "INFANTE"){
                let listIngresos = await getInfantIncomeApi(documento, token);
                console.log(listIngresos);
                let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === item.id);
                console.log(listIngresos);
                let totalOptions = 0;
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica === null){
                    totalOptions = 4;
                }else{
                    totalOptions = 5;
                }

                let optionsSelected = 0;

                if(ingresoBySeg[0].ingreso.afiliacionSgsss === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.saludOral === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica !== null){
                    if(ingresoBySeg[0].ingresoInfante.valoracionMedica === "SI"){
                        optionsSelected += 1;
                    };
                }
                if(ingresoBySeg[0].ingresoInfante.controlCyD === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.recibeSuplementos === "SI"){
                    optionsSelected += 1;
                };
               
                let percentageCompleted = (optionsSelected / totalOptions) * 100;
                item.estado = percentageCompleted.toString();
                item.ingreso = ingresoBySeg[0];
                newData.push(item);

            }else if(rolUser === "MADRE_GESTANTE"){
                let listIngresos = await getMotIncomeByUserApi(documento, token);
                console.log(listIngresos);
                let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === item.id);
                console.log(ingresoBySeg);
                let totalOptions = 6;
                let optionsSelected = 0;

                if(ingresoBySeg[0].ingreso.afiliacionSgsss === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.saludOral === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.controlPrenatal === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.cuentaMicro === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.examenMedico === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.metodoPlanificacion === "SI"){
                    optionsSelected += 1;
                };
                let percentageCompleted = (optionsSelected / totalOptions) * 100;
                item.estado = percentageCompleted.toString();
                item.ingreso = ingresoBySeg[0];
                newData.push(item);
            }
        }));
        console.log("espero padre");
        return newData;
    }

    return(
        <Container>
            <h1 className="text-center mb-4">Seguimientos de {infoUser ? infoUser.nombre : "Anonimo"}
                {rolUser === "INFANTE" && (
                    validatePrivilegio("REGISTRAR_SEGUIMIENTO").length > 0 && ("REGISTRAR_INGRESO_INFANTE").length > 0 
                    && ("LISTAR_SEGUIMIENTOS").length > 0 && (
                       <Link to={`/admin/addControlFollow/${documento}/${rolUser}`}>
                           <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                           <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Seguimiento </ReactTooltip>
                       </Link>
                   )
                )}
                 
            {rolUser === "MADRE_GESTANTE" && (
                validatePrivilegio("REGISTRAR_SEGUIMIENTO").length > 0 && ("REGISTRAR_INGRESO_MADRE").length > 0 
                && ("LISTAR_SEGUIMIENTOS").length > 0 && (
                    <Link to={`/admin/addControlFollow/${documento}/${rolUser}`}>
                        <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                        <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Seguimiento </ReactTooltip>
                     </Link>
                )
            )}
            </h1>
            {listSeg.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width="60%"
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listSeg.length > 0 && (
             <ListFollowUp  listSeg={listSeg} user={user} documento={documento} listInc={listInc} rolUser={rolUser}/>
            )}
        </Container>
    )
}