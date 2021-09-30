import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import StatisticMadreGestante from "../../components/Graphics/StatisticMadreGestante";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getControlNutriApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";

import "./StatisticHome.scss";

export default function StatisticHomeMadre(){
    const { documento, rolUser } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ listControls, setListControls ] = useState([]);

    useEffect(() => {
        getControlNutriApi(documento, token).then(response => {
            console.log(response);
            setListControls(response);   
        });
    }, []);

    return(
        <>
            <Container>
            <h1 className="text-center">IMC para la Edad Gestacional
            <Link to={`/admin/AddControlNutriMadre/${documento}/${rolUser}`} >
                <FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4" style = {{marginLeft:10}} data-tip data-for = "boton1" />
                <ReactTooltip id="boton1" place="bottom" type="dark" effect="float">Agregar Control Nutricional</ReactTooltip>
            </Link>
            </h1>
        {listControls.length > 0 ? (
        <>
          <StatisticMadreGestante listControls={listControls} token={token} documento={documento}/>
        </>
        )
        :
        (
            <>
            <p style={{"color": "#2D61A4", "font-size": 27}}>No se encontraron registros</p>
            <Lottie height={400} width={670}
                options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
            />
            </>
        )
        }
    </Container>
    </>
        
    )
}
