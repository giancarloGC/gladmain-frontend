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
        data: [1.8, 2.5, 3.5, 4.6, 5.7, 6.6, 7.5, 8.2, 9.1, 10, 10.9, 11.9, 13, 14.2],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: [2.1, 2.8, 3.8, 5.1, 6.2, 7.2, 8, 8.9, 9.8, 10.8, 11.8, 12.8, 14, 15.4 ],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: [2.3, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5,8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
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