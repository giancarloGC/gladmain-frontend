import React from "react";
import { Container } from "react-bootstrap";
import Lottie from 'react-lottie';
import AnimationNotFound from "./../assets/animations/404-not-found.json"

export default function NotFound404(){
    return(
        <Container>
            <p style={{"color": "#2D61A4", "font-size": 27}}>Pagína no encontrada</p>
            <Lottie height={600} width={870}
                options={{ loop: true, autoplay: true, animationData: AnimationNotFound, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
            />
        </Container>
    )
}