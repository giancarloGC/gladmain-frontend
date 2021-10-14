import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner, Form } from "react-bootstrap";
import {BrowserRouter as Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faChartLine, faPhoneAlt, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import { faNutritionix } from '@fortawesome/free-brands-svg-icons';

import ImageNino from "./../../../assets/img/nino.png";
import ImageNina from "./../../../assets/img/nina.png";
import ImageMen from "./../../../assets/img/men.png";
import ImageWomen from "./../../../assets/img/women.png";

import { listUsersByRol, getUserByIdApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";
import Lottie from 'react-lottie';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AnimationAuthorization from "../../../assets/animations/withoutAuthorization.json";
import AnimationErrorServer from "../../../assets/animations/working-server-animation.json";

import AnimationNotFindSearch from "../../../assets/animations/notFindSearch.json";
import { useParams } from "react-router-dom";
import useAuth from '../../../hooks/useAuth'; //privilegios
import "../../../components/Control/ControlHome/AllUserC.scss";

export default function AllUserC (){
    const { rolUser } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ usersApi, setUsersApi ] = useState([]);
    const token = localStorage.getItem(TOKEN);
    const [ authorization, setAuthorization ] = useState(true);
    const [ errorServer, setErrorServer ] = useState(false);
    const [ allUsersSaved, setAllUsersSaved ] = useState([]);
    const [ typeSearch, setTypeSearch ] = useState("nombre");
    const { user } = useAuth(); //privilegios
    
    useEffect(() => {
        (async () => {
            let infUser = user.sub.split("-");
            if(infUser[1] === "2" || infUser[1] === "4"){
                let docUser = parseInt(infUser[0]);
                const response = await getUserByIdApi(docUser, token);

                const dataUser = [];
                dataUser.push(response);
                if(response.status === 403){
                    setLoading(false);
                    setAuthorization(false);
                }else if(response.status === 500){
                    setLoading(false);
                    setErrorServer(true);
                }else{
                    setLoading(false);
                    setAllUsersSaved(dataUser);
                    setUsersApi(dataUser);
                }
            }else{
                const response = await listUsersByRol(rolUser, token);
            
                if(response.status === 403){
                    setLoading(false);
                    setAuthorization(false);
                }else if(response.status === 500){
                    setLoading(false);
                    setErrorServer(true);
                }else{
                    setLoading(false);
                    setAllUsersSaved(response);
                    setUsersApi(response);
                }
            }
        })();
    }, [rolUser]);

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

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

            {errorServer && (
                <>
                    <h1 style={{"textAlign": "center"}}>Error en el servidor, intentelo más tarde</h1>
                        <Lottie height={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationErrorServer, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
            )}

            {loading && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                        <Spinner animation="border" ></Spinner> 
                    </Col>
                </Row>
            )}

            {!errorServer && allUsersSaved && (
                <>
                {console.log("entro1")};
                    {allUsersSaved.length > 0  && (
                        <>
                            <h1 className="text-center">{rolUser === "MADRE_GESTANTE" ? "Listado de Madres Gestantes" : "Listado de Infantes"} </h1>
                           {console.log("entro2")};
                            <Row className="justify-content-center">
                                <Col md={4}>
                                    <Form.Control style={{borderColor: "#1783db"}} type="search" placeholder="Buscar Usuario" size="lg" onChange={(e) => search(e)} name="busqueda" 
                                        className="mb-1 mt-3"/>
                                </Col>
                                <Col md={3}>
                                    <Form.Select style={{borderColor: "#1783db"}} className="mb-1 mt-3" size="lg" name="tipoDocumento" onChange={(e) => setTypeSearch(e.target.value)}>
                                        <option value="nombre" selected>Buscar por nombre</option>
                                        <option value="documento">Buscar por documento</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </>
                    )}

                    {usersApi.length === 0 && (
                        <>
                        {console.log("entro3")};
                            <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
                            <Lottie height={500} width="80%" options={{ loop: true, autoplay: true, animationData: 
                                AnimationNotFindSearch, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}/>
                        </>
                    )}

                    <div className="containerGListUsers">
                        <div className="sectionDiv">
                        {usersApi.length > 0 && (
                            <div className="containerP">
                                {usersApi.map((item, index) => (
                                    rolUser === "MADRE_GESTANTE" ? item.edad >= 156 && item.sexo === "FEMENINO" && (
                                        <div className="card">
                                            <div className="content">
                                                <div className="imgBx">
                                                    {item.edad >= 156 ? 
                                                        <img src={item.sexo === "FEMENINO" ? ImageWomen : ImageMen} alt="img" />
                                                    :
                                                        <img src={item.sexo === "FEMENINO" ? ImageNina : ImageNino} alt="img" />
                                                    }
                                                </div>
                                                <div className="contentBx">
                                                    <h3>{item.nombre}<br/> 
                                                        <span>CC {item.documento}</span> <br />
                                                        <span><FontAwesomeIcon icon={faPhoneAlt} size="lg" color="#2D61A4"/> {item.celular}</span>
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="sci">
                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_SEGUIMIENTOS").length > 0 && ("CONSULTAR_USUARIO").length > 0 && ("LISTAR_INGRESOS_MADRE").length > 0 && (
                                                    <Link className="enlace" to={`/admin/ListFollowUp/${item.documento}/${rolUser}`}>
                                                        <FontAwesomeIcon icon={faFileMedicalAlt} size="lg" color="#2D61A4" data-tip data-for = "boton4"/>
                                                        <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Seguimiento </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>

                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_CONTROLES_NUTRICIONALES").length > 0 && (
                                                    <Link className="enlace"  to={`/admin/statisticHomeMadre/${item.documento}/${rolUser}`}>
                                                        <FontAwesomeIcon icon={faNutritionix} size="lg" color="#2D61A4" data-tip data-for = "boton1"/>
                                                        <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Nutrición </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>

                                                {rolUser === "MADRE_GESTANTE" || (
                                                    <div className="liB">
                                                        <Link className="enlace" to={`/admin/listControlCyD/${item.documento}`}>
                                                            <FontAwesomeIcon icon={faChartLine} size="lg" color="#2D61A4" data-tip data-for = "boton2"/>
                                                            <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Crecimiento y Desarrollo </ReactTooltip>
                                                        </Link>
                                                    </div>
                                                )}

                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_CONTROLES_VACUNACION").length > 0 && ("CONSULTAR_USUARIO").length > 0 && (
                                                    <Link className="enlace" to={`/admin/listVacMadre/${item.documento}`}>
                                                        <FontAwesomeIcon icon={faSyringe} size="lg" color="#2D61A4" data-tip data-for = "boton3"/>
                                                        <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Vacunación </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                        item.edad < 156 && 
                                    (
                                        <div className="card">
                                            <div className="content">
                                                <div className="imgBx">
                                                    {item.edad >= 156 ? 
                                                        <img src={item.sexo === "FEMENINO" ? ImageWomen : ImageMen} alt="img" />
                                                    :
                                                        <img src={item.sexo === "FEMENINO" ? ImageNina : ImageNino} alt="img" />
                                                    }
                                                </div>

                                                <div className="contentBx">
                                                    <h3>{item.nombre}<br/> 
                                                        <span> {item.tipoDocumento} : {item.documento}</span> <br />
                                                        <span><FontAwesomeIcon icon={faPhoneAlt} size="lg" color="#2D61A4" style={{marginRight:10}}/> 
                                                            {item.celular}
                                                        </span>
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="sci">
                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_SEGUIMIENTOS").length > 0 && ("LISTAR_INGRESOS_INFANTE").length > 0 && ("CONSULTAR_USUARIO").length > 0 && (
                                                    <Link className="enlace" to={`/admin/ListFollowUp/${item.documento}/${rolUser}`}>
                                                        <FontAwesomeIcon icon={faFileMedicalAlt} size="lg" color="#2D61A4" data-tip data-for = "boton4"/>
                                                        <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Seguimiento </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>

                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_CONTROLES_NUTRICIONALES").length > 0 && (
                                                    <Link className="enlace"  to={`/admin/graphics/${item.edad}/${item.sexo}/${item.documento}/${rolUser}`}>
                                                        <FontAwesomeIcon icon={faNutritionix} size="lg" color="#2D61A4" data-tip data-for = "boton1"/>
                                                        <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Nutrición </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>

                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_CONTROLES_CYD").length > 0 && ("ULTIMO_CONTROL_CYD").length > 0 && (
                                                    <Link className="enlace" to={`/admin/listControlCyD/${item.documento}`}>
                                                        <FontAwesomeIcon icon={faChartLine} size="lg" color="#2D61A4" data-tip data-for = "boton2"/>
                                                        <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Crecimiento y Desarrollo </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>

                                                <div className="liB">
                                                {validatePrivilegio("LISTAR_CONTROLES_VACUNACION").length > 0 && ("CONSULTAR_USUARIO").length > 0 && (
                                                    <Link className="enlace" to={`/admin/listVaccines/${item.documento}`}>
                                                        <FontAwesomeIcon icon={faSyringe} size="lg" color="#2D61A4" data-tip data-for = "boton3"/>
                                                        <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Vacunación </ReactTooltip>
                                                    </Link>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            )}
                        </div>
                    </div>
                </>
            )}       
        </>
    )
}