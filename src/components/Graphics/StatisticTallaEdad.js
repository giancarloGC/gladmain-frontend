import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import "./StatisticNutri.scss";
import moment from 'moment';

export default function StatisticTallaEdad(props){
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
          y: item.talla,
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
    labels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ],
    datasets: generateCoordenadas()
  };
    return(
        <Container>
             {goRedirect && (
                  <Redirect to={`/admin/DetailControlNutri/${idControl}/${documento}/${rolUser}`} />
              )}

             {sexo === "MASCULINO" ?
                <h2 className="text-center">Talla para la Edad Niños </h2>
              : 
              <h2 className="text-center">Talla para la Edad Niñas </h2>
             }
             <center>
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (0 a 2 años)</Form.Label>
             </center>
             <center>
             <div>  
             <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE"}}> 
             <p></p> 
              <div className="containerGraphic"> 
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
                      min: 0,
                      max: 24
                    }
                  }
                }}
                getDatasetAtEvent={getDatasetAtEvent}
              />
             </div>
             </div>
             <p className="ejex">Edad (en meses y años cumplidos)</p> 
             </div>
             </div>
             </center>
        </Container>
    )

    function lineas(){
      return [{
        label: '- 2',
        data: sexo === "MASCULINO" ? [45, 50, 53.8, 56.7, 59, 61, 62.9, 64.2, 65.6, 66.9, 68, 69.2, 70.3, 71.5, 72.6, 73.7, 74.7, 75.6, 
                                    76.5, 77.3, 78.2, 79, 79.9, 80.5, 81.2]
                                  :[ 45.5,49.9,53,55.7,57.9,59.8,61.1,62.8,64,65.2,66.5,67.9,68.95,70,71,72,73,74,75,75.95,76.8,77.7,
                                    78.4,79.3,79.99 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      
      {
        label: '- 1',
        data: sexo === "MASCULINO" ?  [ 47, 52, 55.8, 58.8, 61.1, 63.1, 64.9, 66.4, 67.9, 69.2, 70.5, 71.8, 72.9, 74, 75.1, 76.2, 77.2, 
                                      78.2, 79.1, 80.1, 81.1, 82, 82.9, 83.7, 84.5 ] :
                                    [ 47.5,51.8,55,57.8,59.99,61.9,63.4,65,66.3,67.8,69,70.2,71.4,72.6,73.8,74.9,75.9,76.9,77.9,78.85,
                                      79.8,80.7,81.5,82.4,83.1 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1,
      },

      {
        label: '0',
        data: sexo === "MASCULINO" ?  [ 49, 54, 57.5, 60.5, 63.1, 65.1, 67, 68.5, 70, 71.4, 72.8, 74, 75.2, 76.4, 77.6, 78.8, 80, 81, 82, 
                                    83, 84, 85, 85.9, 86.8, 87.6 ]:
                                    [ 49.2,53.8,57.1,59.9,62,64,65.8,67.4,68.9,70.1,71.5,72.9,74,75.3,76.4,77.6,78.7,79.8,80.85,81.9,
                                      82.9,83.8,84.6,85.5,86.4 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: sexo === "MASCULINO" ?  [ 51, 56, 60, 63, 65.3, 67.4, 69.1, 70.8, 72.3, 73.8, 75, 76.3, 77.7, 79, 80.1, 81.3, 82.5, 83.7, 84.9, 
                                    86, 87, 88, 89, 89.8, 90.6 ] :
                                    [ 51.1,55.7,59.1,61.98,64.4,66.3,68,69.7,71.2,72.6,74,75.3,76.6,77.95,79.1,80.2,81.4,82.5,83.7,84.8,
                                      85.8,86.8,87.8,88.8,89.8 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: sexo === "MASCULINO" ?  [ 53, 58, 62, 65, 67.3, 69.4, 71.2, 72.9, 74.5, 76, 77.4, 78.8, 80.1, 81.5, 82.8, 84, 85.1, 86.2, 87.4, 
                                      88.6, 89.7, 90.8, 91.9, 93, 94 ] :
                                    [ 53,57.6,61.2,64,66.4,68.5,70.2,71.92,73.5,74.9,76.4,77.9,79.2,80.4,81.7,83,84.1,85.3,86.6,87.8,88.8,
                                      89.9,90.9,91.9,92.9 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
        tension: 0.1,
      }
    ]
  }
}