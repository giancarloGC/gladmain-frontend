import { urlBackend } from "./config";

export function insertSegApi(data, token){
    const url = `/api/control_seguimiento/REGISTRAR_SEGUIMIENTO`;
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

export function updateSegApi(data){
    const url = `${urlBackend}control_seguimiento/ACTUALIZAR_SEGUIMIENTO`;
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

export function deleteSegApi(id){
    const url = `${urlBackend}control_seguimiento/ELIMINAR_SEGUIMIENTO/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getSegApi(documento, token){
    const url = `/api/control_seguimiento/LISTAR_SEGUIMIENTOS/${documento}`;
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

export function getSegByIdApi(id, token){
    const url = `/api/control_seguimiento/CONSULTAR_SEGUIMIENTO/${id}`;
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