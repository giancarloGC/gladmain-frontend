import { urlBackend } from "./config";

export function insertUserApi(data){
    //let newDocument = parseInt(data.documento);
    //data.documento = newDocument;
    const url = `/api/usuario/REGISTRAR_USUARIO`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": data.token
        },
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function updateUserApi(data){
    const url = `/api/usuario/ACTUALIZAR_USUARIO`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": data.token

        },
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function deleteUserApi(id, token){
    const url = `/api/usuario/ELIMINAR_USUARIO/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getUserApi(token){
    const url = `/api/usuario/LISTAR_USUARIOS`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getUserByIdApi(documento, token){
    const url = `/api/usuario/CONSULTAR_USUARIO/${documento}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function listUsersByRol(nameRol, token){
    const url = `/api/usuario/LISTAR_USUARIOS_ROL/${nameRol}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}