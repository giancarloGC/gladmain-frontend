import { urlBackend } from "./config";


export function insertContVaccApi(data, token){
    const url = `/api/control_vacunacion/REGISTRAR_CONTROL_VACUNACION`;
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

export function updateContVaccApi(data, token){
    const url = `/api/control_vacunacion/ACTUALIZAR_CONTROL_VACUNACION`;
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

export function deleteContVaccApi(idControl, token){
    const url = `/api/control_vacunacion/ELIMINAR_CONTROL_VACUNACION/${idControl}`;
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

export function getContVaccApi(documento, token){
    const url = `/api/control_vacunacion/LISTAR_CONTROLES_VACUNACION/${documento}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
    .then(response => {return response.json()})
    .then(result => {
        return result;
    })
    .catch(err => {return err});
}

export function getContVaccByIdApi(id, token){
    const url = `/api/control_vacunacion/CONSULTAR_CONTROL_VACUNACION/${id}`;
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

export function getVaccXDocApi(data){
    const url = `${urlBackend}control_vacunacion/LISTAR_VACUNACION_DOCUMENTO/${data}`;
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
