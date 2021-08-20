import React from 'react'
import Lottie from 'react-lottie';
import { Container } from "react-bootstrap";
import animationPeople from './../../assets/animations/67404-business.json';
import "./Home.scss";

export default function Home(){



//Haciendo el menú respon
    return(
        <Container className="justify-content-center">
                    <h1 className="text-center">Bienvenido a GladMain...</h1>
        <Lottie className="animationPeople"
            options={{ loop: true, autoplay: true, animationData: animationPeople, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
        />
        </Container>
    )
}