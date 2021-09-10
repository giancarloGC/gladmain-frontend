import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserTie, faUsers, faLaptopMedical, faHome, faUserEdit, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import Logo from "./../assets/img/logocomfaoriente.png";
import AvatarDefault from './../assets/img/avatar-default.jpg'
import { Nav, Image, NavDropdown, Container, Row, Spinner, Col } from "react-bootstrap";
import "./LayoutAdmin.scss";
import Welcome from "../pages/Welcome/Welcome";
import { getUserByIdApi } from "../api/user";
import { TOKEN } from "../utils/constans";

import useAuth from '../hooks/useAuth';


export default function LayoutAdmin(props){
    const { routes } = props;
    const [ openMenu, setOpenMenu ] = useState(false);
    const [ linkSelected, setLinkSelected ] = useState({roles: true, users: false, controls: false});
    const { user, isLoading } = useAuth();
    const [ infoUser, setInfoUser ] = useState({});
    const [ loading, setLoading] = useState(false);
    let componentMounted = false;

    const signOff=() => {
        localStorage.removeItem(TOKEN);
        window.location.replace("/");
    };
    
    useEffect(() => {
        if(!user && !isLoading){
            console.log("entro");
            return (
                <>
                    <Route path="/" component={Welcome} exact={true}/>
                    <Redirect to="/" />
                </>
            )
        }
        componentMounted = true;
        if(componentMounted){
            if(user){
            const token = localStorage.getItem(TOKEN);
            let document = user.sub.split("-");
            getUserByIdApi(document[0], token).then(response => {
                setInfoUser(response);
            })
            
            setLoading(true);

        }
    }

    }, [user]);
        if(user && !isLoading){
            return(
                <>
                {loading ? (
                    <div className={openMenu ? "body body_move" : "body"}>
                    <header className="headers">
                        <div className="icon__menu">
                            <FontAwesomeIcon icon={faBars} id="btn_open" onClick={() => setOpenMenu(!openMenu)} className="icon"/>
                        </div>
                        <Nav className="justify-content-end align-items-center navlayout" activeKey="/home">
                    <Nav.Item>
                      <Nav.Link href="/home">{infoUser.nombre}</Nav.Link>
                        <div className="option" id="/home">
                            {/*<FontAwesomeIcon icon={faLaptopMedical} className="icon" size="2x" onClick={() => setOpenMenu(!openMenu)}/>*/}
                            <NavDropdown title={infoUser.nombre} id="nav-dropdown" className="subtitlesMenu"
                                style={{"font-size": "24px", "font-weight": 150, "color": "#D4D1D1"}}
                            >
                            <NavDropdown.Item><Link to="/admin/editUser/:documento">
                                <FontAwesomeIcon icon={faUserEdit} className="icon" size="1x" fill="currentColor"/>
                                <h5>Editar Perfil</h5></Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <FontAwesomeIcon icon={faPowerOff} className="icon" size="1x"fill="currentColor"/>
                            <NavDropdown.Item><Link to={signOff}><h5>Cerrar Sesión</h5></Link></NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="disabled">
                      <Image src={AvatarDefault} roundedCircle fluid className="avatar"/>
                
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                
                    </header>
                
                
                    <div className={openMenu ? "menu__side menu__side_move" : "menu__side"} id="menu_side">
                
                        <div className="name__page">
                        <FontAwesomeIcon icon={faHome} className="icon" size="2x" />
                            <img src={Logo} alt="image-logo" style={{"width": "150px"}} />
                        </div>
                
                        <div className="options__menu">	
                
                            <Link to="/admin/roles" className={linkSelected.roles ? "selected" : ""} 
                                onClick={() => setLinkSelected({roles: true, users: false, controls: false})}
                            >
                                <div className="option">
                                    <FontAwesomeIcon icon={faUserTie} className="icon" size="2x"/>
                                    <h4 className="subtitlesMenu">Roles</h4>
                                </div>
                            </Link>
                
                            <Link to="/admin/users" className={linkSelected.users ? "selected" : ""}                             onClick={() => setLinkSelected({roles: false, users: true, controls: false})}
                                    onClick={() => setLinkSelected({roles: false, users: true, controls: false})}
                            >
                                <div className="option">
                                <FontAwesomeIcon icon={faUsers} className="icon" size="2x"/>
                                    <h4 className="subtitlesMenu" >Usuarios</h4>
                                </div>
                            </Link>
                            
                            <Link to="#" className={linkSelected.controls ? "selected" : ""}
                                onClick={() => setLinkSelected({roles: false, users: false, controls: true})}
                            >
                                <div className="option">
                                <FontAwesomeIcon icon={faLaptopMedical} className="icon" size="2x" onClick={() => setOpenMenu(!openMenu)}/>
                                <NavDropdown title="Controles" id="nav-dropdown" className="subtitlesMenu"
                                    style={{"font-size": "24px", "font-weight": 100, "color": "#ffff"}}
                                >
                                <NavDropdown.Item><Link to="/admin/listUserControl/infantes"><h5>Infantes</h5></Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item><Link to="/admin/listUserControl/madresGestantes"><h5>Madres gestantes</h5></Link></NavDropdown.Item>
                                </NavDropdown>
                                </div>
                            </Link>
                        </div>
                
                    </div>
                    <main>
                        <LoadRoutes routes={routes}/>
                    </main>
                
                        </div>
                ) 
                : 
                (
                    <Container>
                        <Row className="justify-content-md-center text-center">
                            <Col md={1} className="justify-content-center">
                            <Spinner animation="border" >
                            </Spinner> 
                            </Col>
                        </Row>  
                    </Container>      
                )
                }
                </>
            );
        }

        return null;
}

function LoadRoutes({routes}){
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.component}/>
            ))}
        </Switch>
    );
}