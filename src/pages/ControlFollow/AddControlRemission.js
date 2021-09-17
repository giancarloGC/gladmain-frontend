import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Container } from "react-bootstrap";
import AddControlR from "../../components/Control/ControlFollow/AddControlR";
import { getUserByIdApi } from "../../api/user";
import { getSegByIdApi } from "../../api/follow-up";
import { insertRemisApi } from "../../api/remission";
import { TOKEN } from "../../utils/constans";

export default function AddControlRemission(){
    const { id } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [followControl, setFollow] = useState({});
    const [ followLoaded, setFollowLoaded ] = useState({});
    var loading = true;

    useEffect(() => {
        loading = false;
        getSegByIdApi(id, token).then(response => {
            setFollow(response);
            setComponentLoaded(true); 
        })
        if(!loading){ 
          setComponentLoaded(true); 
          setFollowLoaded(followControl);
        }
      }, []);
    return(
        <Container>
             <h1 className="text-center">Añadir Remisión </h1>
            <AddControlR />
        </Container>
    )
}