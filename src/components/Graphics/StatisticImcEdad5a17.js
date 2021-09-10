import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ImageBackground from "../../assets/img/graphicsPrueba.png";

export default function StatisticImcEdad5a17(props){
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
    labels: [ "", 3, 6, 9,"", 3, 6, 9,"" , 3, 6, 9,"" , 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9,"", 
              3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9,"" ],
    datasets: [{
        label: '- 2',
        data: [ 13,13,13,13,13.05,13.1,13.15,13.2,13.24,13.27,13.3,13.35,13.4,13.43,13.46,13.48,13.51,13.55,
                13.6,13.65,13.71,13.79,13.87,13.92,14.02,14.1,14.23,14.35,14.45,14.55,14.69,14.85,14.98,15.1,15.25,
                15.4,15.51,15.65,15.8,15.92,16.06,16.15,16.25,16.35,16.45,16.58,16.69,16.82,16.95,17.05,17.15,
                17.225,17.3,17.355,17.41,17.465,17.52 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        //borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [ 14.1,14.1,14.1,14.1,14.1,14.12,14.15,14.2,14.25,14.3,14.35,14.4,14.45,14.5,14.55,14.62,14.7,14.75,
                14.8,14.9,14.99,15.05,15.15,15.25,15.32,15.45,15.57,15.7,15.8,15.92,16.05,16.2,16.4,16.6,16.75,16.93,
                17.05,17.2,17.38,17.5,17.65,17.8,17.95,18.1,18.25,18.41,18.55,18.67,18.8,18.9,19.01,19.1,19.2,19.3,19.4,
                19.5,19.6 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1,
      },
      {
        label: '0',
        data: [ 15.3,15.3,15.3,15.3,15.35,15.4,15.46,15.5,15.55,15.58,15.62,15.67,15.73,15.8,15.9,15.98,16.05,16.13,16.2,16.3,16.4,16.54,
                16.65,16.79,16.9,17.05,17.19,17.37,17.53,17.7,17.85,18.05,18.26,18.43,18.6,18.8,19,19.22,19.43,19.6,19.8,20,
                20.2,20.4,20.6,20.75,20.94,21.1,21.3,21.45,21.58,21.7,21.83,21.95,22.05,22.1,22.2 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 16.6,16.68,16.73,16.79,16.85,16.95,17.05,17.15,17.25,17.35,17.45,17.55,17.63,17.72,17.8,17.9,17.98,18.12,18.25,18.4,18.52,18.7,
                18.85,19,19.2,19.4,19.57,19.78,20,20.2,20.4,20.6,20.8,21.05,21.3,21.52,21.75,22,22.25,22.5,22.72,22.92,23.15,
                23.38,23.58,23.75,23.94,24.1,24.3,24.48,24.63,24.8,24.98,25.1,25.2,25.3,25.4 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 18.3,18.42,18.5,18.59,18.7,18.78,18.89,18.97,19.1,19.2,19.36,19.5,19.7,19.9,20.1,20.3,20.5,20.7,20.9,21.15,21.44,
                21.7,21.98,22.25,22.5,22.75,23.05,23.35,23.65,23.95,24.2,24.5,24.8,25.1,25.4,25.7,25.95,26.2,26.48,
                26.73,27,27.25,27.5,27.7,27.9,28.1,28.3,28.5,28.67,28.85,29.05,29.2,29.35,29.47,29.6,29.7,29.8 ],
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
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (5 a 17 años)</Form.Label>
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