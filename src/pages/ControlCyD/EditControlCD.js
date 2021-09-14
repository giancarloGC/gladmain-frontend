import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { getUserByIdApi } from "../../api/user";
import { getControlByIdApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";
import EditControlCyD from "../../components/Control/ControlCyD/EditControlCyD"; 
import { useParams } from "react-router-dom";

export default function EditControlCD(){ 
    const { documento, id } = useParams();
    const [userControl, setUser] = useState({});
    const [control, setControl] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState(false);
    const [ controlLoaded, setControlLoaded ] = useState(false);
    var loading = false;

    useEffect(() => {
        loading = true;
        getUserByIdApi(documento, token).then(responseUser => {
            setUser(responseUser);
            setUserLoaded(true);
            console.log("primero");
        })
        getControlByIdApi(id, token).then(response => {
            setControl(response);
            setControlLoaded(true);
            console.log("segundo");
        })
        setComponentLoaded(true); 
        if(loading){ 
           
        }
    }, []);

    return(
        <Container>
            <h1 className="text-center">Editar Control de Crecimiento y Desarrollo</h1>
            {userLoaded && controlLoaded ? (
                <EditControlCyD userControl={userControl} control={control}/>
            )
            :
            (
                <Row className="justify-content-md-center text-center">
                <Col md={1} className="justify-content-center">
                <Spinner animation="border" >
                </Spinner> 
                </Col>
                </Row>
            )
            }
        </Container>
    )
}