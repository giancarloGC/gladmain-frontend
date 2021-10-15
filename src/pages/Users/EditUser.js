import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import FormUser from "../../components/Users/FormUser/FormUser"; 
import { useParams } from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import FormEdit from "../../components/Users/FormEdit/FormEdit";
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import useAuth from '../../hooks/useAuth'; 

export default function EditUser(){ 
    const { documento } = useParams();
    const [usuario, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ loaded, setLoaded ] = useState(false);
    const { user } = useAuth();

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        if(validatePrivilegio("CONSULTAR_USUARIO").length === 0){
            getUserByIdApi(documento, token).then(response => {
                setUser(response);
                setLoaded(true);
            })
         }
    }, []);

    if(validatePrivilegio("ACTUALIZAR_USUARIO").length === 0){
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
                <h1 className="text-center">Formulario de editar usuario<FontAwesomeIcon icon={faUserEdit} size="lg" color="#2D61A4"/>
                </h1>
                {loaded ? (
                    <FormEdit usuario={usuario}/>
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