import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import AddControlN from "../../components/Control/ControlNutri/AddControlN";



export default function AddControlNutri(){ 
    const { documento } = useParams();
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState({});
    var loading = true;

      useEffect(() => {
        loading = false;
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
            setComponentLoaded(true); 
        })
        if(!loading){ 
          setComponentLoaded(true); 
        setUserLoaded(userControl);
        }
      }, []);

    return(
        <Container>
            <h1 className="text-center">Añadir Control Nutricional
                <Link to={`/admin/listControlNutri/${documento}`} >
                    <FontAwesomeIcon icon={faListAlt} size="lg" color="#2D61A4"
                    data-tip data-for = "boton1" style = {{marginLeft:10}}/>
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Mis Controles </ReactTooltip>
                </Link>
            </h1>
            {!componentLoaded ? (
            <Row className="justify-content-md-center text-center">
              <Col md={1} className="justify-content-center">
              <Spinner animation="border" >
              </Spinner> 
              </Col>
            </Row>
          )
 : (
              <AddControlN userControl={userControl} />
          )}
        </Container>
    )
}