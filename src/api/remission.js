import { urlBackend } from "./config";

export function insertRemisApi(data, token){
    const url = `/api/control_seguimiento/REGISTRAR_REMICION`;
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

export function updateRemisApi(data){
    const url = `${urlBackend}control_seguimiento/ACTUALIZAR_REMICION`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function deleteRemisApi(id, token){
    const url = `/api/control_seguimiento/ELIMINAR_REMICION/${id}`;
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

export function getRemisByUserApi(documento, token){
    const url = `/api/control_seguimiento/LISTAR_REMICIONES/${documento}`;
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

export function getRemisByIdApi(id, token){
    const url = `/api/control_seguimiento/CONSULTAR_REMICION/${id}`;
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