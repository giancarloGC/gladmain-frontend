import React, {useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import DetailsCommit from "../../components/Control/ControlFollow/DetailsCommit";
import { getSegByIdApi } from "../../api/follow-up";
import { getCompByIdApi } from "../../api/commitment";
import { TOKEN } from "../../utils/constans";

export default function DetailCommitment(){

    const { idSeg, idComp } = useParams();
    const [control, setControl] = useState({});
    const [segControl, setSeg] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ segLoaded, setSegLoaded ] = useState({});
    const [ controlLoaded, setControlLoaded ] = useState(false);
    const [ nombreNutricionista, setNombreNutricionista ] = useState("");
    var loading = true;
    
        useEffect(() => {
        loading = false;
        getSegByIdApi(idSeg, token).then(response => {
            setSeg(response);
            setComponentLoaded(true); 
        });
        getCompByIdApi(idComp, token).then(responseComp => {
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
             <h1 className="text-center">Detalles Compromiso </h1>
            <DetailsCommit segControl={segControl} control={control}/>
        </Container>
    )
}