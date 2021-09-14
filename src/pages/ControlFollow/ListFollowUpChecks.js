import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListInfantInc from "../../components/Control/ControlFollow/ListInfantInc";
import ListControlR from "../../components/Control/ControlFollow/ListControlR";
import ListCommitment from "../../components/Control/ControlFollow/ListCommitment";
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

  const { documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState(null);
  const [ listControls, setListControls ] = useState([]);

  useEffect(() => {
      getUserByIdApi(documento, token).then(responseUser => {
          setInfoUser(responseUser);
      });
      getInfantIncomeApi(documento, token).then(response => {
          console.log(response);
          setListControls(response);
      });
  }, []);

  const [ optionsLists, setOptionsLists] = useState({ check1: true, check2: false, check3: false});

    const handleCheck = (e, item) => {
        console.log(e);
        console.log(item);
        if(e.target.checked){
            if(item === "check1"){
              setOptionsLists({check1: true, check2: false, check3: false});
            } else if(item === "check2"){
              setOptionsLists({check1: false, check2: true, check3: false});
            } else{
              setOptionsLists({check1: false, check2: false, check3: true});
            } 
        }
    }

    return(
        <Container>
            <h1 className="text-center mb-4">Controles de Seguimiento de {infoUser ? infoUser.nombre : "Anonimo"}
              <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton1" />
              <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
          
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
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
            <center>
            <Form.Check type="checkbox" inline label="Controles de Ingreso" checked={optionsLists.check1} onChange={(e) => handleCheck(e, "check1")} className="mb-4"/>
            <Form.Check type="checkbox" inline label="Controles de Remisión" checked={optionsLists.check2} onChange={(e) => handleCheck(e, "check2")} className="mb-4"/>
            <Form.Check type="checkbox" inline label="Controles de Compromisos" checked={optionsLists.check3} onChange={(e) => handleCheck(e, "check3")} className="mb-4"s/>
            </center>

            {listControls.length > 0  && optionsLists.check1 && (
              <ListInfantInc  listControls={listControls}/>
            )}

            {optionsLists.check2 &&
                <ListControlR />
            }
            {optionsLists.check3 &&
                <ListCommitment />
            }
        </Container>
    )
}