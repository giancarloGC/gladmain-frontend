import { urlBackend } from "./config";

export function insertRemisApi(data){
    const url = `${urlBackend}control_seguimiento/REGISTRAR_REMICION`;
    const params = {
        headers: {
            "Content-Type": "application/json"
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

export function deleteRemisApi(id){
    const url = `${urlBackend}control_seguimiento/ELIMINAR_REMICION/${id}`;
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

//preguntar a Danny
export function getRemisByUserApi(data){
    const url = `${urlBackend}control_seguimiento/LISTAR_REMICIONES`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getRemisByIdApi(id){
    const url = `${urlBackend}control_seguimiento/CONSULTAR_REMICION/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}