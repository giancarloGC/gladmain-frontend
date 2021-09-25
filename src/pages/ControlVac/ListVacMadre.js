import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import ListVMadre from "../../components/Control/ControlVac/ListVMadre";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getContVaccApi } from "../../api/vaccination";


export default function ListVacMadre(){ 
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [userControl, setUser] = useState({});
    const [ listControls, setListControls ] = useState([]);
    const [loaded, setLoaded] = useState(false); 
    

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setUser(responseUser);
        });
        getContVaccApi(documento, token).then(response => {
            setListControls(response);
        });
        setLoaded(true);
    }, []);

    return(
        <Container>
            <h1 className="text-center">Controles de Vacunacion de {userControl ? userControl.nombre : "Anonimo"}
                <Link to={`/admin/addControlVacMadre/${documento}`}>
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
                <ListVMadre listControls={listControls}/>
             )
}
        </Container>        
    )
}