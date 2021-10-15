import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import AddControlCD from "../../components/Control/ControlCyD/AddControlCD"; 
import { useParams } from "react-router-dom";
import Lottie from 'react-lottie';
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";


export default function AddControlCyD(){ 
    const { documento } = useParams();
    const [userControl, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ componentLoaded, setComponentLoaded ] = useState(false); 
    const [ userLoaded, setUserLoaded ] = useState({});
    const { user } = useAuth(); //privilegios
    const [ authorization, setAuthorization ] = useState(true);
    var loading = true;

const validatePrivilegio = (privilegio) => {
    return user.authorities.filter(priv => priv === privilegio);
}

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

    if(validatePrivilegio("REGISTRAR_CONTROL").length === 0){
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
}