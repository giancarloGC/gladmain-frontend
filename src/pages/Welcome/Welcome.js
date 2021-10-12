import React,{ Fragment, useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import moment from 'moment';

import Lottie from 'react-lottie';
import animationMom from './../../assets/animations/41351-baby-mom-love.json';
import Mision from "./../../assets/img/mision.png";
import Vision from "./../../assets/img/vision.png";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";

import Logo from "./../../assets/img/LogoComfaOrienteBlanco.png";

import GalleryHome from "../../components/GalleryHome/GalleryHome";
import Gallery from "../../components/Gallery/Gallery";

import LoginForm from "../../components/Login/LoginForm";
import "./Welcome.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

import * as Scroll from 'react-scroll';

export default function Welcome(){
    const [showLogin, setShowLogin] = useState(false);
    const scroll = Scroll.animateScroll;
    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    let dateCurrent = moment().format("YYYY");

    return (
        <Fragment>
            <header >
            <Row>
            <Col>
            <Container id="portada">
              <Navbar variant="light" inverse fluid >
                <Container >
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" navbarScroll variant="pills" defaultActiveKey="#login" >
                        <Nav.Link href="#about-we" >Sobre Nosotros</Nav.Link>
                        <Nav.Link href="#gallery">Galeria</Nav.Link>
                        <Nav.Link href="#contact">Contacto</Nav.Link>
                        <Nav.Link href="#login" onClick={() => setShowLogin(true)}>Log in</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                        <img src={Logo} width={"25%"} height={"auto"}className="d-inline-block align-top" alt="React Bootstrap logo" />
                </Container>
            </Navbar>
                <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
                    <Row style={{marginTop:"22%"}}>
                        <Col style={{marginBottom:"8%"}} className="justify-content-center align-content-center text-center tituloGladMaIn" > 
                            <h1>Programa mis primeros años con</h1>
                            <h1 >COMFAORIENTE</h1>
                        </Col>
                    </Row>
                    </Container>
                    </Col>
                    </Row>
            </header>
            <content>
                    <Container  fluid>                                 
                    <Row className="justify-content-md-center" id="about-we" className="pt-1 pb-3">
                        <Col sm={6} className="mt-4 mb-5" >
                            <div > 
                            <center>
                             <img src={Mision} alt="img" style={{"width": "50%"}}/>
                            </center>
                            </div>
                            <div className="text-center px-5 mt-4">
                                <h1 >Misión</h1>
                                <h5>Somos la Caja de Compensación familiar comprometida en mejorar la calidad de vida de los trabajadores y comunidad del Oriente Colombiano, ofreciendo beneficios a través de su red de servicios integrales.</h5>
                            </div>
                        </Col>
                        <Col sm={6} className="mt-5">
                        <div > 
                            <center>
                             <img src={Vision} alt="img" style={{"width": "50%"}}/>
                            </center>
                            </div>
                            <div className="text-center px-5  mt-4">
                                <h1>Visión</h1>
                                <h5>Ser reconocida en el oriente colombiano como empresa líder en responsabilidad social, apoyada en talento humano con tecnología y un portafolio de servicios de alto impacto.</h5>
                            </div>
                        </Col>
                    </Row>
                    
                    <div id="fondoGallery" fluid>
                    <Row  id="gallery">
                        <Col>
                            <h1 className="text-center">Galeria</h1>
                            <h5 className="text-center">Los niños son el recurso mas importante del mundo y la esperanza para el futuro </h5>
                            <center><Gallery /></center>
                        </Col>
                    </Row>
                </div>
                </Container>
            </content>
            <footer>
                <Container fluid>
                    <Row id="contact">
                        <Col sm={6} className="mt-3 px-5">
                            <h1 className="titleFooter text-center">GladMain</h1>
                            <h5 className="titleFooter text-center mx-3">
                            "Una buena nutrición y una buena salud están directamente conectadas a través del tiempo de vida, pero la conexión es aún más vital durante la infancia."
                            <p className="mt-2">2005, Organización de los Estados Americanos.</p>
                            </h5>

                            <section className="mb-2 mx-5 text-center">
                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" target="_blank" href="https://www.facebook.com/comfaoriente" role="button">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" target="_blank" href="https://twitter.com/Comfaoriente" role="button">
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" target="_blank" href="https://www.youtube.com/user/MrComfaoriente" role="button">
                                    <FontAwesomeIcon icon={faYoutube}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" target="_blank" href="https://www.instagram.com/comfaoriente/" role="button">
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" target="_blank" href="https://co.linkedin.com/company/caja-de-compensaci%C3%B3n-familiar-comfaoriente" role="button">
                                    <FontAwesomeIcon icon={faLinkedinIn}/>
                                </a>
                            </section>

                        </Col>
                        <Col sm={6} className="mt-5 px-5 mb-5">
                            <Row>
                                <Col sm={6} >
                                    <h1 className="subtitle" style={{"fontSize": "30px"}}>Servicios</h1>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Identificar usuarios en desnutrición</h5>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Llevar seguimiento al control nutricional</h5>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Llevar seguimiento al control de crecimiento y desarrollo</h5>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Llevar seguimiento al control de vacunas</h5>
                                </Col>
                                <Col sm={6}>
                                    <h1 className="subtitle" style={{"fontSize": "30px"}}>Funciones</h1>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Calcular IMC y Estado nutricional</h5>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Graficar patrones de crecimiento infantil (OMS)</h5>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Graficar IMC para la edad Gestacional</h5>
                                    <h5 className="titleFooter" style={{"fontSize": "16px"}}>* Facilitar el acceso a la información</h5>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="containerFinaly">
                            <h5 className="titleFinaly text-center py-3" style={{"fontSize": "12px"}} > {dateCurrent} GladMain. Todos los derechos reservados. Desarrollado por Dayana Medina y Yeimy Moreno (UDES)</h5>
                            <Link id="ast-scroll-top" className="ast-scroll-to-top-right" onClick={() => scrollToTop()}>
                                    <FontAwesomeIcon icon={faChevronUp} size="2x" />
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </Fragment> 

    );
}