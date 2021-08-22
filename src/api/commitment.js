import { urlBackend } from "./config";

export function insertCompApi(data){
    const url = `${urlBackend}control_seguimiento/REGISTRAR_COMPROMISO`;
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

export function updateCompApi(data){
    const url = `${urlBackend}control_seguimiento/ACTUALIZAR_COMPROMISO`;
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

export function deleteCompApi(id){
    const url = `${urlBackend}control_seguimiento/ELIMINAR_COMPROMISO/${id}`;
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

//preguntar a Danny hola
export function getCompByUserApi(data){
    const url = `${urlBackend}control_seguimiento/LISTAR_COMPROMISOS`;
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

export function getCompByIdApi(id){
    const url = `${urlBackend}control_seguimiento/CONSULTAR_COMPROMISO/${id}`;
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