
const url = 'http://172.16.20.5:3000/service/api/v1';

export function loginUser(auth, setErrorData) {
    //  return fetch('http://172.16.5.104:3000/service/api/v1/authentication', {
        return fetch(url + '/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(auth)
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          console.log("Deu erro " + res.status + " " + res.statusText);
          throw res;
        });
    }
    