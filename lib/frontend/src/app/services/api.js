import axios from 'axios';

const host = 'http://localhost:4000';

export function get(endpoint) {
  return axios
    .get(`${host}/api/${endpoint}`)
    .then((response) => {
      return {response};
    })
    .catch((e) => {
      return {error: 'Oops! There was an error!'};
    });
}

export const post = (endpoint, data) => {
  return axios
    .post(`${host}/api/${endpoint}`, data)
    .then((response) => {
      return {response};
    })
    .catch((error) => {
      return {error};
    });
};
