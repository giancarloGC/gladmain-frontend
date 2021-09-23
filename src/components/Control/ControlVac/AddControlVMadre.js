import React, { useState, useEffect, useReducer } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import  AuthContext  from "../../../hooks/useAuth";
import { TOKEN } from "../../../utils/constans";
import { insertControlApi } from "../../../api/controls";
import { updateUserApi } from "../../../api/user";
import swal from 'sweetalert';
import moment from 'moment';

export default function AddControlVMadre (props){


    
}