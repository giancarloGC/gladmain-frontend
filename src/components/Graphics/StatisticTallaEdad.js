import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import "./StatisticNutri.scss";

export default function StatisticTallaEdad(props){
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
    labels: [ "Nacimiento"," ", 2, " ", 4, " ", 6, " ", 8, " ", 10, " ", "1 año", " ", 2, " ", 4, " ", 6, " ", 8, " ", 10, " ", "2 años" ],
    datasets: [{
        label: '- 2',
        data: [45, 50, 53.8, 56.7, 59, 61, 62.9, 64.2, 65.6, 66.9, 68, 69.2, 70.3, 71.5, 72.6, 73.7, 74.7, 75.6, 76.5, 77.3, 78.2, 79, 79.9, 80.5, 81.2],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      
      {
        label: '- 1',
        data: [ 47, 52, 55.8, 58.8, 61.1, 63.1, 64.9, 66.4, 67.9, 69.2, 70.5, 71.8, 72.9, 74, 75.1, 76.2, 77.2, 78.2, 79.1, 80.1, 81.1, 82, 82.9, 83.7, 84.5 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1,
      },

      {
        label: '0',
        data: [ 49, 54, 57.5, 60.5, 63.1, 65.1, 67, 68.5, 70, 71.4, 72.8, 74, 75.2, 76.4, 77.6, 78.8, 80, 81, 82, 83, 84, 85, 85.9, 86.8, 87.6 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 51, 56, 60, 63, 65.3, 67.4, 69.1, 70.8, 72.3, 73.8, 75, 76.3, 77.7, 79, 80.1, 81.3, 82.5, 83.7, 84.9, 86, 87, 88, 89, 89.8, 90.6 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 53, 58, 62, 65, 67.3, 69.4, 71.2, 72.9, 74.5, 76, 77.4, 78.8, 80.1, 81.5, 82.8, 84, 85.1, 86.2, 87.4, 88.6, 89.7, 90.8, 91.9, 93, 94 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      }
    ]
  };
    return(
        <Container>
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Talla para la Edad Niños </h2>
              : 
              <h2 className="text-center">Talla para la Edad Niñas </h2>
             }
             <center>
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (0 a 2 años)</Form.Label>
             </center>
             <div className="containerGraphic"> 
                  <p className="ejey">Longitud(cm)</p>
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