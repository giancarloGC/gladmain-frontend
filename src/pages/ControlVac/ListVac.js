import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListV from "../../components/Control/ControlVac/ListV";
import { useParams } from "react-router-dom";
import { getContVaccApi } from "../../api/vaccination";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faPrint } from '@fortawesome/free-solid-svg-icons';

export default function ListVac(){
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listControls, setListControls ] = useState([]);

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        getContVaccApi(documento, token).then(response => {
            console.log(response);
            setListControls(response);
            
        });
    }, []);

    return(
        <Container>
             <h1 className="text-center">Control de Vacunas de {infoUser ? infoUser.nombre : "Anonimo"} 
             <Link to={`/admin/addControlVac/${documento}`} >
                    <FontAwesomeIcon icon={faMarker} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton1" />
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Editar Control </ReactTooltip>
                </Link>
                <Link to="/" >
                    <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
                    <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
                </Link>
             </h1>
             {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}

             {listControls.length > 0  && (
                <ListV listControls={listControls} fechaNacimiento={infoUser.fechaNacimiento}/>
             )}
        </Container>
    )
}