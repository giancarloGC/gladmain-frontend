import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import "./StatisticNutri.scss";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import moment from "moment";

export default function StatisticPesoEdad2a5(props){
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
          y: item.peso,
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
                <h2 className="text-center">Peso para la Edad Niños </h2>
              : 
              <h2 className="text-center">Peso para la Edad Niñas </h2>
             }
             <center>
             <Form.Label column sm="4" style={{"fontSize": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
             </center>
             <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE"}}> 
              <div className="containerGraphic"> 
                    <p className="ejey">Peso (kg)</p>
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
      data: sexo === "MASCULINO" ?  [ 9.7, 10, 10.3, 10.6, 10.9, 11.1, 11.4, 11.7, 11.9, 12.1, 
                                      12.3, 12.5, 12.7, 13, 13.2, 13.4, 13.6, 13.8, 14 ] 
                                    :[ 9,9.4,9.7,10,10.3,10.55,10.8,11.05,11.4,11.6,11.8,12.1,
                                      12.35,12.55,12.8,13,13.3,13.5,13.75],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
      tension: 0.1,
      borderDash: [10,5]
    },
    {
      label: '- 1',
      data: sexo === "MASCULINO" ?  [ 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.7, 13, 13.3, 13.6, 
                                      13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 15.9, 16.1 ]
                                 :  [ 10.2, 10.5, 10.9, 11.2, 11.5, 11.9, 12.2, 12.5, 12.85, 
                                      13.15, 13.5, 13.7, 14, 14.4, 14.6, 14.95, 15.2, 15.5, 15.7],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
      tension: 0.1,
    },
    {
      label: '0',
      data: sexo === "MASCULINO" ?  [ 12.3, 12.6, 12.9, 13.2, 13.6, 13.9, 14.3, 14.7, 15.1, 15.4, 
                                      15.7, 16, 16.3, 16.6, 16.9, 17.3, 17.7, 18.1, 18.4 ] 
                                    :[ 11.5,11.95,12.35,12.7,13.05,13.5,13.9,14.2,14.55,15,15.4,
                                      15.7,16.05,16.5,16.8,17.2,17.5,17.9,18.2 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
      tension: 0.1,
    },
    {
      label: '+ 1',
      data: sexo === "MASCULINO" ?  [ 13.6, 14.1, 14.6, 15, 15.4, 15.8, 16.2, 16.6, 17, 17.4, 17.8, 
                                      18.2, 18.6, 19, 19.4, 19.8, 20.2, 20.6, 21 ] 
                                    :[ 13,13.5,14,14.5,14.95,15.4,15.8,16.25,16.7,17.15,17.6,18.05,
                                      18.5,19,19.47,19.9,20.35,20.8,21.2 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
      tension: 0.1,
    },
    {
      label: '+ 2',
      data: sexo === "MASCULINO" ?  [ 15.4, 15.8, 16.3, 16.8, 17.3, 17.8, 18.3, 18.8, 19.3, 19.8, 20.2, 
                                      20.7, 21.1, 21.6, 22.1, 22.6, 23.1, 23.6, 24.1 ] 
                                    :[ 14.9,15.45,16,16.5,17.05,17.55,18.1,18.65,19.2,19.85,20.45,21,21.5,
                                      22.05,22.6,23.2,23.85,24.4,25 ],
      fill: false,
      borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
      tension: 0.1,
    }
  ]
}
}