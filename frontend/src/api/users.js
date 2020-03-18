import { API_BASE_URL, USERS_PATH } from "./constants";

export const getUser = id => {
  return fetch(`${API_BASE_URL}${USERS_PATH}/${id}`)
    .then(response => response.json())
    .then(json => json.user);
};
