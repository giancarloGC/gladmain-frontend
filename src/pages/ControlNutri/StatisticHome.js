import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import StatisticNutri from "../../components/Graphics/StatisticNutri";
import StatisticTallaEdad from "../../components/Graphics/StatisticTallaEdad";
import StatisticPesoEdad from "../../components/Graphics/StatisticPesoEdad";
import StatisticImcEdad from "../../components/Graphics/StatisticImcEdad";
import StatisticPesoTalla2a5 from "../../components/Graphics/StatisticPesoTalla2a5";
import StatisticTallaEdad2a5 from "../../components/Graphics/StatisticTallaEdad2a5";
import StatisticPesoEdad2a5 from "../../components/Graphics/StatisticPesoEdad2a5";
import StatisticImcEdad2a5 from "../../components/Graphics/StatisticImcEdad2a5";
import StatisticTallaEdad5a17 from "../../components/Graphics/StatisticTallaEdad5a17";

import "./StatisticHome.scss";

export default function StatisticHome(){
    const {edad} = useParams();
    const {sexo} = useParams();
    const {documento} = useParams();
    const [ optionsGraphics, setOptionsGraphics] = useState({ check1: true, check2: false, check3: false, check4: false });

    const handleCheck = (e, item) => {
        console.log(e);
        console.log(item);
        if(e.target.checked){
            if(item === "check1"){
                setOptionsGraphics({check1: true, check2: false, check3: false, check4: false });
            } else if(item === "check2"){
                setOptionsGraphics({check1: false, check2: true, check3: false, check4: false });
            } else if(item === "check3"){
                setOptionsGraphics({check1: false, check2: false, check3: true, check4: false });
            } 
            else{
                setOptionsGraphics({check1: false, check2: false, check3: false, check4: true });
            }
        }
    } 

    return(
        <Container>
            <h1 className="text-center">Patrones de Crecimiento Infantil de la OMS
                <Link to={`/admin/addControlNutri/${documento}`} >
                    <FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4" style = {{marginLeft:10}} data-tip data-for = "boton1" />
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float">Agregar Control Nutricional</ReactTooltip>
                </Link>
           </h1>
            <center className="select">
                {edad <= 24 && (
                    <Form.Check type="checkbox" inline label="Peso para la Talla" checked={optionsGraphics.check1} onChange={(e) => handleCheck(e, "check1")}/>
                )}
        
                <Form.Check type="checkbox" inline label="Talla para la Edad" checked={optionsGraphics.check2} onChange={(e) => handleCheck(e, "check2")}/>
                
                {edad <= 24 && (
                    <>
                <Form.Check type="checkbox" inline label="Peso para la Edad" checked={optionsGraphics.check3} onChange={(e) => handleCheck(e, "check3")}/>
                <Form.Check type="checkbox" inline label="IMC para la Edad" checked={optionsGraphics.check4} onChange={(e) => handleCheck(e, "check4")}/>
                    </>
                )}
            </center>
            
            {optionsGraphics.check1 && (
                <>
                    {edad <= 24 && (
                        <StatisticNutri sexo={sexo}/>
                    )}
                    {edad > 24 && edad <= 60 && (
                        <StatisticPesoTalla2a5 sexo={sexo}/>
                    )}
                </>
            )
            }
            {optionsGraphics.check2 &&
                <>
                    {edad <= 24 && (
                        <StatisticTallaEdad sexo={sexo}/>
                    )}
                    {edad > 24 && edad <= 60 && (
                        <StatisticTallaEdad2a5 sexo={sexo}/>
                    )}
                    {edad > 60 && edad <= 204 && (
                        <StatisticTallaEdad5a17 sexo={sexo}/>
                    )}
                </>
            }
            {optionsGraphics.check3 &&
                <>
                    {edad <= 24 && (
                        <StatisticPesoEdad sexo={sexo}/>
                    )}
                    {edad > 24 && edad <= 60 && (
                        <StatisticPesoEdad2a5 sexo={sexo}/>
                    )}
                </>
            }
            {optionsGraphics.check4 &&
                <>
                    {edad <= 24 && (
                        <StatisticImcEdad sexo={sexo}/>
                    )}
                    {edad > 24 && edad <= 60 && (
                        <StatisticImcEdad2a5 sexo={sexo}/>
                    )}
                </>
            }
        </Container>
    )
}





    
