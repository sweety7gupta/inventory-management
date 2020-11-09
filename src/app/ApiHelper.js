const API_ROOT= "http://localhost:1337/api/v1";

function commonApiCall(url, method = 'GET', body) {
    return new Promise((resolve) => {
        fetch(`${API_ROOT}${url}`, {
            method,
            headers: {
                token: localStorage.getItem('token')
            },
            body: body ? JSON.stringify(body) : null,
        })
        .then((response) => {
            response.json().then((json) => {
                resolve(json);
            });
        });
    });
}

export function fetchProducts() {
    const apiUrl = '/product/get-all';
    return commonApiCall(apiUrl);
}

export function saveProduct({ barcode, productName, productShortName }) {
    const apiUrl = '/product/save';
    return commonApiCall(apiUrl, 'POST', { barcode, productName, productShortName });
}

export function getNextCustomBarcode() {
    const apiUrl = '/product/get-custom-barcode';
    return commonApiCall(apiUrl);
};

export function login(username, password) {
    const apiUrl = '/account/login';
    return commonApiCall(apiUrl, 'POST', { username, password });
}

export function logout() {
    const apiUrl = '/account/logout';
    return commonApiCall(apiUrl, 'GET');
}
