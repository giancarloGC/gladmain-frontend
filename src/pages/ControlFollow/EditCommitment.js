import React, {useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import EditCommit from "../../components/Control/ControlFollow/EditCommit";
import { getSegByIdApi } from "../../api/follow-up";
import { getCompByIdApi } from "../../api/commitment";
import { TOKEN } from "../../utils/constans";

export default function EditCommitment(){

    const { idSeg, idComp } = useParams();
    const [control, setControl] = useState({});
    const [segControl, setSeg] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ segLoaded, setSegLoaded ] = useState({});
    const [ controlLoaded, setControlLoaded ] = useState(false);
    const [ checkeds, setCheckeds ] = useState({radio1: false, radio: false});
    var loading = true;
    
        useEffect(() => {
        loading = false;
        getSegByIdApi(idSeg, token).then(response => {
            setSeg(response);
            setComponentLoaded(true); 
        });
        getCompByIdApi(idComp, token).then(responseComp => {
            setCheckeds({
                radio1: responseComp.tipo === "Compromiso cumplido que no se mantuvo" ? true : false, 
                radio: responseComp.tipo === "Compromiso por nuevo factor de riesgo" ? true : false 
            });
            setControl(responseComp);
            setControlLoaded(true);
        })
        if(!loading){ 
        setComponentLoaded(true); 
        setControlLoaded(control);
        setSegLoaded(segControl);
        }
      }, []);

    return(
        <Container>
             <h1 className="text-center">Editar Compromiso </h1>
             {control && (
                 <EditCommit segControl={segControl} control={control} checkeds={checkeds} setCheckeds={setCheckeds}/>
             )}
        </Container>
    )
}