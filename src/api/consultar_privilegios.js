import { urlBackend } from "./config";

export function getPrivilegiosApi(token){
    const url = `/api/rol/CONSULTAR_PRIVILEGIOS`;
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
