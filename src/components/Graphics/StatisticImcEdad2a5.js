import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";

import "./StatisticNutri.scss";

export default function StatisticImcEdad2a5(props){
  const { sexo, listControls, token, documento } = props;
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
  labels: [ 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60 ],
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
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
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
                            min: 24,
                            max: 60
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
    return[
    {
      label: '- 2',
      data: sexo === "MASCULINO" ?  [ 13.8,13.75,13.67,13.58,13.5,13.42,13.35,13.3,13.25,13.2,13.15,13.1,13.05,13.03,
                                      13,12.96,12.94,12.9,12.89 ] :
                                    [ 13.35,13.3,13.25,13.2,13.18,13.13,13.1,13,12.98,12.95,12.88,12.85,12.81,12.79,
                                      12.77,12.73,12.7,12.68,12.67 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
      tension: 0.1,
    },
    {
      label: '- 1',
      data: sexo === "MASCULINO" ?  [ 14.85,14.79,14.7,14.62,14.55,14.48,14.4,14.35,14.3,14.25,14.2,14.15,14.12,14.1,
                                      14.08,14.05,14.01,14,13.99 ] :
                                    [ 14.44,14.4,14.35,14.3,14.25,14.21,14.19,14.12,14.095,14.05,14.015,13.99,13.97,
                                      13.93,13.91,13.89,13.89,13.88,13.88 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
      tension: 0.1,
    },
    {
      label: '0',
      data: sexo === "MASCULINO" ?  [ 16.05,15.96,15.88,15.8,15.71,15.64,15.58,15.5,15.45,15.4,15.38,15.35,15.33,15.3,
                                      15.28,15.25,15.24,15.22,15.2 ] :
                                    [ 15.7,15.62,15.58,15.52,15.49,15.42,15.39,15.35,15.31,15.29,15.27,15.26,15.25,15.24,
                                      15.24,15.24,15.26,15.27,15.28 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
      tension: 0.1,
    },
    {
      label: '+ 1',
      data: sexo === "MASCULINO" ?  [ 17.35,17.29,17.2,17.1,17.02,16.96,16.9,16.85,16.8,16.75,16.72,16.7,16.68,16.65,16.62,
                                      16.6,16.6,16.6,16.6 ] :
                                    [ 17.12,17.05,16.99,16.92,16.89,16.83,16.79,16.76,16.76,16.75,16.74,16.76,16.77,16.78,16.8,
                                      16.83,16.86,16.89,16.92 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
      tension: 0.1,
    },
    {
      label: '+ 2',
      data: sexo === "MASCULINO" ?  [ 18.85,18.75,18.65,18.56,18.48,18.4,18.35,18.3,18.25,18.2,18.17,18.15,18.15,18.15,18.17,
                                      18.18,18.21,18.25,18.28 ] :
                                    [ 18.72,18.69,18.6,18.55,18.5,18.45,18.42,18.41,18.41,18.42,18.45,18.49,18.52,18.56,18.6,
                                      18.65,18.7,18.75,18.8 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
      tension: 0.1,
      borderDash: [10,5]
    },
    {
      label: '+ 3',
      data: sexo === "MASCULINO" ?  [ 20.6, 20.48, 20.35, 20.21, 20.1, 20, 19.93, 19.86, 19.81, 19.8, 19.8, 19.8, 19.82, 19.87, 
                                      19.94, 20, 20.07, 20.15, 20.25 ] :
                                    [ 20.62,20.55,20.47,20.41,20.35,20.32,20.3,20.32,20.35,20.41,20.48,20.51,20.59,20.67,20.74,
                                      20.83,20.9,20.99,20.08 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
      tension: 0.1,
    }
  ]
}
}