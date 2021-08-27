import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserTie, faUsers, faLaptopMedical, faHome } from '@fortawesome/free-solid-svg-icons';
import Logo from "./../assets/img/logocomfaoriente.png";
import AvatarDefault from './../assets/img/avatar-default.jpg'
import { Nav, Image } from "react-bootstrap";
import "./LayoutAdmin.scss";
import Welcome from "../pages/Welcome/Welcome";

import useAuth from '../hooks/useAuth';

export default function LayoutAdmin(props){
    const { routes } = props;
    const [ openMenu, setOpenMenu ] = useState(false);
    const { user, isLoading } = useAuth();
    console.log(user);
    //useEffect(() => {
      //  console.log(user);
        if(!user && !isLoading){
            console.log("entro");
            return (
                <>
                    <Route path="/" component={Welcome} exact={true}/>
                    <Redirect to="/" />
                </>
            )
        }
    //}, []);
        if(user && !isLoading){
            return(
                <body className={openMenu ? "body body_move" : "body"}>
            <header className="headers">
                <div className="icon__menu">
                    <FontAwesomeIcon icon={faBars} id="btn_open" onClick={() => setOpenMenu(!openMenu)} className="icon"/>
                </div>
                <Nav className="justify-content-end align-items-center navlayout" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">Giancarlo</Nav.Link>
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
        
                    <Link to="/admin/roles" className="selected">
                        <div className="option">
                            <FontAwesomeIcon icon={faUserTie} className="icon" size="2x" />
                            <h4 className="subtitlesMenu">Roles</h4>
                        </div>
                    </Link>
        
                    <a href="#">
                        <div className="option">
                        <FontAwesomeIcon icon={faUsers} className="icon" size="2x" />
                            <h4 className="subtitlesMenu" >Usuarios</h4>
                        </div>
                    </a>
                    
                    <a href="#">
                        <div className="option">
                        <FontAwesomeIcon icon={faLaptopMedical} className="icon" size="2x" />
                            <h4 className="subtitlesMenu">Controles</h4>
                        </div>
                    </a>
                </div>
        
            </div>
            <main>
                <LoadRoutes routes={routes}/>
            </main>
        
                </body>
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