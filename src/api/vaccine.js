import { urlBackend } from "./config";

//Se elimina primero las vacunas y luego se puede eliminar el control
export function deleteVacApi(idControl,idVaccine, token){
    const url = `/api/control_vacunacion/ELIMINAR_VACUNA_CONTROL/${idControl}/${idVaccine}`;
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

export function getVacByAgeApi(edad, token){
    let edadparse = parseInt(edad);
    const url = `/api/control_vacunacion/LISTAR_VACUNAS_EDAD/${edadparse}`;
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