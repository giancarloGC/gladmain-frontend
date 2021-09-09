import React,{ Fragment, useState } from 'react';
import { Container, Row, Col, Navbar, Nav  } from 'react-bootstrap';

import Lottie from 'react-lottie';
import animationMom from './../../assets/animations/41351-baby-mom-love.json';
import animationMission from './../../assets/animations/17374-mission-1.json';
import animationVision from './../../assets/animations/17490-vision-text-blob.json';

import Logo from "./../../assets/img/logocomfaoriente.png";
import index from "./../../assets/img/index.png";

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

    return (
        <Fragment>
            <header>
              <Navbar variant="light" collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" navbarScroll variant="pills" defaultActiveKey="#login">
                        <Nav.Link href="#about-we" >Sobre Nosotros</Nav.Link>
                        <Nav.Link href="#gallery">Galeria</Nav.Link>
                        <Nav.Link href="#contact">Contacto</Nav.Link>
                        <Nav.Link href="#login" onClick={() => setShowLogin(true)}>Log in</Nav.Link>
                    </Nav>
                    <Navbar.Brand href="#home">
                        <img src={Logo} className="d-inline-block align-top" alt="React Bootstrap logo"/>
                    </Navbar.Brand>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            </header>
            <content>
                <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
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
                    <Row className="justify-content-md-center" id="about-we">
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

                    <Row className="mt-5 pt-5" id="gallery">
                        <Col>
                            <h1 className="text-center">Galeria</h1>
                            <h5 className="text-center">Los niños son el recurso mas importante del mundo y la esperanza para el futuro </h5>
                            <Gallery />
                        </Col>
                    </Row>
                </Container>
            </content>
            <footer>
                <Container fluid>
                    <Row id="contact">
                        <Col sm={6} className="mt-5 px-5 mb-5">
                            <h1 className="titleFooter text-center">GladMain</h1>
                            <h5 className="titleFooter text-center mx-5">Lorem ipsum dolor sit amet, consectetur adip lorem ipsum, Lorem ipsum dolor sit amet, consectetur adip lorem ipsum</h5>

                            <section className="mb-4 mx-5 text-center">
                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" href="https://www.facebook.com/UdesCucutaOficial" role="button">
                                    <FontAwesomeIcon icon={faFacebookF}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" href="https://twitter.com/UDESCUCUTA" role="button">
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" href="https://www.youtube.com/channel/UCxf67LeWjLY9n4RtNEINDAA" role="button">
                                    <FontAwesomeIcon icon={faYoutube}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" href="https://www.instagram.com/udescampuscucuta/?hl=es" role="button">
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>

                                <a className="btn btn-primary btn-floating m-1 btnSocialMedia" href="https://www.linkedin.com/school/universidad-de-santander/" role="button">
                                    <FontAwesomeIcon icon={faLinkedinIn}/>
                                </a>
                            </section>

                        </Col>
                        <Col sm={6} className="mt-5 px-5 mb-5">
                            <Row>
                                <Col sm={4}>
                                    <h3 className="subtitle">Products</h3>
                                    <h5 className="titleFooter">Product 1</h5>
                                    <h5 className="titleFooter">Product 2</h5>
                                    <h5 className="titleFooter">Product 3</h5>
                                    <h5 className="titleFooter">Product 4</h5>
                                </Col>
                                <Col sm={4}>
                                    <h3 className="subtitle">Services</h3>
                                    <h5 className="titleFooter">Service 1</h5>
                                    <h5 className="titleFooter">Service 2</h5>
                                    <h5 className="titleFooter">Service 3</h5>
                                    <h5 className="titleFooter">Service 4</h5>
                                </Col>
                                <Col sm={4}>
                                    <h3 className="subtitle">Resources</h3>
                                    <h5 className="titleFooter">News</h5>
                                    <h5 className="titleFooter">Blog</h5>
                                    <h5 className="titleFooter">Videos</h5>
                                    <h5 className="titleFooter">FAQS</h5>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="containerFinaly">
                            <h5 className="titleFinaly text-center py-3">2020 GladMain. All Rights Reserved</h5>
                            <a id="ast-scroll-top" className="ast-scroll-to-top-right" onClick={() => scrollToTop()}>
                                    <FontAwesomeIcon icon={faChevronUp} size="2x" />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </Fragment> 

    );
}