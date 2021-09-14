import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import ImageBackground from "../../assets/img/graphicsPrueba.png";
import "./StatisticNutri.scss";
import moment from "moment";

export default function StatisticTallaEdad5a17(props){
  const { sexo, listControls } = props;
  console.log(listControls);

  const generateCoordenadas = () => {
    let coordenadas = [];
    let lineasArray = lineas();
  
    listControls.map((item, index) => {
      var coor = {
        label: `Control ${item.id} - ${moment(item.fechaControl).format("DD-MM-YYYY")}`,
        data: [{
          y: item.talla,
          x: item.meses,
          r: 15
        }],
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#A80B42',
        backgroundColor: sexo !== "FEMENINO" ? '#5746D4' : 'rgba(212, 70, 130, 0.52)',//#D44682',
        type: "bubble",
        pointStyle: "bubble", 
      }
      coordenadas.push(coor);
    });
  
    const allCoordenadas = [...lineasArray, ...coordenadas];
    return allCoordenadas;
  } 


const data = {
    /*labels: [ "", 3, 6, 9,"", 3, 6, 9,"" , 3, 6, 9,"" , 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9,"", 
              3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9, "", 3, 6, 9,"" ],
    */
   labels: [60, 
      63, 66, 69, 72,
      75, 78, 81, 84, 
      87, 90, 93, 96, 
      99, 102, 105, 108,
      111, 114, 117, 120, 
      123, 126, 129, 132, 
      135, 138, 141, 144, 
      147, 150, 153, 156, 
      159, 162, 165, 168, 
      171, 174, 177, 180, 
      183, 186, 189, 192, 
      195, 198, 201, 204, 
      207, 210, 213, 216, 
      219, 222, 225, 228 ], //57
    datasets: generateCoordenadas()
  };
    return(
        <Container>
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Talla para la Edad Niños </h2>
              : 
              <h2 className="text-center">Talla para la Edad Niñas </h2>
             }
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
                options={{
                  pointStyle: "line",
                  responsive: true,
                  scales: {
                    x: {
                      type: 'linear',
                      position: 'bottom',
                      min: 60,
                      max: 228,
                    }
                  }
                }}
              />
             </div>
             </div>
             <p className="ejex">Edad (en meses y años cumplidos)</p> 
        </Container>
    )

    function lineas(){
      return  [{
        label: '- 2',
        data: [101,102.5,103.5,104.8,106,107.5,109,110.3,111.5,112.8,114,115.3,116.5,117.5,118.5,119.7,120.7,121.7,122.8,
               124,125,126,127,128.3,129.5,130.5,131.5,133,134.5,136,137.5,139,141,143,145,146.5,148,149.5,151,152.5,154,
               155,156,157,158,158.8,159.5,159.8,160.3,160.5,160.8,161.3,161.5,161.8,162,162,162],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: [ 105.5,107,108.5,109.8,111,112.5,114,115.3,116.5,118,119.3,120.5,121.5,122.6,124,125.3,126.5,127.8,129,
                130.3,131.5,132.5,133.8,135,136.3,137.8,139.2,140.5,142,143.9,145.3,147,148.5,150.3,152,154,155.5,157,
                158.5,160,161,162,163.1,164,165,165.9,166.5,167,167.6,168,168.3,168.5,168.9,169,169.3,169.5,169.8 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#D8E5FD' : '#FFCAFA',
        tension: 0.1,
      },
      {
        label: '0',
        data: [ 110,111.8,113.3,114.8,116.3,117.8,119.2,120.5,121.8,123,124.3,125.6,127,128.5,130,131.3,132.5,133.9,
                135.2,136.5,137.9,139,140.3,141.8,143,144.3,146,147.3,149,150.5,152,154,156,158,160,161.8,163.5,165,
                166.5,168,169,170,171,172,172.8,173.6,174.3,174.8,175.3,175.7,176.2,176.5,176.8,176.8,176.8,176.8,176.8 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#8EB2FA' : '#FFA8F6',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: [ 115,116.5,118,119.5,121,122.5,124,125.5,127,128.5,130,131.5,133,134.3,135.8,137,138.5,140,141.5,143,144.3,145.5,
                147,148.5,150,151.5,153,154.5,156,158,160,161.8,163.8,165.8,167.8,169.3,171,172.5,174,175.5,176.9,178,179,180,
                180.8,181.6,182.2,182.5,182.8,183.3,183.5,183.8,184,184,184,184,184 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: [ 119,120.8,122.8,124.7,126.3,128,129.5,131,132.7,134.3,135.8,137.5,139,140.5,141.9,143.3,144.8,146,147.3,148.9,150.3,
                151.9,153.3,154.9,156.3,158,159.8,161.4,163,165,167,169,171,173,175,177,178.5,180.3,182,183.5,184.7,186,187,188,
                188.7,189.4,189.8,190,190.3,190.5,190.8,191,191.3,191.5,191.5,191.5,191.5 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#4884FC' : '#FC39E5',
        tension: 0.1,
      }
    ]
    }
}