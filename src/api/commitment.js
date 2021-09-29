import { urlBackend } from "./config";

export function insertCompApi(data, token){
    const url = `/api/control_seguimiento/REGISTRAR_COMPROMISO`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function updateCompApi(data, token){
    const url = `/api/control_seguimiento/ACTUALIZAR_COMPROMISO`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function deleteCompApi(id, token){
    const url = `/api/control_seguimiento/ELIMINAR_COMPROMISO/${id}`;
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

export function getCompByUserApi(documento, token){
    const url = `/api/control_seguimiento/LISTAR_COMPROMISOS/${documento}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET",
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getCompByIdApi(id, token){
    const url = `/api/control_seguimiento/CONSULTAR_COMPROMISO/${id}`;
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