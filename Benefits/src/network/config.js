export function getApiURL(endpoint) {
  const trimEndpoint = endpoint.replace(/^\//, '');

  return `http://127.0.0.1:4000/api/${trimEndpoint}`;
}
