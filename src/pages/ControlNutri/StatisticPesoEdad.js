import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
//import { getContVaccApi } from "../../api/vaccination";

export default function StatisticPesoEdad(){
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
    labels: [ 0, " ", 2, " ", 4, " ", 6, " ", 8, " ", 10, " ", "1 año", " ", 2, " ", 4, " ", 6, " ", 8, " ", 10, " ", "2 años" ],
    datasets: [{
        label: '- 2',
        data: [ 2.4, 3.4, 4.4, 5, 5.6, 6, 6.4, 6.7, 7, 7.2, 7.4, 7.6, 7.8, 8, 8.1, 8.3, 8.4, 8.6, 8.7, 8.9, 9.1, 9.2, 9.4, 9.5, 9.6 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
        borderDash: [10,5]
      },
      
      {
        label: '- 1',
        data: [ 2.8, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1, 7.5, 7.8, 8.1, 8.3, 8.5, 8.7, 8.8, 9, 9.1, 9.3, 9.5, 9.7, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9 ],
        fill: false,
        borderColor: '#8EB2FA',
        tension: 0.1,
      },

      {
        label: '0',
        data: [ 3.4, 4.5, 5.5, 6.5, 7.2, 7.7, 8.1, 8.4, 8.7, 9, 9.3, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 3.8, 5, 6.3, 7.2, 7.9, 8.4, 8.8, 9.2, 9.6, 9.9, 10.2, 10.5, 10.8, 11.1, 11.4, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 4.4, 5.6, 7, 8, 8.8, 9.4, 9.9, 10.3, 10.7, 11.1, 11.4, 11.7, 12, 12.3, 12.6, 12.9, 13.2, 13.5, 13.8, 14.1, 14.4, 14.7, 14.9, 15.1, 15.3 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
      }
    ]
  };
    return(
        <Container>
             <h1 className="text-center">Estadística </h1>
             <h2 className="text-center">Peso para la Edad Niños </h2>
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (0 a 2 años)</Form.Label>
             <div style={{"max-width": "800px", "background-image": "url('../../assets/img/graphicsPrueba.png')"}}>
             <Line 
                data={data}

                height={500}
                width={800}
                options={{pointStyle: "line"}}

             />
             </div>
        </Container>
    )
}