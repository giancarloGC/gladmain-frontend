import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { faBars, faUserTie, faUsers, faLaptopMedical, faHome, faUserEdit, faPowerOff, faCalculator} from '@fortawesome/free-solid-svg-icons';
import Logo from "./../assets/img/logocomfaoriente.png";
import AvatarDefault from './../assets/img/avatar-default.jpg'
import { Nav, Image, NavDropdown, Container, Row, Spinner, Col } from "react-bootstrap";
import "./LayoutAdmin.scss";
import { getUserByIdApi, listUsersByRol } from "../api/user";
import { getControlNutriApi, getControlCyDApi } from "../api/controls";
import { TOKEN } from "../utils/constans";

import useAuth from '../hooks/useAuth';


export default function LayoutAdmin(props){
    const { routes } = props;
    const [ openMenu, setOpenMenu ] = useState(false);
    const [ linkSelected, setLinkSelected ] = useState({home: true, roles: false, users: false, controls: false, calculator: false});
    const { user, isLoading } = useAuth();
    const [ infoUser, setInfoUser ] = useState({});
    const [ loading, setLoading] = useState("");
    let componentMounted = false;
    const token = localStorage.getItem(TOKEN);
    const [ countAlerts, setCountAlerts ] = useState(0);
    const [ showAlert, setShowAlert ] = useState(false);

    useEffect(() => {
        (async () => {
            componentMounted = true;
            if(componentMounted){
                    if(user && !isLoading){
                        tal();
                        setLoading("true");
                        //Alertas
                        const roleUser = user.sub.split('-');
                        if(roleUser[1] === "1" || roleUser[1] === "3"){
                            await resolveAlerts();
                        }else if(roleUser[1] === "2"){
                            await resolveControl(); 
                        }
                    }
    
                    if(!user && !isLoading){
                        //setLoading(true);FFFFFFFD
                        setLoading("notFound");
                        //window.location.replace("/");
                        /*return (
                            <>
                                <Route path="/" component={Welcome} exact={true}/>
                                <Redirect to="/" />
                            </>
                        )*/
                    }
        
            }
        })()
    }, [user]);

    const resolveAlerts = async () => {
        await consultIntantes();
    }

    const consultIntantes = async () => {
        console.log("start");

        const responseUsers = await listUsersByRol("INFANTE", token);
        let total = 0;
        await responseUsers.map(async (userInfant, index) => {
            let result = await consultControls(userInfant.documento);
            if(result === 1){
                total ++;
            }
        });
        setTimeout(() => {
            console.log(total);
            toast.error(<Msg countAlerts={total} />, {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            setShowAlert(true);
        }, 4000);
        setCountAlerts(total);
    }

    const consultControls = async (documentoInf) => {
        const responseControls = await getControlNutriApi(documentoInf, token);
        if(responseControls.length > 0){
            for(var i = 0; i < responseControls.length; i++ ){
                if(responseControls[i].estadoNutricional === "Riesgo de Desnutrición Aguda"){
                    return 1;
                }else{
                    return 0;
                }
            };
        }
    }

    const resolveControl = async () => {
        const dateCurrently = moment();

        let document = user.sub.split("-");
        const controls = await getControlCyDApi(document[0], token);
        const ultimoC = controls.sort(function (a, b){
            return (b.id - a.id)
        });

        let dateControlU = moment(ultimoC[0].proximoControl);
        if (dateControlU.diff(dateCurrently, 'hours') > 0) {
            let daysFaltan = dateControlU.diff(dateCurrently, 'days');
            toast.warn(`¡Tiene un atraso de ${daysFaltan} días en su control de crecimiento y desarrollo!`, {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setShowAlert(true);
        }else{
            let daysFaltan = dateCurrently.diff(dateControlU, 'days');
            toast.info(`¡Te faltan ${daysFaltan} días para registrar tu próximo control crecimiento y desarrollo!`, {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setShowAlert(true);
        }
    }

    const tal = async () => {
        let document = user.sub.split("-");
        const response = await getUserByIdApi(document[0], token);
            setInfoUser(response);
    }

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    const signOff = () => {
        localStorage.removeItem(TOKEN);
        window.location.replace("/");
    };

    return (
        <>
                {user && (
                    <div className={openMenu ? "body body_move" : "body"}>
                    <header className="headers">
                        <div className="icon__menu">
                            <FontAwesomeIcon icon={faBars} id="btn_open" onClick={() => setOpenMenu(!openMenu)} className="icon"/>
                        </div>
                        <Nav className="justify-content-end align-items-center navlayout" activeKey="/home">
                    <Nav.Item>
                        <div className="option" id="/home">
                            <NavDropdown title={infoUser.nombre} id="nav-dropdown" className="subtitlesMenu"
                                style={{"fontSize": "24px", "fontWeight": 150, "color": "#D4D1D1"}}
                            >
                            <NavDropdown.Item><Link to={`/admin/EditProfileUser/${infoUser.documento}`}>
                            <h5><FontAwesomeIcon icon={faUserEdit} className="icon" size="1x" fill="currentColor"/>  Editar Perfil</h5></Link></NavDropdown.Item>
                                
                            <NavDropdown.Divider />
                            <NavDropdown.Item><h5 onClick={() => signOff()}><FontAwesomeIcon icon={faPowerOff} className="icon" size="1x"fill="currentColor"/>  Cerrar Sesión </h5></NavDropdown.Item>
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
                            <Link to="/admin" className={linkSelected.home ? "selected" : ""} 
                               onClick={() => setLinkSelected({home: true, roles: false, users: false, controls: false, calculator: false})}
                            >
                                <FontAwesomeIcon icon={faHome} className="icon-home" size="lg"/>
                                
                            </Link>
                            <img src={Logo} alt="image-logo" style={{"width": "150px"}} />
                        </div>
                
                        <div className="options__menu">	
                            {validatePrivilegio("LISTAR_ROLES").length > 0 && (
                                <Link to="/admin/roles" className={linkSelected.roles ? "selected" : ""} 
                                    onClick={() => setLinkSelected({roles: true, users: false, controls: false})}
                                >
                                    <div className="option">
                                        <FontAwesomeIcon icon={faUserTie} className="icon" size="2x"/>
                                        <h4 className="subtitlesMenu">Roles</h4>
                                    </div>
                                </Link>
                            )}

                            {validatePrivilegio("LISTAR_USUARIOS").length > 0 && (                
                                <Link to="/admin/users" className={linkSelected.users ? "selected" : ""}                             onClick={() => setLinkSelected({roles: false, users: true, controls: false})}
                                        onClick={() => setLinkSelected({roles: false, users: true, controls: false})}
                                >
                                    <div className="option">
                                    <FontAwesomeIcon icon={faUsers} className="icon" size="2x"/>
                                        <h4 className="subtitlesMenu" >Usuarios</h4>
                                    </div>
                                </Link>
                            )}


                            {validatePrivilegio("LISTAR_USUARIOS_ROL").length > 0 && (                
                                <Link to="#" className={linkSelected.controls ? "selected" : ""}
                                    onClick={() => setLinkSelected({roles: false, users: false, controls: true})}
                                >
                                    <div className="option">
                                    <FontAwesomeIcon icon={faLaptopMedical} className="icon" size="2x" onClick={() => setOpenMenu(!openMenu)}/>
                                    <NavDropdown title="Controles" id="nav-dropdown" className="subtitlesMenu"
                                        style={{"fontSize": "24px", "fontWeight": 100, "color": "#ffff"}}
                                    >
                                        <NavDropdown.Item><Link to="/admin/listUserControl/INFANTE"><h5>Infantes</h5></Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item><Link to="/admin/listUserControl/MADRE_GESTANTE"><h5>Madres gestantes</h5></Link></NavDropdown.Item>
                                    </NavDropdown>
                                    </div>
                                </Link>
                            )}
                                            
                            <Link to="/admin/calculator" className={linkSelected.calculator ? "selected" : ""}                         
                                    onClick={() => setLinkSelected({home: false, roles: false, users: false, controls: false, calculator: true})}
                            >
                                <div className="option">
                                <FontAwesomeIcon icon={faCalculator} className="icon" size="2x"/>
                                    <h4 className="subtitlesMenu" >Calcular nutrición</h4>
                                </div>
                            </Link>
                        </div>
                
                    </div>
                    <main>
                        {showAlert && (
                            <ToastContainer />
                        )}
                        <LoadRoutes routes={routes}/>
                    </main>
                
                        </div>
                )}
                
                {isLoading === true &&(
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

                {!user && !isLoading && (
                    <Redirect to="/" />
                )}
                </>
    )

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

const Msg = ({ closeToast, toastProps, countAlerts }) => {
    console.log(countAlerts);
    return(
        <div onClick={() => console.log("jiji")}>
        ¡Hay {countAlerts} niños en riesgo de desnutrición!
    </div>
    )
}