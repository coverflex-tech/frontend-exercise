import { API_BASE_URL } from "./constants";

export const getUser = id => {
  return fetch(`${API_BASE_URL}/api/users/${id}`)
    .then(response => response.json())
    .then(json => json.user);
};
