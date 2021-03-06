import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { lineasGraphics } from "../Control/ControlNutri/LabelsAndLineas";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";

import "./StatisticNutri.scss";

export default function StatisticNutri(props){
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

{listControls.length > 0 && (
  listControls.map((item, index) => {
    var coor = {
      label: `Control ${item.id} - ${dateFormat(item.fechaControl)}`,
      data: [{
        y: item.peso,
        x: item.talla,
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

  const allCoordenadas = [...coordenadas, ...lineasArray];
  return allCoordenadas;
} 

const data = {
 
    labels: [ 
      
      45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 
      55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 
      85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
      95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
      105, 106, 107, 108, 109, 110
    ],
    datasets: generateCoordenadas() 

  };
    return(
        <Container>
              {goRedirect && (
                  <Redirect to={`/admin/DetailControlNutri/${idControl}/${documento}/${rolUser}`} />
              )}
          
             {sexo === "MASCULINO" ?
                <h2 className="text-center">Peso para la Talla Ni??os </h2>
              : 
              <h2 className="text-center">Peso para la Talla Ni??as </h2>
             }
             <center>
             <Form.Label column sm="12" style={{"fontSize": "12px !important" }}>Puntuaci??n Z (0 a 2 a??os)</Form.Label>
             </center>
             <center>
             <div className="container1" style={{"backgroundColor": sexo === "FEMENINO" ? "#FF67C6" : "#35B6FE", alignContent:'Right'}}>
              <div>  
              <p></p> 
                  <div className="containerGraphic"> 
                    <center>
                    <div style={{"text-align":"center"}} style={{"backgroundColor": "white"}}>
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
                                min: 45,
                              }
                            }
                          }}
                          getDatasetAtEvent={getDatasetAtEvent}
                      />
                    </div>
                    </center>
                    </div>
                  </div>
                  <p className="ejex">Longitud(cm)</p>
                  </div>
                  </center>
                  
              
        </Container>
    )

    function lineas(){
      return   [{
        label: '- 3',
        data: sexo === "MASCULINO" ? lineasGraphics.lineMenosTres : lineasGraphics.lineMenosTresNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
      },
      {
        label: '- 2',
        data: sexo === "MASCULINO" ? lineasGraphics.lineMenosDos : lineasGraphics.lineMenosDosNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '- 1',
        data: sexo === "MASCULINO" ? lineasGraphics.lineMenosUno : lineasGraphics.lineMenosUnoNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1
      },
      {
        label: '0',
        data: sexo === "MASCULINO" ? lineasGraphics.lineCero : lineasGraphics.lineCeroNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#127D30' : '#127D30',
        tension: 0.1
      },
      {
        label: '+ 1',
        data: sexo === "MASCULINO" ? lineasGraphics.lineMasUno : lineasGraphics.lineMasUnoNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E3B402' : '#E3B402',
        tension: 0.1
      },
      {
        label: '+ 2',
        data: sexo === "MASCULINO" ? lineasGraphics.lineMasDos : lineasGraphics.lineMasDosNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: '+ 3',
        data:  sexo === "MASCULINO" ? lineasGraphics.lineMasTres : lineasGraphics.lineMasTresNi,
        fill: false,
        borderColor: sexo !== "FEMENINO" ? '#E51A1A' : '#E51A1A',
        tension: 0.1
      }
    ]
  }
}