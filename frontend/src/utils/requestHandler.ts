import axios from 'axios';

const API_LOCATION = process.env["REACT_APP_API_LOCATION"];

const rq = axios.create({
    baseURL: API_LOCATION,
    headers: {
      'Content-type': 'application/json',
    }
});

const requestHandler = {
  get<T>(url: string, params = {}, config = {}) {
    return rq.get<T>(url, { ...config, params });
  },

  post<T>(url: string, data = {}, config = {}) {
    return rq.post<T>(url, data, config);
  },
};

export default requestHandler;
