import React, {useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import FormUser from "../../components/Users/FormUser/FormUser"; 
import { useParams } from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import FormEdit from "../../components/Users/FormEdit/FormEdit";

export default function EditUser(){ 
    const { documento } = useParams();
    const [user, setUser] = useState({});
    const token = localStorage.getItem(TOKEN);

    useEffect(() => {
        getUserByIdApi(documento, token).then(response => {
            setUser(response);
        })
      }, []);

    return(
        <Container>
            <h1 className="text-center">Formulario de editar usuario<FontAwesomeIcon icon={faUserEdit} size="lg" color="#2D61A4"/>
            </h1>
            <FormEdit user={user}/>
        </Container>
    )
}