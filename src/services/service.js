const baseURL = 'http://192.168.1.38:8080';

export function service(path, method, body) {
  return fetch(baseURL + path, {
    method: method,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMjUzNSIsImV4cCI6MTYxODYwNzIwM30.muuQXpQ87Xj6T-yzG_4hOSsTaBZUPLLPvnDlu7ta__unBQDc8jALou3g5QEl-9T9yG_SR-WmfPaJx-o8tSfBiw',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.log(baseURL+path);
      console.log(error);
      return error;
    });
}


export function externalService(url, method, body) {
  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMjUzNSIsImV4cCI6MTYxODYwNzIwM30.muuQXpQ87Xj6T-yzG_4hOSsTaBZUPLLPvnDlu7ta__unBQDc8jALou3g5QEl-9T9yG_SR-WmfPaJx-o8tSfBiw',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.log(baseURL+path);
        console.log(error);
        return error;
      });
}
