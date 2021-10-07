import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from 'moment';

export default function StatisticImcEdad5a17(props){
  const { sexo, listControls, token, documento  } = props;
  const { rolUser } = useParams();
  const [ goRedirect, setGoRedirect ] = useState(false);
  const [ idControl, setIdControl ] = useState(0);

  const getDatasetAtEvent = async (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    //setClickedDataset(data.datasets[datasetIndex].label);
    const infoSelected = data.datasets[datasetIndex].label.split(" ");
    const id = infoSelected[1];
    setIdControl(id);
    setGoRedirect(true);
    /*const response = await getControlByIdApi(id, token);
    console.log(response);*/
  };

  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');
    return dateFormated[0];
    }
  }

const generateCoordenadas = () => {
  let coordenadas = [];
  let lineasArray = lineas();

  listControls.map((item, index) => {
    var coor = {
      label: `Control ${item.id} - ${dateFormat(item.fechaControl)}`,
      data: [{
        y: item.imc,
        x: item.meses,
        r: 3
      }],
      borderColor: sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
      backgroundColor: sexo !== "FEMENINO" ? '#0559B7' : '#0559B7',
      type: "bubble",
      pointStyle: "bubble", 
    }
    coordenadas.push(coor);
  });

  const allCoordenadas = [...coordenadas, ...lineasArray];
  return allCoordenadas;
} 

