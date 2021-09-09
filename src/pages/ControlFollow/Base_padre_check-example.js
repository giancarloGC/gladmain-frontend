import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import StatisticNutri from "../../components/Graphics/StatisticNutri";
import StatisticTallaEdad from "../../components/Graphics/StatisticTallaEdad";
import StatisticPesoEdad from "../../components/Graphics/StatisticPesoEdad";
import StatisticImcEdad from "../../components/Graphics/StatisticImcEdad";
import StatisticPesoTalla2a5 from "../../components/Graphics/StatisticPesoTalla2a5";
import StatisticTallaEdad2a5 from "../../components/Graphics/StatisticTallaEdad2a5";
import StatisticPesoEdad2a5 from "../../components/Graphics/StatisticPesoEdad2a5";
import StatisticImcEdad2a5 from "../../components/Graphics/StatisticImcEdad2a5";
import StatisticTallaEdad5a17 from "../../components/Graphics/StatisticTallaEdad5a17";

export default function StatisticHome(){
    
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
            <h1 className="text-center">Patrones de Crecimiento Infantil de la OMS</h1>
            <Form.Check type="checkbox" inline label="Peso para la Talla" checked={optionsGraphics.check1} onChange={(e) => handleCheck(e, "check1")}/>
            <Form.Check type="checkbox" inline label="Talla para la Edad" checked={optionsGraphics.check2} onChange={(e) => handleCheck(e, "check2")}/>
            <Form.Check type="checkbox" inline label="Peso para la Edad" checked={optionsGraphics.check3} onChange={(e) => handleCheck(e, "check3")}/>
            <Form.Check type="checkbox" inline label="IMC para la Edad" checked={optionsGraphics.check4} onChange={(e) => handleCheck(e, "check4")}/>
            
            {optionsGraphics.check1 &&
                /*edad < 24 && (
                    <StatisticNutri />
                ) */  
                <StatisticNutri />
            }
            {optionsGraphics.check2 &&
                <StatisticTallaEdad />
            }
            {optionsGraphics.check3 &&
                <StatisticPesoEdad />
            }
            {optionsGraphics.check4 &&
                <StatisticImcEdad />
            }
        </Container>
    )
}