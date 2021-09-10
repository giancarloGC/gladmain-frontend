import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import "./StatisticNutri.scss";

export default function StatisticPesoTalla2a5(props){
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
 
    labels: [ 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120 ],
    datasets: [{
        label: '- 3',
        data: [ 5.9, 6.8, 7.5, 8.4, 9.2, 10.2, 11.1, 12, 13.2, 14.4, 15.6, 17.1 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: [ 6.5, 7.4, 8.2, 9, 10, 11, 12, 13.1, 14.4, 15.6, 17, 18.6 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [ 6.9, 7.9, 8.9, 9.8, 10.8, 11.9, 13, 14.2, 15.5, 17, 18.6, 20.4 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '0',
        data: [ 7.5, 8.5, 9.6, 10.6, 11.6, 12.9, 14, 15.4, 16.9, 18.5, 20.4, 22.4 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: [ 8.1, 9.4, 10.5, 11.5, 12.6, 14, 15.3, 16.7, 18.4, 20.3, 22.4, 24.5 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: [ 8.9, 10.2, 11.4, 12.5, 13.8, 15.2, 16.6, 18.2, 20, 22.1, 24.5, 27.2 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data: [ 9.6, 11.1, 12.5, 13.7, 15, 16.5, 18.1, 19.9, 22, 24.5, 27.1, 30.1],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1
      }
    ]
  };
    return(
        <Container>
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Peso para la Talla Niños </h2>
              : 
              <h2 className="text-center">Peso para la Talla Niñas </h2>
             }
             <center>
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
             </center>
             <div className="containerGraphic"> 
                  <p className="ejey">Peso(kg)</p>
             <div style={{"max-width": "800px", "background-image": "url('../../assets/img/graphicsPrueba.png')"}}>
             <Line 
                data={data}

                height={500}
                width={800}
                options={{pointStyle: "line"}}

             />
             </div>
             </div>
             <p className="ejex">Talla(cm)</p>
        </Container>
    )
}