const data = {
    labels: [ 60, 
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
      219, 222, 225, 228 ],
    datasets: generateCoordenadas()
  
  };
    return(
        <Container>
            {goRedirect && (
                  <Redirect to={`/admin/DetailControlNutri/${idControl}/${documento}/${rolUser}`} />
              )}
          
            {sexo === "MASCULINO" ?
              <h2 className="text-center">IMC para la Edad Niños </h2>
              : 
              <h2 className="text-center">IMC para la Edad Niñas </h2>
            }
            <center>
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (5 a 17 años)</Form.Label>
            </center>
            <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE"}}>
             <div className="containerGraphic"> 
                  <p className="ejey">IMC(kg/m^2)</p>
                <div style={{"max-width": "800px", "text-align":"center"}} style={{"backgroundColor": "white"}}>
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
                            max: 228
                          }
                        }
                      }}
                      getDatasetAtEvent={getDatasetAtEvent}
                  />
                </div>
                </div>
                <p className="ejex">Edad (en meses y años cumplidos)</p>
              </div>
        </Container>
    )
    function lineas(){
      return [{
        label: '- 2',
        data: sexo === "MASCULINO" ?  [ 13,13,13,13,13.05,13.1,13.15,13.2,13.24,13.27,13.3,13.35,13.4,13.43,13.46,13.48,13.51,13.55,
                                        13.6,13.65,13.71,13.79,13.87,13.92,14.02,14.1,14.23,14.35,14.45,14.55,14.69,14.85,14.98,15.1,15.25,
                                        15.4,15.51,15.65,15.8,15.92,16.06,16.15,16.25,16.35,16.45,16.58,16.69,16.82,16.95,17.05,17.15,
                                        17.225,17.3,17.355,17.41,17.465,17.52 ] :
                                      [ 12.7, 12.7, 12.7, 12.7, 12.7, 12.7, 12.71, 12.73, 12.75, 12.78, 12.8, 12.85, 12.91, 12.96, 13.03, 
                                        13.1, 13.17, 13.25, 13.35, 13.42, 13.5, 13.6, 13.7, 13.8, 13.9, 14, 14.12, 14.25, 14.38, 14.52, 
                                        14.64, 14.8, 14.95, 15.09, 15.23, 15.4, 15.55, 15.67, 15.78, 15.89, 15.98, 16.04,16.1, 16.15, 16.18, 
                                        16.23, 16.27, 16.3, 16.35, 16.4, 16.43, 16.47, 16.49, 16.5, 16.5, 16.5, 16.5],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
      },
      {
        label: '- 1',
        data: sexo === "MASCULINO" ?  [ 14.1,14.1,14.1,14.1,14.1,14.12,14.15,14.2,14.25,14.3,14.35,14.4,14.45,14.5,14.55,14.62,14.7,14.75,
                                        14.8,14.9,14.99,15.05,15.15,15.25,15.32,15.45,15.57,15.7,15.8,15.92,16.05,16.2,16.4,16.6,16.75,16.93,
                                        17.05,17.2,17.38,17.5,17.65,17.8,17.95,18.1,18.25,18.41,18.55,18.67,18.8,18.9,19.01,19.1,19.2,19.3,
                                        19.4,19.5,19.6 ] :
                                      [ 13.98, 13.98, 13.98, 13.98, 13.98, 13.98, 13.98, 13.99, 14, 14.01, 14.03, 14.05, 14.08, 14.13, 14.22, 
                                        14.3, 14.4, 14.5, 14.6, 14.7, 14.82, 14.95, 15.08, 15.2, 15.35, 15.48, 15.63, 15.78, 15.95, 16.1, 
                                        16.27, 16.45, 16.62, 16.8, 16.96, 17.1, 17.25, 17.4, 17.55, 17.68, 17.8, 17.9, 17.98, 18.1, 18.17, 
                                        18.25, 18.32, 18.4, 18.45, 18.5, 18.53,18.55, 18.58, 18.6, 18.63, 18.65, 18.7],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1,
      },
      {
        label: '0',
        data: sexo === "MASCULINO" ?  [ 15.3,15.3,15.3,15.3,15.35,15.4,15.46,15.5,15.55,15.58,15.62,15.67,15.73,15.8,15.9,15.98,16.05,16.13,
                                        16.2,16.3,16.4,16.54,16.65,16.79,16.9,17.05,17.19,17.37,17.53,17.7,17.85,18.05,18.26,18.43,18.6,18.8,
                                        19,19.22,19.43,19.6,19.8,20,20.2,20.4,20.6,20.75,20.94,21.1,21.3,21.45,21.58,21.7,21.83,21.95,22.05,
                                        22.1,22.2 ] :
                                      [ 15.18, 15.23, 15.28, 15.3, 15.3, 15.3, 15.3, 15.35, 15.4, 15.45, 15.5, 15.6, 15.7, 15.8, 15.9, 16, 16.1, 
                                        16.21, 16.33, 16.45, 16.59,16.75, 16.91, 17.07, 17.25, 17.42, 17.6, 17.8, 18, 18.2, 18.4, 18.59, 18.78, 
                                        18.96,19.15,19.35, 19.54, 19.75, 19.93, 20.1, 20.26, 20.38, 20.5, 20.6, 20.69, 20.78, 20.87, 20.97, 21.05, 21.12, 
                                        21.2, 21.25, 21.28, 21.33, 21.35, 21.4, 21.45],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: sexo === "MASCULINO" ?  [ 16.6,16.68,16.73,16.79,16.85,16.95,17.05,17.15,17.25,17.35,17.45,17.55,17.63,17.72,17.8,17.9,17.98,
                                        18.12,18.25,18.4,18.52,18.7,18.85,19,19.2,19.4,19.57,19.78,20,20.2,20.4,20.6,20.8,21.05,21.3,21.52,
                                        21.75,22,22.25,22.5,22.72,22.92,23.15,23.38,23.58,23.75,23.94,24.1,24.3,24.48,24.63,24.8,24.98,25.1,
                                        25.2,25.3,25.4 ] :
                                      [ 16.9, 16.93, 16.97, 17, 17.05, 17.05, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8, 17.98, 18.15, 
                                        18.33, 18.52, 18.7, 18.85, 19.05, 19.25, 19.48, 19.65, 19.9, 20.1, 20.3, 20.5, 20.76, 20.98, 21.27, 21.57, 
                                        21.9, 22.14, 22.4, 22.6, 22.84, 23.03, 23.2, 23.4, 23.53, 23.7, 23.82, 23.95, 24.05, 24.15, 24.25, 24.36, 
                                        24.45, 24.55, 24.6, 24.7, 24.75, 24.8, 24.9, 24.95, 25],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 2',
        data: sexo === "MASCULINO" ?  [ 18.3,18.42,18.5,18.59,18.7,18.78,18.89,18.97,19.1,19.2,19.36,19.5,19.7,19.9,20.1,20.3,20.5,20.7,20.9,
                                        21.15,21.44,21.7,21.98,22.25,22.5,22.75,23.05,23.35,23.65,23.95,24.2,24.5,24.8,25.1,25.4,25.7,25.95,
                                        26.2,26.48,26.73,27,27.25,27.5,27.7,27.9,28.1,28.3,28.5,28.67,28.85,29.05,29.2,29.35,29.47,29.6,29.7,
                                        29.8 ] :
                                      [ 18.9, 18.95, 19, 19.05, 19.15, 19.25, 19.4, 19.58, 19.79, 19.98, 20.17, 20.35, 20.57, 20.8, 21.05, 
                                        21.24, 21.5, 21.75, 22, 22.3, 22.55, 22.8, 23.1, 23.4, 23.7, 24, 24.28, 24.6, 24.98, 25.3, 25.6, 
                                        25.9, 26.2, 26.48, 26.75, 27, 27.3, 27.55, 27.8, 28.05, 28.25, 28.45, 28.65, 28.78, 28.9, 29,29.1, 
                                        29.17, 29.25, 29.3, 29.4, 29.45, 29.5, 29.55, 29.6, 29.65, 29.7],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
      }
      ]
    }
}