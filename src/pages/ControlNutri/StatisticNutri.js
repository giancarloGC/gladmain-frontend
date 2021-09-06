import React, { useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
//import { getContVaccApi } from "../../api/vaccination";

export default function StatisticNutri(){
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
 
    labels: [ 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110 ],
    datasets: [{
        label: '- 3',
        data: [1.8, 2.5, 3.5, 4.6, 5.7, 6.6, 7.5, 8.2, 9.1, 10, 10.9, 11.9, 13, 14],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: [2.1, 2.8, 3.8, 5.1, 6.2, 7.2, 8, 8.9, 9.8, 10/10.8, 11.8, 12.8, 14, 15.4 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [2.3, 3, 4.1, 5.4, 6.7, 7.7, 8.8, 9.6, 10.6, 11.8, 12.8, 13.9, 15.3, 16.7],
        fill: false,
        borderColor: '#8EB2FA',
        tension: 0.1
      },
      {
        label: '0',
        data: [2.4, 3.2, 4.5, 5.9, 7.2, 8.5, 9.5, 10.4, 11.5, 12.6, 13.8, 15, 16.5, 18.1],
        fill: false,
        borderColor: '#D8E5FD',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: [2.6, 3.6, 4.9, 6.5, 7.8, 9.1, 10.2, 11.3, 12.5, 13.6, 15, 16.5, 18, 20],
        fill: false,
        borderColor: '#8EB2FA',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: [3, 3.9, 5.5, 7, 8.5, 10, 11.1, 12.3, 13.5, 15, 16.3, 17.9, 19.6, 22],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: [3.3, 4.4, 5.9, 7.7, 9.5, 10.9, 12.4, 13.5, 14.8, 16.4, 17.9, 19.5, 21.6, 24],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1
      }
    ]
  };
    return(
        <Container>
             <h1 className="text-center">Estadística </h1>
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