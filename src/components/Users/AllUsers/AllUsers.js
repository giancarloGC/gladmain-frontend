import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import swal from 'sweetalert';

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

import "./AllUsers.scss";



export default function AllUsers(){
    const [ usersApi, setUsersApi ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const token = localStorage.getItem(TOKEN);


    useEffect(() => {
        (async () => {
            const response = await getUserApi(token);
            setLoading(false);
            setUsersApi(response);
        })();
    }, []);


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
                    <Redirect to="/admin/users" />
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
                        <Link className="enlace" to="/">
                        <FontAwesomeIcon icon={faEye} size="lg" color="#2D61A4"
                        />
                        </Link>
                    </div>
                    <div className="liB">
                    <Link className="enlace" to={`/admin/editUser/${item.documento}`}>
                        <FontAwesomeIcon icon={faPencilAlt} size="lg" color="#2D61A4"
                        />
                        </Link>
                    </div>
                    <div className="liB">
                    <a className="enlace" onClick={() => confirmDeleteUser(item.documento)}>
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#2D61A4"
                        />
                        </a>
                    </div>
                </div>
            </div>                
            ))
        )}       
        </div>
    </div>
        </div>
    </>
    )
}