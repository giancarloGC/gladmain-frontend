import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListControlCyDe from "../../components/Control/ControlCyD/ListControlCyDe";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { TOKEN } from "../../utils/constans";
import { getUserByIdApi } from "../../api/user";
import { getControlCyDApi, getLatestCyDApi } from "../../api/controls";
import { useParams } from "react-router-dom";

export default function ListControlCyD(){
    
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listControls, setListControls ] = useState([]);
    const [ lastControls, setLastControls ] = useState({});
    const [loaded, setLoaded] = useState(false); 


console.log(lastControls);
    useEffect(() => {
        getLatestCyDApi(documento, token).then(response => {
            console.log(response);
            setLastControls(response);
        });
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        getControlCyDApi(documento, token).then(response => {
            console.log(response);
            setListControls(response);
        });
        setLoaded(true);
    }, []);

    return(
        <Container>
            <h1 className="text-center">Controles de Crec. y Des. de {infoUser ? infoUser.nombre : "Anonimo"}
                <Link to={`/admin/addControlCyD/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
                </Link>
                <Link to="/" >
                    <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boto" />
                    <ReactTooltip id="boto" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
                </Link>
            </h1>
            
            {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "font-size": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listControls.length > 0 && loaded && (
                <ListControlCyDe lastControls={lastControls} listControls={listControls}/>
             )
}
        </Container>
    )
}