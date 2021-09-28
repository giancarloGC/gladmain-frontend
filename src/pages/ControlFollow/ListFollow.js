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


export default function ListFollow(){
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listSeg, setListSeg ] = useState([]);

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        getSegApi(documento, token).then(response => {
            setListSeg(response);
            
        });
    }, []);

    return(
        <Container>
            <h1 className="text-center mb-4">Seguimientos de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addControlFollow/${documento}`}>
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
             <ListFollowUp  listSeg={listSeg} documento={documento}/>
            )}
        </Container>
    )
}