import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import { lineasGraphics } from "../Control/ControlNutri/LabelsAndLineas";
import moment from 'moment';

import "./StatisticNutri.scss";

export default function StatisticNutri(props){
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
        r: 15
      }],
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#A80B42',
      backgroundColor: sexo !== "FEMENINO" ? '#5746D4' : 'rgba(212, 70, 130, 0.52)',//#D44682',
      type: "bubble",
      pointStyle: "bubble", 
    }
    coordenadas.push(coor);
  });

  const allCoordenadas = [...lineasArray, ...coordenadas];
  return allCoordenadas;
} 

//let lineasGraphics = {
  /*lineMenosTres: [1.8, 2.5, 3.5, 4.6, 5.7, 6.6, 7.5, 8.2, 9.1, 10, 10.9, 11.9, 13, 14],
  lineMenosDos: [2.1, 2.8, 3.8, 5.1, 6.2, 7.2, 8, 8.9, 9.8, 10.8, 11.8, 12.8, 14, 15.4 ],
  lineMenosUno: [2.3, 3, 4.1, 5.4, 6.7, 7.7, 8.8, 9.6, 10.6, 11.8, 12.8, 13.9, 15.3, 16.7],
  lineCero: [2.4, 3.2, 4.5, 5.9, 7.2, 8.5, 9.5, 10.4, 11.5, 12.6, 13.8, 15, 16.5, 18.1],
  lineMasUno: [2.6, 3.6, 4.9, 6.5, 7.8, 9.1, 10.2, 11.3, 12.5, 13.6, 15, 16.5, 18, 20],
  lineMasDos: [3, 3.9, 5.5, 7, 8.5, 10, 11.1, 12.3, 13.5, 15, 16.3, 17.9, 19.6, 22],
  lineMasTres: [3.3, 4.4, 5.9, 7.7, 9.5, 10.9, 12.4, 13.5, 14.8, 16.4, 17.9, 19.5, 21.6, 24]*/
/*
  lineMenosTres: [
    1.8, 2, 2.1, 2.25, 2.4, 2.5, 2.6, 2.8, 3.1, 3.35, 3.5,
    3.75, 3.90, 4, 4.2, 4.45, 4.6, 4.9, 5.1, 5.35, 5.5, 
    5.65, 5.85, 6, 6.25, 6.4, 6.6, 6.8, 7, 7.2, 7.35, 
    7.65, 7.75, 7.95, 8, 8.2, 8.35, 8.5, 8.6, 8.9, 9,
    9.3, 9.5, 9.6, 9.85, 10, 10.3, 10.5, 10.6, 10.8, 11,
    11.2, 11.4, 11.5, 11.7, 12, 12.2, 12.4, 12.5, 12.8, 13, 
    13.2, 13.5, 13.7, 13.9, 14.1
  ],
  lineMenosDos: [
    2, 2.15, 2.25, 2.4, 2.6, 2.8, 2.95, 3.15, 3.35, 3.6, 
    3.75, 4.05, 4.25, 4.5, 4.75, 5, 5.3, 5.55, 5.75, 5.95, 6.15, 6.4, 
    6.6, 6.75, 7, 7.15, 7.35, 7.5, 7.65, 7.8, 8, 
    8.1, 8.4, 8.5, 8.7, 8.9, 9, 9.2, 9.4, 9.6, 9.75, 
    10, 10.2, 10.4, 10.55, 10.8, 11.05, 11.25, 11.48, 11.65, 11.8, 
    12, 12.25, 12.45, 12.7, 12.85, 13.15, 13.35, 13.55, 13.75, 14, 
    14.25, 14.5, 14.8, 15.1, 15.3 
  ],
  lineMenosUno: [
    2.3, 2.4, 2.5, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4.15, 
    4.45, 4.65, 4.95, 5.2, 5.45, 5.7, 6, 6.2, 6.45, 6.6, 
    6.8, 7, 7.25, 7.5, 7.7, 7.9, 8.05, 8.25, 8.5, 8.7, 
    8.95, 9.05, 9.25, 9.45, 9.55, 9.78, 9.98, 10.1, 10.3, 10.55, 
    10.8, 11.05, 11.25, 11.5, 11.7, 11.98, 12.1, 12.35, 12.65, 12.75,
    13, 13.2, 13.45, 13.7, 13.85, 14.2, 14.45, 14.7, 15, 15.25, 
    15.6, 15.8, 16.15, 16.4, 16.7
  ],
  lineCero: [
    2.4, 2.5, 2.7, 2.9, 3, 3.2, 3.5, 3.8, 4, 4.2, 
    4.5, 4.8, 5.1, 5.3, 5.7, 5.9, 6.2, 6.4, 6.7, 7, 
    7.2, 7.5, 7.8, 8, 8.2, 8.4, 8.6, 8.9, 9.1, 9.3, 
    9.5, 9.7, 9.9, 10.1, 10.3, 10.4, 10.6, 10.8, 11, 11.2, 
    11.4, 11.6, 11.9, 12.2, 12.4, 12.6, 12.9, 13.2, 13.4, 13.6, 
    13.9, 14.1, 14.3, 14.6, 14.9, 15.1, 15.4, 15.7, 16, 16.3, 
    16.5, 16.9, 17.2, 17.6, 17.9, 18.2,  
  ],
  lineMasUno: [
    2.7, 2.9, 3, 3.2, 3.4, 3.5, 3.8, 4.1, 4.3, 4.6, 
    4.9, 5.3, 5.6, 5.8, 6.2, 6.5, 6.8, 7.1, 7.4, 7.6, 
    7.9, 8.1, 8.4, 8.6, 8.9, 9.1, 9.4, 9.6, 9.8, 10,
    10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.8, 12, 12.2, 
    12.4, 12.7, 13, 13.2, 13.5, 13.7, 14, 14.3, 14.5, 14.8, 
    15.1, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.1, 17.4, 17.7, 18,
    18.3, 18.7, 19.1, 19.5, 19.9
  ],
  lineMasDos: [
    3, 3.1, 3.35, 3.5, 3.65, 3.9, 4.2, 4.5, 4.75, 5.15, 
    5.45, 5.7, 6, 6.45, 6.7, 7, 7.45, 7.7, 8, 8.35, 
    8.5, 8.9, 9.2, 9.5, 9.7, 10, 10.2, 10.5, 10.7, 11, 
    11.2, 11.45, 11.6, 11.9, 12, 12.3, 12.5, 12.85, 13, 13.4, 
    13.5, 13.85, 14.1, 14.4, 14.6, 15, 15.15, 15.5, 15.75, 
    16, 16.4, 16.6, 17, 17.35, 17.5, 17.95, 18.3, 18.5, 19, 19.4, 
    19.6, 20, 20.5, 21, 21.5, 21.9 
  ],
  lineMasTres: [
    3.3, 3.5, 3.7, 3.9, 4.1, 4.35, 4.6, 5, 5.3, 5.5, 
    5.9, 6.3, 6.6, 7, 7.45, 7.7, 8, 8.5, 8.75, 9.1, 
    9.4, 9.6, 10, 10.3, 10.5, 10.85, 11.2, 11.45, 11.7, 12, 
    12.35, 12.5, 12.7, 13, 13.35, 13.5, 13.8, 14, 14.3, 14.5, 
    14.8, 15.1, 15.5, 15.7, 16, 16.4, 16.6, 17, 17.3, 17.5,
    17.85, 18.2, 18.5, 18.9, 19.2, 19.5, 20, 20.4, 20.8, 21.2, 
    21.6, 22, 22.5, 23, 23.5, 24
  ]
};*/


