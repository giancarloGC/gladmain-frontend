export function loginApi(data){
    const url = `/api/sesion/${data.document}/${data.password}/${data.role}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {
                return result;
            })
            .catch(err => {return err});
}
