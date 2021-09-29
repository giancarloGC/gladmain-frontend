import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListControlR from "../../components/Control/ControlFollow/ListControlR";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useParams } from "react-router-dom";
import { getRemisByUserApi } from "../../api/remission";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";


export default function ListControlRemission(){
  const { idSeg, documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState(null);
  const [ listRemis, setListRemis ] = useState([]);

  useEffect(() => {
      getUserByIdApi(documento, token).then(responseUser => {
          setInfoUser(responseUser);
      });
      getRemisByUserApi(documento, token).then(response => {
          console.log(response);
          setListRemis(response);
      });
  }, []);

    return(
        <Container>
            <h1 className="text-center mb-4">Remisiones de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addControlRemission/${idSeg}/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nueva Remision </ReactTooltip>
              </Link>
              
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
              <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
            </h1>
            
            {listRemis.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listRemis.length > 0 && (
             <ListControlR  listRemis={listRemis} idSeg={idSeg} documento={documento}/>
            )}
                        
        </Container>
    )
}