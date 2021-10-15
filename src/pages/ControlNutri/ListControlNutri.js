import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListControlN from "../../components/Control/ControlNutri/ListControlN";
import { useParams } from "react-router-dom";
import { getControlNutriApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";


export default function ListControlNutri(){
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const { user } = useAuth(); //privilegios
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listControls, setListControls ] = useState([]);

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        if(validatePrivilegio("LISTAR_CONTROLES_NUTRICIONALES").length === 0){
        getControlNutriApi(documento, token).then(response => {
            console.log(response);
            setListControls(response);
        });
        }
    }, []);

if(validatePrivilegio("LISTAR_CONTROLES_NUTRICIONALES").length === 0){
    return(
        <>
            <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                <Lottie height={500} width="65%"
                options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
            />
        </>
    )
}else{
    return(
        <Container>
             <h1 className="text-center">Controles Nutricionales de {infoUser ? infoUser.nombre : "Anonimo"} </h1>
             {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width="60%"
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}

             {listControls.length > 0  && (
                <ListControlN listControls={listControls}/>
             )}
        </Container>
    )
    }
}