import React, {useState } from 'react';
import { Container } from 'react-bootstrap';
import "./Login.scss";

import LoginForm from "./../../components/Login/LoginForm";

export default function Login(){
    const [showLogin, setShowLogin] = useState(true);

    return(
        <Container fluid className="py-5 px-5 wallpaper">
                <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
        </Container>
    );
}