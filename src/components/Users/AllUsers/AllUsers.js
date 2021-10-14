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
import { deleteUserApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";

import Lottie from 'react-lottie';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AnimationAuthorization from "../../../assets/animations/withoutAuthorization.json";
import AnimationNotFindSearch from "../../../assets/animations/notFindSearch.json";
import useAuth from '../../../hooks/useAuth';

import "./AllUsers.scss";

export default function AllUsers(){
    const [ usersApi, setUsersApi ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const token = localStorage.getItem(TOKEN);
    const [ authorization, setAuthorization ] = useState(true);
    const [ allUsersSaved, setAllUsersSaved ] = useState([]);
    const [ typeSearch, setTypeSearch ] = useState("nombre");
    const { user } = useAuth();
    useEffect(() => {
        (async () => {
            const response = await getUserApi(token);
            if(response.status === 403){
                setLoading(false);
                setAuthorization(false);
            }else{
                setLoading(false);
                setAllUsersSaved(response);
                setUsersApi(response);
            };
        })();
    }, []);


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

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }


    const confirmDeleteUser = (documento) => {
        swal({
            title: "¿Estás seguro de eliminar el usuario?",
            text: "¡Una vez eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteUser(documento);
            }
          });
    }

    const deleteUser = (documento) => {
        deleteUserApi(documento, token).then(response => {
            if(response === true){
                swal("Excelente! Usuario eliminado!", {
                    icon: "success",
                })
                .then((value) => {
                    window.location.replace("/admin/users")
                  });                      
            }else{
                swal("Opss! Ocurrió un error al eliminar el usuario!", {
                    icon: "error",
                })
                .then((value) => {
                    window.location.replace("/admin/users");
                  });                  
            }
        })
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

            {loading && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}
       
            {allUsersSaved && (
                <>
                {allUsersSaved.length > 0  && (
                    <>
                    <h1 className="text-center">Lista de Usuarios 
                    {validatePrivilegio("REGISTRAR_USUARIO").length > 0 && ("LISTAR_ROLES").length > 0 && ("ASIGNAR_ROL").length > 0 && ( 
                    <Link to="/admin/addUser" ><FontAwesomeIcon data-tip data-for="boton1" icon={faUserPlus} size="lg" color="#2D61A4"/></Link>
                    )}
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Agregar Nuevo Usuario </ReactTooltip>
                    </h1>
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
                        <Lottie height={500} width="75%"
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
                            {validatePrivilegio("CONSULTAR_USUARIO").length > 0 && (
                                <Link className="enlace" to={`/admin/user/${item.documento}`}>
                                <FontAwesomeIcon icon={faEye} size="lg" color="#2D61A4" data-tip data-for = "boton1"
                                /> <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                                </Link>
                            )}
                            </div>
                            <div className="liB">
                            {validatePrivilegio("CONSULTAR_USUARIO").length > 0 && ("ACTUALIZAR_USUARIO").length > 0 && ("LISTAR_ROLES").length > 0 && 
                            ("ASIGNAR_ROL").length > 0 && ("CONSULTAR_ROLES_USUARIO").length > 0 && ("RETIRAR_ROL").length > 0 && (
                            <Link className="enlace" to={`/admin/editUser/${item.documento}`}>
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="#2D61A4" data-tip data-for = "boton2"
                                /> <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                                </Link>
                            )}
                            </div>

                            <div className="liB">
                                {validatePrivilegio("ELIMINAR_USUARIO").length > 0 && (
                                    <a className="enlace" onClick={() => confirmDeleteUser(item.documento)}>
                                        <FontAwesomeIcon icon={faTrash} size="lg" color="#2D61A4" data-tip data-for = "boton3"
                                        /> <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                                    </a>
                                )}
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