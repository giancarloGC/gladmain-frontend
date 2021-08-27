import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Col, Row, Spinner } from "react-bootstrap";
import { BrowserRouter as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getRolesApi } from "../../api/rol";

export default function ListRol(){
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await getRolesApi();
            setLoading(false);
            setRolesApi(response);
        })();
    }, []);

    return(
        <Container className="justify-content-center">
            <h1 className="text-center">Listado de roles   <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4"
                    onClick={() => window.location.replace("/admin/addRol")}
                />
            </h1>

            {loading && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}

            {rolesApi.length > 0 && (
            <ListGroup>
                {rolesApi.map((rol, index) => (
                <ListGroup.Item className="shadow border mt-2 mb-3">
                <Container>
                <Row>
                    <Col md={4} className="align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Código </b> <br/> {rol.idRol}</p>
                    </Col>
                    <Col md={4} className="align-self-center">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Titulo </b> <br/> {rol.nombre}</p>
                    </Col>
                    <Col md={4} className="align-self-center justify-content-around">
                        <p style={{"color": "#2D61A4", "font-size": 27}}><b>Acciones </b> <br/>
                            <a href="#" className="btn btn-primary">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                </svg>
                            </a>
                            <a className="btn btn-secondary text-center mx-3">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                            </a>    
                        </p>               
                    </Col>
                </Row>
                </Container>
            </ListGroup.Item>
                ))}
            </ListGroup>
            )}
        </Container>
    )
}