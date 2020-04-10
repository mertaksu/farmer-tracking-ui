const baseURL = 'http://localhost:8080';

export function service(path, method, body) {
  return fetch(baseURL + path, {
    method: method,
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic bWVydGFrc3U6MTIzNEFh',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      return error;
    });
}
