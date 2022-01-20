import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Table, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotResults from "../../../assets/animations/notResults.json";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { deleteVacApi } from "../../../api/vaccine";
import { TOKEN } from "../../../utils/constans";
import { getUserByIdApi } from "../../../api/user";
import { deleteContVaccApi } from "../../../api/vaccination";
import "./../ControlFollow/Switch.scss";
import moment from "moment";
import AnimationCheck from "../../../assets/animations/control/check.json";

export default function ListV(props){
    const { listControls, fechaNacimiento } = props;
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    console.log(listControls);

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        /*getContVaccApi(documento, token).then(response => {
            console.log(response);
            setListControls(response);
        });*/
    }, []);

    let dateFechaNaci = moment(fechaNacimiento);
    let dateCurrent = moment();
    let edad  = dateCurrent.diff(dateFechaNaci, 'months');

    const PintarCampo = (props) => {
        const { text, dosis, nameVac, sufijoVac} = props; 
        return (
          <>
            <td>{text}
            {searchByDosis(dosis, nameVac) && (
                <div>
                    <Lottie height={45} width={45} 
                        options={{ loop: false, autoplay: true, animationData: AnimationCheck, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />   
                </div>
            )}
            </td>
            <td>
              {searchByDosis(dosis, nameVac)}
            </td>
          </>
        )
    }

    const searchByDosis = (countDosis, nombreVac) => {
        let fechaAplicacion = null;
        let dosis = listControls.filter(control => control.dosis === countDosis);
        if(dosis.length > 0){
          dosis.map((control, index) => {
            if(control.vacunasRegistradas.length > 0){
              let listVac = control.vacunasRegistradas.filter(vac => vac.nombre === nombreVac);
              if(listVac.length > 0){
                fechaAplicacion = dateFormat(control.fechaAplicacion);
              }else{
              }
            }else{
            }
          })
        }else{
    
          //return false;
        }
        return fechaAplicacion;
    }

    const formatedDate = (date) => {
         let newDate = date.split("T");
        return newDate[0];
     }

     const confirmDeleteControlVac = (item) => {
        swal({
            title: "¿Estás seguro de eliminar el Control?",
            text: "¡Una vez eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let res = deleteAll(item);
                if(res){
                    swal("Excelente! Control eliminado con éxito!", {
                        icon: "success",
                    })
                    .then((value) => {
                        window.location.replace(`/admin/listVaccines/${documento}`);
                      }); 
                }else{
                    swal("Opss! Ocurrió un error al eliminar el control!", {
                        icon: "error",
                    })
                    .then((value) => {
                        window.location.replace(`/admin/listVaccines/${documento}`);
                      });
                }
            }
          });
    }
    
    const deleteAll = async (item) => {
        let responseDeleteVac = false;
        if(item.vacunasRegistradas.length > 0){
            responseDeleteVac = await item.vacunasRegistradas.map((vacune, index) => {
                return deleteVaccine(item, vacune);
            })
        }

        responseDeleteVac = await delteContol(item);
        return responseDeleteVac;
    }

    const deleteVaccine = async (item, vacune) => {
        const respoinseVAC =  await deleteVacApi(item.id, vacune.idVacuna, token);
        if(respoinseVAC === true){
            console.log("si la elimino");
            return true;                   
        }else{
            console.log("noo la elimino");
            return false;                 
        }
    }
    
    const delteContol = async (item) => {
        const deleteCont = await deleteContVaccApi(item.id, token);
            console.log(deleteCont);
            if(deleteCont === true){
                console.log("rlimino control");
                return true;
            }else{
                console.log("pailas");
                return false;
            }
    }

    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
    
        return dateFormated[0];
        }
      }
   
 
     return(
         <Container>
             <Table striped bordered hover>
  <thead style={{"backgroundColor": "#586DB9", "text-align": "center",}}>
    <tr>
      <th>Edad</th>
      <th>Me protege de</th>
      <th>Dosis</th>
      <th>Fecha de Aplicación</th>
    </tr>
  </thead>
  <tbody>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="2">Recién nacido</td>
        <td>Tuberculosis B.C.G </td>
        <PintarCampo text="Única" dosis={1} nameVac="Tuberculosis B.C.G" sufijoVac="Tuberculosis_0"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Hepatitis B</td>
        <PintarCampo text="Recién nacido" dosis={1} nameVac="Hepatitis B" sufijoVac="Hepatitis_0"/>
    </tr>

    <br/>

    {edad >= 2 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="4">2 Meses</td>
        <td>Polio (Oral – IM)</td>
        <PintarCampo text="1" dosis={1} nameVac="Polio (Oral – IM)" sufijoVac="Polio_2"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)</td>
        <PintarCampo text="1" dosis={1} nameVac="PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)" sufijoVac="PENTAVALENTE_2"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Rotavirus</td>
        <PintarCampo text="1" dosis={1} nameVac="Rotavirus" sufijoVac="Rotavirus_2"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Neumococo</td>
        <PintarCampo text="1" dosis={1} nameVac="Neumococo" sufijoVac="Neumococo_2"/>
    </tr>
    </>)}

    <br/>


    {edad >= 4 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="4">4 Meses</td>
        <td>Polio (Oral – IM)</td>
        <PintarCampo text="2" dosis={2} nameVac="Polio (Oral – IM)" sufijoVac="Polio_4"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)</td>
        <PintarCampo text="2" dosis={2} nameVac="PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)" sufijoVac="PENTAVALENTE_4"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Rotavirus</td>
        <PintarCampo text="2" dosis={2} nameVac="Rotavirus" sufijoVac="Rotavirus_4"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Neumococo</td>
        <PintarCampo text="2" dosis={2} nameVac="Neumococo" sufijoVac="Neumococo_4"/>
    </tr>
    </>)}


    <br/>


    {edad >= 6 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="4">6 Meses</td>
        <td colspan="2">Continúe la lactancia materna hasta que cumpla dos años e inicie <br/> alimentación complementaria nutritiva</td>
        <td></td>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Polio (Oral – IM)</td>
        <PintarCampo text="3" dosis={3} nameVac="Polio (Oral – IM)" sufijoVac="Polio_6"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)</td>
        <PintarCampo text="3" dosis={3} nameVac="PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)" sufijoVac="PENTAVALENTE_6" />
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Influenza</td>
        <PintarCampo text="1" dosis={1} nameVac="Influenza" sufijoVac="Influenza_6"/>
    </tr>
    </>)}
    

    <br/>


    {edad >= 7 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>7 Meses</td>
        <td>Influenza</td>
        <PintarCampo text="2" dosis={2} nameVac="Influenza" sufijoVac="Influenza_7"/>
    </tr>
    </>)}


    <br/>


    {edad >= 12 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="5">12 Meses</td>
        <td>Sarampión Rubéola Paperas (SRP)</td>
        <PintarCampo text="1" dosis={1} nameVac="Sarampión Rubéola Paperas (SRP)" sufijoVac="Sarampion_12"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Fiebre Amarilla</td>
        <PintarCampo text="1" dosis={1} nameVac="Fiebre Amarilla" sufijoVac="Fiebre_12"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Neumococo</td>
        <PintarCampo text="Refuerzo" dosis={3} nameVac="Neumococo" sufijoVac="Neumococo_12" />
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Influenza</td>
        <PintarCampo text="Anual" dosis={3} nameVac="Influenza" sufijoVac="Influenza_12"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Hepatitis A</td>
        <PintarCampo text="ÚNICA" dosis={1} nameVac="Hepatitis A" sufijoVac="Hepatitis_12"/>
    </tr>
    </>)}
       

    <br/>


    {edad >= 18 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="2">18 Meses</td>
        <td>Difteria – Tosferina – Tétano (DPT)</td>
        <PintarCampo text="1 Refuerzo" dosis={1} nameVac="Difteria – Tosferina – Tétano (DPT)" sufijoVac="Difteria_18"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Polio (Oral – IM)</td>
        <PintarCampo text="1 Refuerzo" dosis={4} nameVac="Polio (Oral – IM)" sufijoVac="Polio_18" />
    </tr>
    </>)}
           

    <br/>


    {edad >= 60 && (<>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td rowspan="3">5 Años</td>
        <td>Polio (Oral – IM)</td>
        <PintarCampo text="2 Refuerzo" dosis={5} nameVac="Polio (Oral – IM)" sufijoVac="Polio_60"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Difteria – Tosferina – Tétano (DPT)</td>
        <PintarCampo text="2 Refuerzo" dosis={2} nameVac="Difteria – Tosferina – Tétano (DPT)" sufijoVac="Difteria_60"/>
    </tr>
    <tr style={{"text-align": "center", "vertical-align": "middle"}}>
        <td>Sarampión Rubéola Paperas (SRP)</td>
        <PintarCampo text="Refuerzo" dosis={2} nameVac="Sarampión Rubéola Paperas (SRP)" sufijoVac="Sarampion_60"/>
    </tr>
    </>)}

    
  </tbody>
</Table>
        </Container>
     )
 }