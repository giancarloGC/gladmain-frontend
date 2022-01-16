import { urlBackend } from "./config";

export function insertUserApi(data, token){
    const url = `/api/usuario/REGISTRAR_USUARIO`;
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

export function getUsersInactivesApi(token){
    const url = `/api/usuario/LISTAR_USUARIOS_INACTIVOS`;
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

export function updateStateUserApi(data){
    const url = `/api/usuario/MODIFICAR_ESTADO_USUARIO`;
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

export function bitacoraUserApi(data){
    const url = `/api/usuario/LISTAR_BITACORA_USUARIO/${data.documento}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": data.token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {
                return response.json()
            })
            .then(result => {return result})
            .catch(error => {return error});
}

export function listControlsAdicionalesApi(data){
    const url = `/api/control_adicional/LISTAR_CONTROLES/${data.typeControl}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': data.token
        },
        method: "GET"
    }

    return fetch(url, params)
        .then(response => {return response.json()})
        .then(response => {return response})
        .catch(error => {return error})
}

export function addControlAdicionalApi(data){
    const url = `/api/control_adicional/REGISTRAR_CONTROL`;
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
        .then(response => {return response})
        .catch(error => {return error});
}

export function getControlAdicionalByIdApi(data){
    const url = `/api/control_adicional/CONSULTAR_CONTROL/${data.id}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": data.token
        },
        method: "GET",
    };

    return fetch(url, params)
        .then(response => {return response.json()})
        .then(response => {return response})
        .catch(error => {return error});
}

export function editControlAdicionalApi(data){
    const url = `/api/control_adicional/ACTUALIZAR_CONTROL`;
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
        .then(response => {return response})
        .catch(error => {return error});
}

export function deleteControlAdicionalApi(data){
    const url = `/api/control_adicional/ELIMINAR_CONTROL/${data.id}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": data.token
        },
        method: "GET"
    }

    return fetch(url, params)
    .then(response => {return response.json()})
    .then(response => {return response})
    .catch(error => {return error});
}