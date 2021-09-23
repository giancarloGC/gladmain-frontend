import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import moment from "moment";

import "./StatisticNutri.scss";

export default function StatisticImcEdad2a5(props){
const { sexo, listControls } = props;
  const generateCoordenadas = () => {
    let coordenadas = [];
    let lineasArray = lineas();
  
    listControls.map((item, index) => {
      var coor = {
        label: `Control ${item.id} - ${moment(item.fechaControl).format("DD-MM-YYYY")}`,
        data: [{
          y: item.imc,
          x: item.meses,
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
  labels: [ 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60 ],
  datasets: generateCoordenadas()
};

    return(
        <Container>
            {sexo === "MASCULINO" ?
                <h2 className="text-center">IMC para la Edad Niños </h2>
              : 
              <h2 className="text-center">IMC para la Edad Niñas </h2>
            }
             <center>
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
            </center>
            <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE"}}> 
             <div className="containerGraphic"> 
                  <p className="ejey">IMC(kg/m^2)</p>
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
                            min: 24,
                            max: 60
                          }
                        }
                      }}
                  />
                </div>
                </div>
                <p className="ejex">Edad (en meses y años cumplidos)</p>
              </div>
        </Container>
    )


    function lineas(){
    return[
    {
      label: '- 2',
      data: [ 13.8,13.75,13.67,13.58,13.5,13.42,13.35,13.3,13.25,13.2,13.15,13.1,13.05,13.03,13,12.96,12.94,12.9,12.89 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
      tension: 0.1,
    },
    {
      label: '- 1',
      data: [ 14.85,14.79,14.7,14.62,14.55,14.48,14.4,14.35,14.3,14.25,14.2,14.15,14.12,14.1,14.08,14.05,14.01,14,13.99 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
      tension: 0.1,
    },
    {
      label: '0',
      data: [ 16.05,15.96,15.88,15.8,15.71,15.64,15.58,15.5,15.45,15.4,15.38,15.35,15.33,15.3,15.28,15.25,15.24,15.22,15.2 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
      tension: 0.1,
    },
    {
      label: '+ 1',
      data: [ 17.35,17.29,17.2,17.1,17.02,16.96,16.9,16.85,16.8,16.75,16.72,16.7,16.68,16.65,16.62,16.6,16.6,16.6,16.6 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
      tension: 0.1,
    },
    {
      label: '+ 2',
      data: [ 18.85,18.75,18.65,18.56,18.48,18.4,18.35,18.3,18.25,18.2,18.17,18.15,18.15,18.15,18.17,18.18,18.21,18.25,18.28 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
      tension: 0.1,
      borderDash: [10,5]
    },
    {
      label: '+ 3',
      data: [ 20.6, 20.48, 20.35, 20.21, 20.1, 20, 19.93, 19.86, 19.81, 19.8, 19.8, 19.8, 19.82, 19.87, 19.94, 20, 20.07, 20.15, 20.25 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
      tension: 0.1,
    }
  ]
}
}