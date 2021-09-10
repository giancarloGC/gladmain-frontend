import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";


import "./StatisticNutri.scss";

export default function StatisticMadreGestante(props){
const { sexo } = props;
const [ sizeImage, setSizeImage] = useState("750");
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
 
    labels: [ 10,15,20,25,30,35,40 ],
    datasets: [{
        label: '- 3',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '0',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: [ ],
        fill: false,
        borderColor: sexo !== "Femenino" ? '#4884FC' : '#FC39E5',
        tension: 0.1
      }
    ]
  };
    return(
        <Container>
              <h2 className="text-center">IMC para la Edad Gestacional </h2>
                <div className="containerGraphic"> 
                  <p className="ejey">IMC</p>
                <div style={{"max-width": "800px", "text-align":"center"}} >
                  <Line 
                      data={data}
                      height={500}
                      width={800}
                      options={{pointStyle: "line"}}
                  />
                </div>
                </div>
                <p className="ejex">Semanas de Gestación</p>
        </Container>
    )
}