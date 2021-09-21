import React from 'react';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import AllUsers from "../../components/Users/AllUsers/AllUsers";

export default function ListUsers(){ 
    return(
        <Container>
            <AllUsers />
        </Container>
    )
}