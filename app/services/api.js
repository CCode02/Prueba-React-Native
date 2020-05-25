const logInApi = 'https://api.myintelli.net/v1/login';
const searchApi = 'https://api.myintelli.net/v1/2/devices';

export function SignIn(user, password){ 
    return fetch(logInApi, { 
        method: 'POST', 
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ username: user, password: password, client: 2 })
    });
}

export function SearchText(token, text, limit){
    return fetch(`${searchApi}?limit=${limit}&offset=0&search=${text}`, { 
        method: 'GET', 
        headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    });
}