import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import AddControlCD from "../../components/Control/ControlCyD/AddControlCD"; 
import { useParams } from "react-router-dom";

export default function AddControlCyD(){ 
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
            //setComponentLoaded(true); 
            setUserLoaded(userControl);
        }
    }, []);

      return(
        <Container>
            <h1 className="text-center">Añadir Control de Crecimiento y Desarrollo</h1>
            {!componentLoaded ? (
                <Row className="justify-content-md-center text-center">
                <Col md={1} className="justify-content-center">
                <Spinner animation="border" >
                </Spinner> 
                </Col>
                </Row>
            )
        :
        (
            <AddControlCD userControl={userControl} />
          )
        }
        </Container>
    )
}