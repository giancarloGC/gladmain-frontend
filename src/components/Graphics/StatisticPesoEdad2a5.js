import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import "./StatisticNutri.scss";
import moment from "moment";

export default function StatisticPesoEdad2a5(props){
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
          y: item.peso,
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
    labels: [ 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60 ],
    datasets: generateCoordenadas()
  };
    return(
        <Container>
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Peso para la Edad Niños </h2>
              : 
              <h2 className="text-center">Peso para la Edad Niñas </h2>
             }
             <center>
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
             </center>
             <div className="containerGraphic"> 
                  <p className="ejey">Peso (kg)</p>
             <div style={{"max-width": "800px", "background-image": "url('../../assets/img/graphicsPrueba.png')"}}>
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
        </Container>
    )
    
    function lineas(){
    return[
    {
      label: '- 2',
      data: [ 9.7, 10, 10.3, 10.6, 10.9, 11.1, 11.4, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 13, 13.2, 13.4, 13.6, 13.8, 14 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
      borderDash: [10,5]
    },
    {
      label: '- 1',
      data: [ 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 13, 13.3, 13.6, 13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 15.9, 16.1 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFCAFA',
      tension: 0.1,
    },
    {
      label: '0',
      data: [ 12.3, 12.6, 12.9, 13.2, 13.6, 13.9, 14.3, 14.7, 15.1, 15.4, 15.7, 16, 16.3, 16.6, 16.9, 17.3, 17.7, 18.1, 18.4 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
    },
    {
      label: '+ 1',
      data: [ 13.6, 14.1, 14.6, 15, 15.4, 15.8, 16.2, 16.6, 17, 17.4, 17.8, 18.2, 18.6, 19, 19.4, 19.8, 20.2, 20.6, 21 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
    },
    {
      label: '+ 2',
      data: [ 15.4, 15.8, 16.3, 16.8, 17.3, 17.8, 18.3, 18.8, 19.3, 19.8, 20.2, 20.7, 21.1, 21.6, 22.1, 22.6, 23.1, 23.6, 24.1 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
    }
  ];
}
}