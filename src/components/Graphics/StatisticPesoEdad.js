import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import "./StatisticNutri.scss";
import moment from "moment";

export default function StatisticPesoEdad(props){
  const { sexo,  listControls, token, documento } = props;
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

    {listControls.length > 0 && (
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
    })
    )};
  
    const allCoordenadas = [ ...coordenadas, ...lineasArray ];
    return allCoordenadas;
  } 

const data = {
    labels: [ 0, 
      1, 2, 3, 4, 5, 6, 7 , 8, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ],
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
                      max: 24,
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
        data: sexo === "MASCULINO" ? [ 2.4, 3.4, 4.4, 5, 5.6, 6, 6.4, 6.7, 7, 7.2, 7.4, 7.6, 7.8, 8, 
                                       8.1, 8.3, 8.4, 8.6, 8.7, 8.9, 9.1, 9.2, 9.4, 9.5, 9.6 ]
                                   : [ 2.35, 3.2, 3.95, 4.55, 5, 5.45, 5.75, 6, 6.27, 6.49, 6.72, 6.92, 
                                       7.07, 7.23, 7.41, 7.56, 7.75, 7.93, 8.1,  8.24, 8.42, 8.55, 8.75, 
                                       8.9, 9.05,],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A': '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      
      {
        label: '- 1',
        data:  sexo === "MASCULINO" ? [ 2.8, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1, 7.5, 7.8, 8.1, 8.3, 8.5, 8.7, 
                                        8.8, 9, 9.1, 9.3, 9.5, 9.7, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9 ]
                                    : [ 2.7, 3.65, 4.5, 5.2, 5.73, 6.15, 6.49, 6.8, 7.05, 7.3, 7.55, 7.75, 
                                        7.95, 8.17, 8.35, 8.53, 8.7, 8.87, 9.05, 9.26, 9.45, 9.65, 9.8, 9.95, 
                                        10.15],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1,
      },

      {
        label: '0',
        data: sexo === "MASCULINO" ? [ 3.4, 4.5, 5.5, 6.5, 7.2, 7.7, 8.1, 8.4, 8.7, 9, 9.3, 9.6, 9.8, 10, 10.2, 
                                      10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2 ]
                                   : [ 3.15, 4.2, 5.15, 5.85, 6.45, 6.9, 7.3, 7.65, 7.95, 8.25, 8.49, 8.73, 8.98, 
                                      9.2, 9.4, 9.6, 9.8, 10.05, 10.25, 10.45, 10.7, 10.9, 11.1, 11.3, 11.48],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#127D30': '#127D30',
        tension: 0.1,
      },
      {
        label: '+ 1',
        data: sexo === "MASCULINO" ? [ 3.8, 5, 6.3, 7.2, 7.9, 8.4, 8.8, 9.2, 9.6, 9.9, 10.2, 10.5, 10.8, 11.1, 
                                       11.4, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5 ]
                                   : [ 3.6, 4.8, 5.85, 6.65, 7.3, 7.78, 8.25, 8.65, 9, 9.35, 9.6, 9.85, 10.15, 10.4, 
                                       10.65, 10.88, 11.15, 11.4, 11.6, 11.83, 12.05, 12.3, 12.55, 12.78, 13],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#363D44': '#363D44' ,
        tension: 0.1,
      },
      {
        label: '+ 2',
        data: sexo === "MASCULINO" ? [ 4.4, 5.6, 7, 8, 8.8, 9.4, 9.9, 10.3, 10.7, 11.1, 11.4, 11.7, 12, 12.3, 12.6, 
                                       12.9, 13.2, 13.5, 13.8, 14.1, 14.4, 14.7, 14.9, 15.1, 15.3 ]
                                   : [ 4.2, 5.5, 6.65, 7.5, 8.25, 8.85, 9.4, 9.8, 10.2, 10.55, 10.87, 11.2, 11.5, 
                                       11.78, 12.1, 12.4, 12.7, 12.95, 13.2, 13.5, 13.78, 14.05, 14.3, 14.6, 14.85],
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#363D44' : '#363D44',
        tension: 0.1,
      }
    ]
  }
}