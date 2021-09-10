import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import "./StatisticNutri.scss";

export default function StatisticTallaEdad2a5(props){
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
        data: [ 81, 82.5, 83.9, 85, 86.2, 87.5, 88.8, 89.9, 91, 92, 93, 94, 95, 96, 97, 98, 99, 99.9, 100.9 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [ 84, 85.8, 87.2, 88.7, 90, 91.1, 92.3, 93.5, 94.8, 96, 97, 98, 99.1, 100.1, 101.1, 102.1, 103.1, 104.2, 105.2 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1,
      },
      {
        label: '0',
        data: [ 87, 88.9, 90.4, 92, 93.4, 94.9, 96.2, 97.5, 98.8, 100, 101, 102, 103.1, 104.3, 105.5, 106.7, 107.9, 109, 110 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 90.1, 92, 93.8, 95.4, 97, 98.4, 99.9, 101.1, 102.4, 103.8, 105, 106.3, 107.5, 108.8, 110.1, 111.2, 112.3, 113.5, 114.7 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 93.2, 95, 97, 98.9, 100.4, 102, 103.4, 105, 106.4, 107.9, 109.2, 110.5, 111.9, 113.2, 114.5, 115.7, 116.9, 118, 119 ],
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
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
             </center>
             <div className="containerGraphic"> 
                  <p className="ejey">Talla (cm)</p>
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