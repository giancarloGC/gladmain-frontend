import React, { useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
//import { getContVaccApi } from "../../api/vaccination";

export default function StatisticNutri(){
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
    labels: [ 0," ", 2, " ", 4, " ", 6, " ", 8, " ", 10, " ", "1 año", " ", 2, " ", 4, " ", 6, " ", 8, " ", 10, " ", "2 años" ],
    datasets: [{
        label: '- 2',
        data: [45, 50, 53.8, 56.7, 59, 61, 62.9, 64.2, 65.6, 66.9, 68, 69.2, 70.3, 71.5, 72.6, 73.7, 74.7, 75.6, 76.5, 77.3, 78.2, 79, 79.9, 80.5, 81.2],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
        borderDash: [10,5]
      },
      
      {
        label: '- 1',
        data: [ 47, 52, 55.8, 58.8, 61.1, 63.1, 64.9, 66.4, 67.9, 69.2, 70.5, 71.8, 72.9, 74, 75.1, 76.2, 77.2, 78.2, 79.1, 80.1, 81.1, 82, 82.9, 83.7, 84.5 ],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
      },

      {
        label: '0',
        data: [ 49, 57.5, 63.2, 67, 70, 72.9, 75.2, 77.7, 80, 81.9, 83.9, 85.8, 87.5 ],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 51, 59.8, 65.3, 69.1, 72.3, 75, 77.7, 80, 82.4, 84.7, 86.8, 88.7, 90.5 ],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 53, 61.8, 67.5, 71.3, 74.7, 77.3, 80.1, 82.9, 85.1, 87.4, 89.8, 91.8, 93.9 ],
        fill: false,
        borderColor: '#F41156',
        tension: 0.1,
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