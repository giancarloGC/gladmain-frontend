import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListInfantInc from "../../components/Control/ControlFollow/ListInfantInc";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import {Row, Form} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getInfantIncomeApi } from "../../api/infant_income";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";


export default function ListFollowUpChecks(){

  const { documento, idSeg } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState(null);
  const [ listControls, setListControls ] = useState([]);

  useEffect(() => {
      getUserByIdApi(documento, token).then(responseUser => {
          setInfoUser(responseUser);
      });
      getInfantIncomeApi(documento, token).then(response => {
          console.log(response);
          //setListControls(response);
      });
  }, []);

  const [ optionsLists, setOptionsLists] = useState({ check1: true, check2: false, check3: false});

    return(
        <Container>
            <h1 className="text-center mb-4">Seguimientos de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addControlFollow/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
              </Link>
              
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton2" />
              <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
            </h1>
            {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listControls.length > 0 && (

             <ListInfantInc  listControls={listControls} documento={documento}/>
            )}
        </Container>
    )
}