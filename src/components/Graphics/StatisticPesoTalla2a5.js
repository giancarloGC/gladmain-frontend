import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { lineasGraphics2_5 } from "../Control/ControlNutri/LabelsAndLineas2-5";
import "./StatisticNutri.scss";
import moment from 'moment';

export default function StatisticPesoTalla2a5(props){
  const { sexo, listControls } = props;

  const generateCoordenadas = () => {
    let coordenadas = [];
    let lineasArray = lineas();
  
    listControls.map((item, index) => {
      var coor = {
        label: `Control ${item.id} - ${moment(item.fechaControl).format("DD-MM-YYYY")}`,
        data: [{
          y: item.peso,
          x: item.talla,
          r: 3
        }],
        borderColor: sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
        backgroundColor: sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
        type: "bubble",
        pointStyle: "bubble", 
      }
      coordenadas.push(coor);
    });
  
    const allCoordenadas = [...coordenadas, ...lineasArray];
    return allCoordenadas;
  } 

const data = {
    labels: [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
      81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 
      98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
      112, 113, 114, 115, 116, 117, 118, 119, 120],
    datasets: generateCoordenadas()
  };
    return(
        <Container>
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Peso para la Talla Niños </h2>
              : 
              <h2 className="text-center">Peso para la Talla Niñas </h2>
             }
             <center>
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
             </center>
             <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE"}}> 
              <div className="containerGraphic"> 
                    <p className="ejey">Peso(kg)</p>
                <div style={{"max-width": "800px", "text-align":"center"}} style={{"backgroundColor": "white"}}>
                <Line 
                    data={data}
                    height={500}
                    width={800}
                    options={{
                      pointStyle: "line",
                      responsive: true,
                      scales: {
                        x: {
                          type: 'linear',
                          position: 'bottom',
                          min: 65,
                        }
                      }
                    }}
                />
                </div>
              </div>
                <p className="ejex">Talla(cm)</p>
             </div>
        </Container>
    )

    function lineas(){
      return [{
        label: '- 3',
        data: lineasGraphics2_5.lineMenosTres,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: lineasGraphics2_5.lineMenosDos,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: lineasGraphics2_5.lineMenosUno,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1
      },
      {
        label: '0',
        data: lineasGraphics2_5.lineCero,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: lineasGraphics2_5.lineMasUn,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: lineasGraphics2_5.lineMasDos,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: lineasGraphics2_5.lineMasTres,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1
      }
    ]
  }
}