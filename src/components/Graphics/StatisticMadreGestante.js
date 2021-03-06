import React, { useState, useEffect} from "react";
import { Container, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import moment from 'moment';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import useAuth from '../../hooks/useAuth';

import "./StatisticNutri.scss";

export default function StatisticMadreGestante(props){
  const { listControls, token, documento } = props;
  const { rolUser } = useParams();
  const [ goRedirect, setGoRedirect ] = useState(false);
  const [ idControl, setIdControl ] = useState(0);
  const [ authorization, setAuthorization ] = useState(true);
  const [ errorServer, setErrorServer ] = useState(false);
  const { user } = useAuth();

  //privilegios
  const validatePrivilegio = (privilegio) => {
    return user.authorities.filter(priv => priv === privilegio);
}

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
          y: item.imc,
          x: item.edadGestacional,
          r: 4
        }],
        fill: true,
        borderColor: '#ffffff',
        backgroundColor: '#ffffff',
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

    labels: [ 10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,
              36,37,38,39,40,41,42 ],
    datasets: generateCoordenadas()
  };

  if(validatePrivilegio("LISTAR_CONTROLES_NUTRICIONALES").length === 0){
    return(
        <>
            <h1 style={{"textAlign": "center"}}>No tienes autorizaci??n</h1>
                <Lottie height={500} width="65%"
                options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
            />
        </>
    )
  }else{
    return(
        <Container>
              {goRedirect && (
                  <Redirect to={`/admin/DetailControlNutriMadre/${idControl}/${documento}/${rolUser}`} />
              )}

              <h2 className="text-center">Estado Nutricional Madre Gestante</h2>
              <center>
              <div>  
              <p></p> 
                  <div className="containerGraphic"> 
                    <center>
                <div style={{"max-width": "800px", "text-align":"center"}} >
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
                            min: 10,
                            max: 42
                          }
                        }
                      }}
                      getDatasetAtEvent={getDatasetAtEvent}
                  />
                 </div>
                   </center>
                    </div>
                  </div>
                <p className="ejex">Semanas de Gestaci??n</p>
              </center>
        </Container>
    )
  }

    function lineas(){
      return [{
        data: [ 15,15,15,15,15,
          15,15,15,15,15,
          15,15,15,15,15,
          15,15,15,15,15,
          15,15,15,15,15,
          15,15,15,15,15,
          15,15,15],
        fill: true,
        borderColor: '#FA2E7F',
        tension: 0.1,
      },
      {
        label: 'Bajo peso para la Edad Gestacional',
        data: [ 20.4,20.5,20.7,20.8,20.9,
          21,21,21.2,21.3,21.5,
          21.7,21.8,21.9,22,22.2,
          22.3,22.5,22.7,23,23.2,
          23.3,23.5,23.7,23.85,23.95,
          24.1,24.3,24.4,24.5,24.65,
          24.8,25,25.1 ],
        fill: true,
        borderColor: '#FA2E7F',
        backgroundColor: 'rgba(254, 17, 150 , 0.6)',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: 'IMC adecuado para la Edad Gestacional',
        data: [ 25.3,25.4,25.5,25.6,25.7,
          25.8,25.9,26,26.2,26.3,
          26.4,26.5,26.6,26.8,26.9,
          27.1,27.3,27.5,27.65,27.85,
          27.96,28,28.1,28.2,28.3,
          28.35,28.4,28.46,28.5,28.6,
          28.8,29,29.1 ],
        fill: true,
        borderColor: '#67C16B',
        backgroundColor: 'rgba(66, 214, 177, 0.3)',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: 'Sobrepeso para la Edad Gestacional',
        data: [ 30.2,30.3,30.4,30.45,30.5,
          30.6,30.7,30.8,30.85,30.9,
          30.95,31,31.05,31.1,31.25,
          31.5,31.7,31.8,31.9,31.95,
          32,32.05,32.15,32.3,32.45,
          32.6,32.75,32.85,32.9,32.97,
          33,33.05,33.1],
        fill: true,
        borderColor: '#FBED32',
        backgroundColor: 'rgba(251, 237, 50, 0.3)',
        tension: 0.1,
        borderDash: [10,5]
      },
      {
        label: 'Obesidad para la Edad Gestacional',
        data: [ 40,40,40,40,40,
          40,40,40,40,40,
          40,40,40,40,40,
          40,40,40,40,40,
          40,40,40,40,40,
          40,40,40,40,40,
          40,40,40,40,40,
          40,40,40 ],
        fill: true,
        borderColor: '#f28f35',
        backgroundColor: 'rgba(242, 143, 53, 0.5)',
        tension: 0.1,
        borderDash: [10,5]
      }]
    }
}