import axios from 'axios';

const url = process.env.REACT_APP_BASE_API_URL;

export function cargoFindAll(authState) {
    console.log("cargoFindAll Token: " + authState.token);
    const headers = { 'Content-Type': 'application/json', 'Authorization': authState.token}
    return axios.get(url + '/cargo/findall', {headers});
}

export function cargoInsert(authState, cargo) {
  console.log("cargoInsert Token: " + authState.token);
  const headers = { 'Content-Type': 'application/json'};
  return axios.post(url + '/cargo/insert', cargo, {headers});
  }

  export function cargoUpdate(authState, cargo) {
    console.log("cargoUpdate Token: " + authState.token);
    const headers = { 'Content-Type': 'application/json'};
    return axios.put(url + '/cargo/update', cargo, {headers});
  }
    
  export function cargoDelete(authState, cargo) {
    console.log("cargoDelete Token: " + authState.token);
    console.log("cargoDelete Cargo: " + JSON.stringify(cargo));
    const headers = { 'Content-Type': 'application/json'};
    return axios.delete(url + '/cargo/delete', {data: cargo}, {headers});
  }