const data = {
 
    labels: [ 
      //45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110
      45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 
      55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 
      85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
      95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
      105, 106, 107, 108, 109, 110
    ],
    datasets: generateCoordenadas() /*[{
        label: '- 3',
        data: lineasGraphics.lineMenosTres,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: lineasGraphics.lineMenosDos,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: lineasGraphics.lineMenosUno,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '0',
        data: lineasGraphics.lineCero,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: lineasGraphics.lineMasUno,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: lineasGraphics.lineMasDos,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: lineasGraphics.lineMasTres,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1
      },
      {
        label: '- 22',
        data: generateCoordenadas(),
        borderColor: '#4884FC',
        type: "bubble",
        pointStyle: "bubble",        
      },

    ]*/
  };
    return(
        <Container>
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Peso para la Talla Niños </h2>
              : 
              <h2 className="text-center">Peso para la Talla Niñas </h2>
             }
             <center>
             <Form.Label column sm="12" style={{"font-size": "12px !important" }}>Puntuación Z (0 a 2 años)</Form.Label>
             </center>
                <div className="containerGraphic"> 
                  <p className="ejey">Peso(kg)</p>
                <div style={{"max-width": "800px", "text-align":"center"}} >
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
                            min: 45,
                          }
                        }
                      }}
                  />
                </div>
                </div>
                <p className="ejex">Longitud(cm)</p>
        </Container>
    )


    function lineas(){
      return   [{
        label: '- 3',
        data: lineasGraphics.lineMenosTres,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: lineasGraphics.lineMenosDos,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: lineasGraphics.lineMenosUno,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '0',
        data: lineasGraphics.lineCero,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: lineasGraphics.lineMasUno,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: lineasGraphics.lineMasDos,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: lineasGraphics.lineMasTres,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1
      },
      /*{
        label: '- 22',
        data: generateCoordenadas(),
        borderColor: '#4884FC',
        type: "bubble",
        pointStyle: "bubble",        
      },*/
      
    ]
    }
}