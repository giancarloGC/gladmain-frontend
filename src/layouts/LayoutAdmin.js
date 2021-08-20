import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserTie, faUsers, faLaptopMedical, faHome } from '@fortawesome/free-solid-svg-icons';
import Logo from "./../assets/img/logocomfaoriente.png";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(){
    const [ openMenu, setOpenMenu ] = useState(false);
    var body = document.getElementById("body");
    var side_menu = document.getElementById("menu_side");

    const open_close_menu = () => {
        //body.classList.toggle("body_move");
        //side_menu.classList.toggle("menu__side_move");
    }

    return(
        <body className={openMenu ? "body body_move" : "body"}>
    <header className="headers">
        <div className="icon__menu">
            <FontAwesomeIcon icon={faBars} id="btn_open" onClick={() => setOpenMenu(!openMenu)} className="icon"/>
        </div>
    </header>


    <div className={openMenu ? "menu__side menu__side_move" : "menu__side"} id="menu_side">

        <div className="name__page">
        <FontAwesomeIcon icon={faHome} className="icon"/>
            <img src={Logo} alt="image-logo" style={{"width": "150px"}} />
        </div>

        <div className="options__menu">	

            <a href="#" className="selected">
                <div className="option">
                    <FontAwesomeIcon icon={faUserTie} className="icon" />
                    <h4 className="subtitlesMenu">Roles</h4>
                </div>
            </a>

            <a href="#">
                <div className="option">
                <FontAwesomeIcon icon={faUsers} className="icon"/>
                    <h4 className="subtitlesMenu" >Usuarios</h4>
                </div>
            </a>
            
            <a href="#">
                <div className="option">
                <FontAwesomeIcon icon={faLaptopMedical} className="icon"/>
                    <h4 className="subtitlesMenu">Controles</h4>
                </div>
            </a>
        </div>

    </div>
    <main>
        <h1>Title Exemple</h1>
        <br/>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam sapiente cumque dicta animi explicabo sequi. Ex amet et, dolor eligendi commodi consectetur quo voluptatibus, cum nemo porro veniam at blanditiis?</p> 
        <br/>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident adipisci beatae impedit quia, deleniti quasi sequi iusto exercitationem nihil nulla, laboriosam dolore corrupti fuga officiis? Odit a mollitia id magnam amet delectus quia blanditiis reprehenderit explicabo eveniet! Rem voluptatum explicabo ipsum quae, dolorum, laudantium doloribus a, illum saepe sapiente accusantium dicta reiciendis? Amet iure porro voluptatum error fugit odit voluptas?</p>
    </main>

        </body>
    );
}