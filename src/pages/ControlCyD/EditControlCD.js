import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { getUserByIdApi } from "../../api/user";
import { getControlByIdApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";
import EditControlCyD from "../../components/Control/ControlCyD/EditControlCyD"; 
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function EditControlCD(){ 
    const { documento, id } = useParams();
    const [userControl, setUser] = useState({});
    const [control, setControl] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState(false);
    const [ controlLoaded, setControlLoaded ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    const { user } = useAuth(); //privilegios
    var loading = false;

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

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


    if(validatePrivilegio("ACTUALIZAR_CONTROL").length === 0){
        return(
            <>
                <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                    <Lottie height={500} width="65%"
                    options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
            </>
        )
    }else{
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
}