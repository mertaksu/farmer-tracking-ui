
const baseURL = 'http://192.168.1.38:8080';

export function service(token, path,method, body) {
  return fetch(baseURL + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(body),
  })
  /*
    .then(response => {
      if (response.headers.get('content-type') != null && response.headers.get('content-type').match(/application\/json/)) {
        return response.json();
      }
      return response;
    })*/
    .then(checkStatus)
    .then(json => {
      return json;
    })
    .catch(error => {
      console.log(JSON.stringify(body));
      console.log('Following exception occured '+error+' on '+baseURL+path);
      alert('Bir Hata Oluştu');
    });

}


function checkStatus(response) {
  if (response.ok) {
      if (response.headers.get('content-type') != null && response.headers.get('content-type').match(/application\/json/)) {
        return response.json();
      }
      return response;
  } else {
    if(response.status===403)
      alert('Kullanıcı Adı veya Şifre Hatalı');

    else if(response.status===500)
      alert('Bir Hata Oluştu');

    else if(response.status===409)
      alert('Bu kullanıcı adı kullanılıyor. Başka bir kullanıcı adı belirle.')
    else
      alert('Bilinmeyen Hata');
  }
}

export function externalService(url, method, body) {
  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
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
