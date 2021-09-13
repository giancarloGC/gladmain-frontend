import { urlBackend } from "./config";


export function insertControlApi(data, token, type){
    const url = `/api/control/REGISTRAR_CONTROL/${type}`;
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

export function updateControlApi(data){
    const url = `/api/control/ACTUALIZAR_CONTROL`;
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

export function deleteControlApi(id, token){
    const url = `/api/control/ELIMINAR_CONTROL/${id}`;
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

export function getControlByIdApi(id, token){
    const url = `/api/control/CONSULTAR_CONTROL/${id}`;
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

//Se trae los que en la BD esten como null en la comuna fecha_prox_cont y null en fecha_ulti_cont
export function getControlNutriApi(documento, token){
    const url = `/api/control/LISTAR_CONTROLES_NUTRICIONALES/${documento}`;
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

//PREGUNTAR A DANNY
export function getControlCyDApi(documento, token){
    const url = `/api/control/LISTAR_CONTROLES_CYD/${documento}`;
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

//PREGUNTAR A DANNY
export function getLatestCyDApi(documento, token){
    const url = `/api/control/ULTIMO_CONTROL_CYD/${documento}`;
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

//PREGUNTAR A DANNY
export function getListLatestControlsApi(data, data2){
    const url = `${urlBackend}control/ULTIMO_CONTROL_CYD/${data}/${data2}`;
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
