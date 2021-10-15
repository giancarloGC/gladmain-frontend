import React from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import FormUser from "../../components/Users/FormUser/FormUser";
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import useAuth from '../../hooks/useAuth'; 

export default function AddUser(){ 
    const { user } = useAuth();

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    if(validatePrivilegio("REGISTRAR_USUARIO").length === 0){
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
                <h1 className="text-center">Añadir usuario</h1>
                <FormUser />
            </Container>
        )
    }
}