import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner, Form } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import ImageMen from "./../../../assets/img/men.png";
import ImageWomen from "./../../../assets/img/women.png";
import ImageNino from "./../../../assets/img/nino.png";
import ImageNina from "./../../../assets/img/nina.png";

import { getUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";

import Lottie from 'react-lottie';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AnimationAuthorization from "../../../assets/animations/withoutAuthorization.json";
import AnimationNotFindSearch from "../../../assets/animations/notFindSearch.json";

export default function UsersDesnutrition(props){
    const { usersApi, setUsersApi, allUsersSaved, setAllUsersSaved } = props;
    const [ loading, setLoading ] = useState(true);
    const token = localStorage.getItem(TOKEN);
    const [ authorization, setAuthorization ] = useState(true);
    const [ typeSearch, setTypeSearch ] = useState("nombre");

    const search = (e) => {
        let usersFiltred = [];
        if(typeSearch === "nombre"){
            usersFiltred = allUsersSaved.filter(user => user.nombre.search(e.target.value.toLowerCase()) >= 0);
        }else{
            let documento = e.target.value;
            usersFiltred = allUsersSaved.filter(user => user.documento.toString().search(documento) >= 0);
        }
        setUsersApi(usersFiltred);
    }

    return(
        <>
            {authorization || (
                <>
                    <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                    <Lottie height={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
            )}
       
            {allUsersSaved && (
                <>
                {allUsersSaved.length > 0  && (
                    <>
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <Form.Control style={{borderColor: "#1783db"}} type="search" placeholder="Buscar Usuario" size="lg" onChange={(e) => search(e)} name="busqueda" 
                                className="mb-1 mt-3"
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Select style={{borderColor: "#1783db"}} className="mb-1 mt-3" size="lg" name="tipoDocumento" onChange={(e) => setTypeSearch(e.target.value)}
                            >
                                <option value="nombre" selected>Buscar por nombre</option>
                                <option value="documento">Buscar por documento</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    </>
                )}

                {usersApi.length === 0 && (
                    <>
                        <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
                        <Lottie height={500} width="80%"
                            options={{ loop: true, autoplay: true, animationData: AnimationNotFindSearch, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                        />
                    </>
                )}

                <div className="containerGListUsers">
                <div className="sectionDiv">
                    <div className="containerP" >
                    {usersApi.map((item, index) => (
                        <div className="card" >
                        <div className="content">
                            <div className="imgBx">
                                {item.edad > 216 ? 
                                    <img src={item.sexo === "FEMENINO" ? ImageWomen : ImageMen} alt="img" />
                                :
                                    <img src={item.sexo === "FEMENINO" ? ImageNina : ImageNino} alt="img" />
                            }
                            </div>
                            <div className="contentBx" >
                                <h3>{item.nombre}<br/> 
                                    <span> {item.tipoDocumento} : {item.documento}</span> <br />
                                    <span><FontAwesomeIcon icon={faPhoneAlt} size="lg" color="#2D61A4" style={{marginRight:10}}/> 
                                    {item.celular}
                                    </span>
                                </h3>
                            </div>
                        </div>
                        <div className="sci">
                            <div className="liB" >
                                <Link className="enlace" to={`/admin/user/${item.documento}`}>
                                <FontAwesomeIcon icon={faEye} size="lg" color="#2D61A4" data-tip data-for = "boton1"
                                /> <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                                </Link>
                            </div>
                            <div className="liB">
                            <Link className="enlace" to={`/admin/editUser/${item.documento}`}>
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="#2D61A4" data-tip data-for = "boton2"
                                /> <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                                </Link>
                            </div>
                            
                        </div>
                    </div>                
                    ))}
                    </div>
                </div>
                </div>
                </>
            )}       
        </>
    )
}