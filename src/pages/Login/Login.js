import React from 'react';
import { Container } from 'react-bootstrap';
import "./Login.scss";

import LoginForm from "./../../components/Login/LoginForm";

export default function Login(){
    return(
        <Container fluid className="py-5 px-5 wallpaper">
            <LoginForm />
        </Container>
    );
}