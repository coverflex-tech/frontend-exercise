import ky from "ky";
const API_URL = "http://localhost:4000/api";

const apiClient = ky.extend({
  prefixUrl: API_URL,
});

export function get<ExpectedResponse>(path: string): Promise<ExpectedResponse> {
  return apiClient.get(path).json<ExpectedResponse>();
}

export function post<ExpectedResponse, Input>(
  path: string,
  body: Input
): Promise<ExpectedResponse> {
  return apiClient.post(path, { json: body }).json<ExpectedResponse>();
}
