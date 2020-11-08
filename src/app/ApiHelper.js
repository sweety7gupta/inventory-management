const API_ROOT= "http://192.168.225.219:1337/api/v1/";

export function fetchProducts () {
    return new Promise((resolve) => {
        fetch( API_ROOT + "product/get-all", {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            response.json().then((json) => {
                resolve(json);
            });
        });
    });
}
