import React, {useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import DetailsUser from "../../components/Users/DetailsUser/DetailsUser";
import Lottie from 'react-lottie';
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function User(){
    const { user } = useAuth();

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    } 
    if(validatePrivilegio("CONSULTAR_USUARIO").length === 0 ){
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
                <h1 className="text-center">Detalles del usuario</h1>

                <DetailsUser />
            </Container>
        )
    }
}