import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ImageBackground from "../../assets/img/graphicsPrueba.png";

import "./StatisticNutri.scss";

export default function StatisticImcEdad2a5(props){
const { sexo } = props;
const [ sizeImage, setSizeImage] = useState("150");
const image = new Image();
image.src = ImageBackground;
image.width = sizeImage;

const plugin = {
  id: 'custom_canvas_background_image',
  beforeDraw: (chart) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const {top, left, width, height} = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      setSizeImage(`${width}px`);
      ctx.drawImage(image, x, y);
    } else {
      image.onload = () => chart.draw();
    }
  }
};


const data = {
  labels: [ "2 años", 2, 4, 6, 8, 10, "3 años", 2, 4, 6, 8, 10, "4 años", 2, 4, 6, 8, 10, "5 años" ],
  datasets: [{
      label: '- 2',
      data: [ 13.8,13.75,13.67,13.58,13.5,13.42,13.35,13.3,13.25,13.2,13.15,13.1,13.05,13.03,13,12.96,12.94,12.9,12.89 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
    },
    {
      label: '- 1',
      data: [ 14.85,14.79,14.7,14.62,14.55,14.48,14.4,14.35,14.3,14.25,14.2,14.15,14.12,14.1,14.08,14.05,14.01,14,13.99 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
      tension: 0.1,
    },
    {
      label: '0',
      data: [ 16.05,15.96,15.88,15.8,15.71,15.64,15.58,15.5,15.45,15.4,15.38,15.35,15.33,15.3,15.28,15.25,15.24,15.22,15.2 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
      tension: 0.1,
    },
    {
      label: '+ 1',
      data: [ 17.35,17.29,17.2,17.1,17.02,16.96,16.9,16.85,16.8,16.75,16.72,16.7,16.68,16.65,16.62,16.6,16.6,16.6,16.6 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FC39E5',
      tension: 0.1,
    },
    {
      label: '+ 2',
      data: [ 18.85,18.75,18.65,18.56,18.48,18.4,18.35,18.3,18.25,18.2,18.17,18.15,18.15,18.15,18.17,18.18,18.21,18.25,18.28 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
      borderDash: [10,5]
    },
    {
      label: '+ 3',
      data: [ 20.6, 20.48, 20.35, 20.21, 20.1, 20, 19.93, 19.86, 19.81, 19.8, 19.8, 19.8, 19.82, 19.87, 19.94, 20, 20.07, 20.15, 20.25 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
      tension: 0.1,
    }
  ]
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
             <div className="containerGraphic"> 
                  <p className="ejey">IMC(kg/m^2)</p>
                <div style={{"max-width": "800px", "text-align":"center"}} >
                  <Line 
                      data={data}
                      height={500}
                      width={800}
                      options={{pointStyle: "line"}}
                  />
                </div>
                </div>
                <p className="ejex">Edad (en meses y años cumplidos)</p>
        </Container>
    )
}