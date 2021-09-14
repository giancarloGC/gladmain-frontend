import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import moment from 'moment';
import "./StatisticNutri.scss"; 

export default function StatisticImcEdad(props){
const { sexo, listControls } = props;
const [ sizeImage, setSizeImage] = useState("150");
const image = new Image();
image.src = ImageBackground;
image.width = sizeImage;

const generateCoordenadas = () => {
  let coordenadas = [];
  let lineasArray = lineas();

  listControls.map((item, index) => {
    var coor = {
      label: `Control ${item.id} - ${moment(item.fechaControl).format("DD-MM-YYYY")}`,
      data: [{
        y: item.imc,
        x: item.meses,
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

const data = {
    labels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ],
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
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (0 a 2 años)</Form.Label>
             </center>
             <div className="containerGraphic"> 
                  <p className="ejey">IMC(kg/m^2)</p>
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
                            min: 0,
                            max: 24
                          }
                        }
                      }}
                  />
                </div>
                </div>
                <p className="ejex">Edad (en meses y años cumplidos)</p>
        </Container>
    )
    function lineas(){
      return [
        {
          label: '- 2',
          data: [ 10.8, 12.39, 13.48,14.19,14.55,14.7,14.75,14.75,14.72,14.65,14.6,14.5,14.38,14.3,14.2,14.1,14.02,13.95,
                  13.88,13.8,13.75,13.7,13.65,13.6,13.55,13.8, 13.8, 13.7, 13.7, 13.6, 13.5 ],
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1,
        },
        {
          label: '- 1',
          data: [12,13.6,14.92,15.55,15.8,15.9,16,16,15.9,15.85,15.75,15.65,15.5,15.4,15.32,15.2,15.1,15,14.92,14.85,
                 14.8,14.75,14.68,14.6,14.5 ],
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
          tension: 0.1,
        },
  
        {
          label: '0',
          data: [ 13,15,16.3,16.91,17.17,17.3,17.4,17.4,17.3,17.19,17.11,16.95,16.81,16.65,16.55,16.48,16.38,16.26,
                 16.14,16.07,16,15.95,15.9,15.85,15.8],
          fill: false,
          borderColor:sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
          tension: 0.1,
        },
        {
          label: '+ 1',
          data: [ 14.5,16.35,17.76,18.38,18.65,18.85,18.9,18.85,18.75,18.65,18.5,18.38,18.2,18.06,17.95,17.85,
                  17.75,17.62,17.5,17.42,17.32,17.2,17.13,17.05,17 ],
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FC39E5',
          tension: 0.1,
        },
        {
          label: '+ 2',
          data: [ 16,17.8,19.38,19.98,20.3,20.45,20.5,20.45,20.4,20.25,20.1,20,19.8,19.65,19.5,19.4,19.25,19.15,
                  19,18.9,18.8,18.72,18.65,18.55,18.5 ],
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1,
          borderDash: [10,5]
        },
        {
          label: '+ 3',
          data: [ 18.5,19.78,21.02,21.77,22.1,22.25,22.32,22.33,22.25,22.1,21.95,21.8,21.65,21.5,21.35,21.15,21,20.89,20.79,
                  20.67,20.57,20.5,20.42,20.33,20.2 ],
          fill: false,
          borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
          tension: 0.1,
        }
      ]
    }
}