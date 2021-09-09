import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import {BrowserRouter as Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faChartLine, faPhoneAlt, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import { faNutritionix } from '@fortawesome/free-brands-svg-icons';

import ImageNino from "./../../../assets/img/nino.png";
import ImageNina from "./../../../assets/img/nina.png";
import ImageMen from "./../../../assets/img/men.png";
import ImageWomen from "./../../../assets/img/women.png";

import { getUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";

import "../../../components/Control/ControlHome/AllUserC.scss";

export default function AllUserC ({role}){
    const [ loading, setLoading ] = useState(true);
    const [ usersApi, setUsersApi ] = useState([]);
    const token = localStorage.getItem(TOKEN);
    
    useEffect(() => {
        (async () => {
            const response = await getUserApi(token);
            setLoading(false);
            setUsersApi(response);
        })();
    }, []);


    return(
        <>
            {loading && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}

    
            <div className="containerGListUsers">
                <div className="sectionDiv">
                    <div className="containerP">
                        {usersApi && (
                            usersApi.map((item, index) => (
                                role === "madresGestantes" ? item.edad > 18 && item.sexo === "Femenino" && (
                                <div className="card">
                                    <div className="content">
                                        <div className="imgBx">
                                            {item.edad > 18 ? 
                                                <img src={item.sexo === "Femenino" ? ImageWomen : ImageMen} alt="img" />
                                            :
                                                <img src={item.sexo === "Femenino" ? ImageNina : ImageNino} alt="img" />
                                            }
                                        </div>
                                        <div className="contentBx">
                                            <h3>{item.nombre}<br/> 
                                                <span>CC {item.documento}</span> <br />
                                                <span><FontAwesomeIcon icon={faPhoneAlt} size="lg" color="#2D61A4"
                                                /> {item.celular}
                                                </span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="sci">
                                        <div className="liB">
                                            <Link className="enlace"  to="/">
                                               <FontAwesomeIcon icon={faNutritionix} size="lg" color="#2D61A4"
                                               data-tip data-for = "boton1"/>
                                               <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Nutrición </ReactTooltip>
                                            </Link>
                                        </div>

                                        {role === "madresGestantes" || (
                                        <div className="liB">
                                            <Link className="enlace" to={`/admin/listControlCyD/${item.documento}`}>
                                                <FontAwesomeIcon icon={faChartLine} size="lg" color="#2D61A4"
                                                data-tip data-for = "boton2"/>
                                                <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Crecimiento y Desarrollo </ReactTooltip>
                                            </Link>
                                        </div>
                                        )}
                                        <div className="liB">
                                            <Link className="enlace" to={`/admin/listVaccines/${item.documento}`}>
                                                <FontAwesomeIcon icon={faSyringe} size="lg" color="#2D61A4"
                                                data-tip data-for = "boton3"/>
                                                <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Vacunación </ReactTooltip>
                                            </Link>
                                        </div>
                                        <div className="liB">
                                            <Link className="enlace" to="/">
                                                <FontAwesomeIcon icon={faFileMedicalAlt} size="lg" color="#2D61A4"
                                                data-tip data-for = "boton4"/>
                                                <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Seguimiento </ReactTooltip>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                )
                                :
                                    item.edad < 18 && 
                                (
                                    <div className="card">
                                        <div className="content">
                                            <div className="imgBx">
                                                {item.edad > 18 ? 
                                                    <img src={item.sexo === "Femenino" ? ImageWomen : ImageMen} alt="img" />
                                                :
                                                    <img src={item.sexo === "Femenino" ? ImageNina : ImageNino} alt="img" />
                                                }
                                            </div>
                                            <div className="contentBx">
                                                <h3>{item.nombre}<br/> 
                                                    <span>CC {item.documento}</span> <br />
                                                    <span><FontAwesomeIcon icon={faPhoneAlt} size="lg" color="#2D61A4"
                                                    /> jola
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="sci">
                                            <div className="liB">
                                                <Link className="enlace"  to="/">
                                                   <FontAwesomeIcon icon={faNutritionix} size="lg" color="#2D61A4"
                                                   data-tip data-for = "boton1"/>
                                                   <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Nutrición </ReactTooltip>
                                                </Link>
                                            </div>
                                            <div className="liB">
                                                <Link className="enlace" to={`/admin/listControlCyD/${item.documento}`}>
                                                    <FontAwesomeIcon icon={faChartLine} size="lg" color="#2D61A4"
                                                    data-tip data-for = "boton2"/>
                                                    <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Crecimiento y Desarrollo </ReactTooltip>
                                                </Link>
                                            </div>
                                            <div className="liB">
                                                <Link className="enlace" to={`/admin/listVaccines/${item.documento}`}>
                                                    <FontAwesomeIcon icon={faSyringe} size="lg" color="#2D61A4"
                                                    data-tip data-for = "boton3"/>
                                                    <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Vacunación </ReactTooltip>
                                                </Link>
                                            </div>
                                            <div className="liB">
                                                <Link className="enlace" to="/">
                                                    <FontAwesomeIcon icon={faFileMedicalAlt} size="lg" color="#2D61A4"
                                                    data-tip data-for = "boton4"/>
                                                    <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Seguimiento </ReactTooltip>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}