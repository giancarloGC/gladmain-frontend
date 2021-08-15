import React,{ Fragment } from 'react';
import { Container, Row, Col, Navbar, Nav, Image  } from 'react-bootstrap';

import { Route, Switch } from "react-router-dom";
import Lottie from 'react-lottie';
import animationMom from './../assets/animations/41351-baby-mom-love.json';
import animationMission from './../assets/animations/17374-mission-1.json';
import animationVision from './../assets/animations/17490-vision-text-blob.json';

import Logo from "./../assets/img/logocomfaoriente.png";
import Wallpaper from "./../assets/img/natalya-zaritskaya-SIOdjcYotms-unsplash.jpg"; 

import GalleryHome from "../components/GalleryHome";
import "./LayoutBasic.scss";

export default function LayoutBasic({routes}){
    //                    <LoadRoutes routes={routes} />
/* <Col sm={10}>sm=8</Col>
<Col sm={2}></Col>*/


    return (
        <Fragment>
            <header>
              <Navbar variant="red" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" navbarScroll variant="pills" defaultActiveKey="/login">
                        <Nav.Link href="/home" >Sobre Nosotros</Nav.Link>
                        <Nav.Link href="#link">Galeria</Nav.Link>
                        <Nav.Link href="#link">Contacto</Nav.Link>
                        <Nav.Link href="/login" >Log in</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Navbar.Brand href="#home"><img
                src={Logo}
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                /></Navbar.Brand>
                </Container>
            </Navbar>
            </header>
            <content>
                <Container fluid>
                    <Row>
                        <Col className="justify-content-center align-content-center text-center mb-5">
                            <Lottie height={600} width={400}
                                options={{ loop: true, autoplay: true, animationData: animationMom, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                            />
                            <h1>Programa mis primeros </h1>
                            <h1>años con COMFAORIENTE</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm={6}>
                            <Lottie height={300} width={300}
                                options={{ loop: true, autoplay: true, animationData: animationMission, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                            />
                            <div className="text-center px-5">
                                <h1>Misión</h1>
                                <h5>Somos la Caja de Compensación familiar comprometida en mejorar la calidad de vida de los trabajadores y comunidad del Oriente Colombiano, ofreciendo beneficios a través de su red de servicios integrales.</h5>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Lottie height={300} width={300}
                                options={{ loop: true, autoplay: true, animationData: animationVision, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                            />
                            <div className="text-center px-5">
                                <h1>Visión</h1>
                                <h5>Ser reconocida en el oriente colombiano como empresa líder en responsabilidad social, apoyada en talento humano con tecnología y un portafolio de servicios de alto impacto.</h5>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                                                </Col>
                    </Row>
                </Container>
            </content>
        </Fragment> 

    );
}

function LoadRoutes({routes}) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />
            ))}
        </Switch>
    );
}