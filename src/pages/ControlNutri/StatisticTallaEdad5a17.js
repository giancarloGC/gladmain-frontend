import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import "./StatisticNutri.scss";

export default function StatisticTallaEdad5a17(){
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
        data: [101,102.5,103.5,104.8,106,107.5,109,110.3,111.5,112.8,114,115.3,116.5,117.5,118.5,119.7,120.7,121.7,122.8,124,125,126,127,128.3,
               129.5,130.5,131.5,133,134.5,136,137.5,139,141,143,145,146.5,148,149.5,151,152.5,154,155,156,157,158,158.8,159.5,159.8,
               160.3,160.5,160.8,161.3,161.5,161.8,162,162,162],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [ 119,121,122,124,126,128,129,131,132,134,136,137,139,140,142,143,145,146,147.3,149,150.3,152,153.3,152,153.3,155,156.3,158,160,
                161.5,163,165,167,169,171,173,175,177,178.5,180,182,183.5,184.5,186,187,188,188.3,189.5,189.8,190,190.3,190.5,190.3,191,191.3,
                191.5,191.5,191.5],
        fill: false,
        borderColor: '#D8E5FD',
        tension: 0.1,
      },
      /*{
        label: '0',
        data: [ 87, 88.9, 90.4, 92, 93.4, 94.9, 96.2, 97.5, 98.8, 100, 101, 102, 103.1, 104.3, 105.5, 106.7, 107.9, 109, 110 ],
        fill: false,
        borderColor: '#8EB2FA',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 90.1, 92, 93.8, 95.4, 97, 98.4, 99.9, 101.1, 102.4, 103.8, 105, 106.3, 107.5, 108.8, 110.1, 111.2, 112.3, 113.5, 114.7 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 93.2, 95, 97, 98.9, 100.4, 102, 103.4, 105, 106.4, 107.9, 109.2, 110.5, 111.9, 113.2, 114.5, 115.7, 116.9, 118, 119 ],
        fill: false,
        borderColor: '#4884FC',
        tension: 0.1,
      }*/
    ]
  };
    return(
        <Container>
             <h1 className="text-center">Estadística </h1>
             <h2 className="text-center">Talla para la Edad Niños </h2>
             <center>
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (5 a 17 años)</Form.Label>
             </center>
             <div className="containerGraphic"> 
                  <p className="ejey">Estatura (cm)</p>
             <div style={{"max-width": "800px", "background-image": "url('../../assets/img/graphicsPrueba.png')"}}>
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