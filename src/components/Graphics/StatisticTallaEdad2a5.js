import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import "./StatisticNutri.scss";
import moment from 'moment';

export default function StatisticTallaEdad2a5(props){
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
    labels: [ 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60 ],
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
             <Form.Label column sm="4" style={{"font-size": "12px !important" }}>Puntuación Z (2 a 5 años)</Form.Label>
             </center>
             <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE"}}>
             <div className="containerGraphic"> 
                  <p className="ejey">Talla (cm)</p>
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
      return [{
        label: '- 2',
        data:  sexo === "MASCULINO" ?   [ 81, 82.5, 83.9, 85, 86.2, 87.5, 88.8, 89.9, 91, 92, 93, 94, 95, 96, 97, 98, 99, 99.9, 100.9 ] 
                                        :[ 79.2,80.9,82.2,83.7,85,86.1,87.4,88.7,89.95,90.9,92,93.05,94.1,95.1,96.1,97.1,98.1,99,100 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data:  sexo === "MASCULINO" ?   [ 84, 85.8, 87.2, 88.7, 90, 91.1, 92.3, 93.5, 94.8, 96, 97, 98, 99.1, 100.1, 101.1, 102.1, 103.1, 104.2, 105.2 ]
                                        :[ 82.6,84.05,85.6,87,88.5,89.8,91.1,92.5,93.9,95,96.05,97.3,98.4,99.57,100.55,101.7,102.8,103.8,104.8 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1,
      },
      {
        label: '0',
        data:  sexo === "MASCULINO" ? [ 87, 88.9, 90.4, 92, 93.4, 94.9, 96.2, 97.5, 98.8, 100, 101, 102, 103.1, 104.3, 105.5, 106.7, 107.9, 109, 110 ]
                                      :[ 85.9,87.4,89,90.6,92.1,93.6,95,96.3,97.6,99,100.2,101.5,102.8,103.9,105,106.1,107.2,108.3,109.4 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data:  sexo === "MASCULINO" ? [ 90.1, 92, 93.8, 95.4, 97, 98.4, 99.9, 101.1, 102.4, 103.8, 105, 106.3, 107.5, 108.8, 110.1, 111.2, 112.3, 113.5, 114.7 ] 
                                      :[ 88.9,90.8,92.5,94.2,95.9,97.4,98.9,100.3,101.7,103.05,104.5,105.8,107,108.3,109.6,110.8,111.9,113,114.1],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
        tension: 0.1,
      },
      {
        label: '+ 2',
        data:  sexo === "MASCULINO" ? [ 93.2, 95, 97, 98.9, 100.4, 102, 103.4, 105, 106.4, 107.9, 109.2, 110.5, 111.9, 113.2, 114.5, 115.7, 116.9, 118, 119 ]
                                      :[ 92.1,94,96,97.8,99.5,101,102.8,104.3,105.8,107.1,108.7,110,111.2,112.6,114,115.2,116.5,117.8,119 ],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
        tension: 0.1,
      }
    ]
  }
}