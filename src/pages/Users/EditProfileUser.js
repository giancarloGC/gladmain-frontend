import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import FormUser from "../../components/Users/FormUser/FormUser"; 
import { useParams } from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import FormEditProfile from "../../components/Users/FormEditProfile/FormEditProfile";

export default function EditProfileUser(){ 
    const { documento } = useParams();
    const [user, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [ loaded, setLoaded ] = useState(false);
    useEffect(() => {
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
            setLoaded(true);
        })
      }, []);

    return(
        <Container>
            <h1 className="text-center">Formulario de editar perfíl<FontAwesomeIcon icon={faUserEdit} size="lg" color="#2D61A4"/>
            </h1>
            {loaded ? (
                <FormEditProfile user={user}/>
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